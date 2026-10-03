import { readFile } from "node:fs/promises";

const localeFiles = [
	"translations/es.json",
	"translations/en.json",
	"translations/ca.json",
];
const serviceMatrix = {
	"first-space": ["integral", "decorative-restyling", "strategic-consultation"],
	"existing-space": [
		"integral",
		"decorative-restyling",
		"strategic-consultation",
	],
	growth: ["integral", "decorative-restyling", "other-challenge"],
};
const fieldNamePattern = /^[a-z][A-Za-z0-9]*$/;

function validateFields(file, group, fields, errors) {
	if (!Array.isArray(fields) || fields.length === 0) {
		errors.push(`${file} ${group} requires fields`);
		return;
	}
	const names = fields.map(({ name }) => name);
	if (
		new Set(names).size !== names.length ||
		names.some((name) => !fieldNamePattern.test(name))
	) {
		errors.push(`${file} ${group} has duplicate or invalid field names`);
	}
	for (const field of fields) {
		if (
			!field.label?.trim() ||
			!["text", "textarea", "select", "file"].includes(field.kind) ||
			typeof field.required !== "boolean" ||
			field.name === "serviceScope"
		) {
			errors.push(
				`${file} ${group}.${field.name} has an invalid or legacy field contract`,
			);
		}
		if (
			field.kind === "select" &&
			(!field.options?.length ||
				new Set(field.options.map(({ value }) => value)).size !==
					field.options.length ||
				field.options.some(({ value, label }) => !value || !label?.trim()))
		) {
			errors.push(
				`${file} ${group}.${field.name} requires unique labeled options`,
			);
		}
	}
}

export async function validateInquiryTranslations(files = localeFiles) {
	const errors = [];
	let baselineFields;
	let baselineAlternateFields;
	for (const file of files) {
		const doc = JSON.parse(await readFile(file, "utf8"));
		const form = doc.contactForm;
		const inquiry = form?.inquiryPaths;
		const paths = inquiry?.paths;
		if (
			!Array.isArray(paths) ||
			paths.length !== Object.keys(serviceMatrix).length
		) {
			errors.push(`${file} must define exactly three inquiry paths`);
			continue;
		}
		if (
			[
				"projectType",
				"projectTypes",
				"serviceType",
				"serviceTypes",
				"message",
			].some((key) => key in form)
		) {
			errors.push(
				`${file} contact form contains obsolete selector or message fields`,
			);
		}
		if (
			!inquiry.heading?.trim() ||
			!inquiry.situationLabel?.trim() ||
			!inquiry.serviceLabel?.trim() ||
			!inquiry.selectPlaceholder?.trim() ||
			!inquiry.continue?.trim() ||
			!form.invalidSelection?.trim()
		) {
			errors.push(
				`${file} is missing localized selector labels or invalid-selection feedback`,
			);
		}
		const values = paths.map(({ value }) => value);
		if (JSON.stringify(values) !== JSON.stringify(Object.keys(serviceMatrix))) {
			errors.push(
				`${file} inquiry paths must be ordered first-space, existing-space, growth`,
			);
		}
		const labels = {};
		for (const path of paths) {
			if (!path.title?.trim() || !path.description?.trim())
				errors.push(`${file} ${path.value} requires title and description`);
			const options = path.serviceOptions;
			const expected = serviceMatrix[path.value];
			if (
				!expected ||
				JSON.stringify(options?.map(({ value }) => value)) !==
					JSON.stringify(expected)
			) {
				errors.push(
					`${file} ${path.value} has an invalid canonical service mapping`,
				);
			}
			for (const option of options ?? []) {
				if (!option.label?.trim() || !option.description?.trim())
					errors.push(
						`${file} ${path.value}.${option.value} requires localized label and description`,
					);
				if (labels[option.value] && labels[option.value] !== option.label)
					errors.push(
						`${file} service ${option.value} has inconsistent labels across situations`,
					);
				labels[option.value] = option.label;
			}
			validateFields(file, path.value, path.fields, errors);
		}
		const alternate = inquiry.alternate;
		if (!alternate?.title?.trim() || !alternate.description?.trim())
			errors.push(`${file} requires a localized alternate challenge intake`);
		validateFields(file, "alternate", alternate?.fields, errors);
		const fieldSignature = paths.map(({ value, fields }) => [
			value,
			fields.map(({ name, kind, required, options }) => [
				name,
				kind,
				required,
				options?.map(({ value }) => value) ?? [],
			]),
		]);
		if (!baselineFields) baselineFields = fieldSignature;
		else if (JSON.stringify(fieldSignature) !== JSON.stringify(baselineFields))
			errors.push(`${file} inquiry field contracts differ from ${files[0]}`);
		const alternateSignature = (alternate?.fields ?? []).map(
			({ name, kind, required, options }) => [
				name,
				kind,
				required,
				options?.map(({ value }) => value) ?? [],
			],
		);
		if (!baselineAlternateFields) baselineAlternateFields = alternateSignature;
		else if (
			JSON.stringify(alternateSignature) !==
			JSON.stringify(baselineAlternateFields)
		)
			errors.push(
				`${file} alternate inquiry field contract differs from ${files[0]}`,
			);
	}
	return errors;
}

if (import.meta.main) {
	const errors = await validateInquiryTranslations(
		process.argv.slice(2).length ? process.argv.slice(2) : undefined,
	);
	if (errors.length) {
		for (const error of errors) console.error(`error: ${error}`);
		process.exit(1);
	}
	console.log("valid: localized WEB-1 inquiry contracts");
}
