#!/usr/bin/env bun
/** Deterministically validate a Senshac pinned editorial export. */

const SHA = /^[0-9a-f]{40}$/;
const ID = /^[a-z0-9][a-z0-9-]*$/;
const LOCALE = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const required = ["id", "locale", "title", "body"];

export function validate(document) {
	const errors = [];
	if (!document || typeof document !== "object" || Array.isArray(document)) {
		return ["export must be an object"];
	}
	if (document.contractVersion !== 1) errors.push("contractVersion must be 1");
	if (
		typeof document.sourceRevision !== "string" ||
		!SHA.test(document.sourceRevision)
	) {
		errors.push("sourceRevision must be a 40-character lowercase Git SHA");
	}
	if (!Array.isArray(document.entries))
		return [...errors, "entries must be an array"];
	const seen = new Set();
	document.entries.forEach((entry, index) => {
		const prefix = `entries[${index}]`;
		if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
			errors.push(`${prefix} must be an object`);
			return;
		}
		for (const field of required) {
			if (!(field in entry)) errors.push(`${prefix}.${field} is required`);
		}
		if (typeof entry.id !== "string" || !ID.test(entry.id))
			errors.push(`${prefix}.id is invalid`);
		if (typeof entry.locale !== "string" || !LOCALE.test(entry.locale))
			errors.push(`${prefix}.locale is invalid`);
		if (typeof entry.id === "string" && typeof entry.locale === "string") {
			const key = `${entry.id}\u0000${entry.locale}`;
			if (seen.has(key))
				errors.push(
					`${prefix} duplicates id/locale ${entry.id}/${entry.locale}`,
				);
			seen.add(key);
		}
		for (const field of ["title", "body"]) {
			if (
				field in entry &&
				(typeof entry[field] !== "string" || !entry[field])
			) {
				errors.push(`${prefix}.${field} must be a non-empty string`);
			}
		}
		const extra = Object.keys(entry)
			.filter((key) => !required.includes(key))
			.sort();
		if (extra.length)
			errors.push(`${prefix} has unsupported fields: ${extra.join(", ")}`);
	});
	const extra = Object.keys(document)
		.filter(
			(key) => !["contractVersion", "sourceRevision", "entries"].includes(key),
		)
		.sort();
	if (extra.length)
		errors.push(`export has unsupported fields: ${extra.join(", ")}`);
	return errors;
}

export async function load(path) {
	return JSON.parse(await Bun.file(path).text());
}

if (import.meta.main) {
	const path = Bun.argv[2] ?? "fixtures/editorial-export.json";
	try {
		const errors = validate(await load(path));
		if (errors.length) {
			for (const error of errors) console.error(`error: ${error}`);
			process.exit(1);
		}
		console.log(`valid: ${path}`);
	} catch (error) {
		console.error(`error: ${path}: ${error.message}`);
		process.exit(1);
	}
}
