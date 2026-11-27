import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";
import { validateInquiryTranslations } from "../scripts/validate_inquiries.mjs";

test("all locales define the same three strict inquiry contracts", async () => {
	expect(await validateInquiryTranslations()).toEqual([]);
});

test("unknown inquiry ids fail validation", async () => {
	expect(
		await validateInquiryTranslations(["tests/fixtures/invalid-inquiry.json"]),
	).toContain(
		"tests/fixtures/invalid-inquiry.json must define exactly three inquiry paths",
	);
});

test("all locales expose the canonical situation-to-service matrix without legacy scope fields", async () => {
	const expected = {
		"first-space": [
			"integral",
			"decorative-restyling",
			"strategic-consultation",
		],
		"existing-space": [
			"integral",
			"decorative-restyling",
			"strategic-consultation",
		],
		growth: ["integral", "decorative-restyling", "other-challenge"],
	};
	for (const locale of ["es", "en", "ca"]) {
		const doc = JSON.parse(
			await readFile(`translations/${locale}.json`, "utf8"),
		);
		const inquiry = doc.contactForm.inquiryPaths;
		expect(doc.contactForm.serviceTypes).toBeUndefined();
		expect(inquiry.alternate).toBeTruthy();
		for (const path of inquiry.paths) {
			expect(path.serviceOptions.map(({ value }) => value)).toEqual(
				expected[path.value],
			);
			expect(path.fields.some(({ name }) => name === "serviceScope")).toBe(
				false,
			);
		}
	}
});

test("localized inquiry content rejects legacy scope fields and invalid service mappings", async () => {
	expect(
		await validateInquiryTranslations(["tests/fixtures/invalid-inquiry.json"]),
	).not.toEqual([]);
});

test("localized home and service CTAs preselect only the canonical situation or service", async () => {
	const expectedServices = [null, "decorative-restyling", "integral"];
	for (const locale of ["es", "en", "ca"]) {
		const home = JSON.parse(
			await readFile(`pages/${locale}/home.json`, "utf8"),
		);
		const servicesPage = JSON.parse(
			await readFile(`pages/${locale}/services.json`, "utf8"),
		);
		const homeLinks = home.blocks
			.flatMap((block) => block.items ?? [])
			.map(({ href }) => href ?? "");
		expect(
			homeLinks.some((href) => href.includes("?situation=first-space")),
		).toBe(true);
		expect(
			homeLinks.some((href) => href.includes("?situation=existing-space")),
		).toBe(true);
		expect(homeLinks.some((href) => href.includes("?situation=growth"))).toBe(
			true,
		);
		expect(
			homeLinks.some((href) =>
				href.includes("?situation=growth&service=other-challenge"),
			),
		).toBe(true);
		expect(homeLinks.some((href) => href.includes("?path="))).toBe(false);
		const cards = servicesPage.blocks.find(
			(block) => block._template === "list" && block.items?.length === 3,
		).items;
		expect(cards[0].href).toBe(`/${locale}/methods/consultation`);
		expect(
			cards.map(({ href }) =>
				new URL(href, "https://example.test").searchParams.get("service"),
			),
		).toEqual(expectedServices);
		expect(cards.every(({ ctaText }) => ctaText?.trim())).toBe(true);
	}
});

test("all locales match the QUESTIONARIOS budget tiers and alternate intake fields", async () => {
	const expectedBudgets = {
		"first-space": ["under-25k", "25-50k", "50-80k", "over-80k", "undecided"],
		"existing-space": [
			"under-20k",
			"20-40k",
			"40-70k",
			"over-70k",
			"undecided",
		],
		growth: ["under-30k", "30-60k", "60-100k", "over-100k", "undecided"],
		alternate: ["under-10k", "10-30k", "30-60k", "over-60k", "undecided"],
	};
	for (const locale of ["es", "en", "ca"]) {
		const doc = JSON.parse(
			await readFile(`translations/${locale}.json`, "utf8"),
		);
		const inquiry = doc.contactForm.inquiryPaths;
		for (const path of inquiry.paths) {
			const investment = path.fields.find(({ name }) => name === "investment");
			expect(investment?.options.map(({ value }) => value)).toEqual(
				expectedBudgets[path.value],
			);
		}
		expect(inquiry.alternate.fields.map(({ name }) => name)).toEqual([
			"website",
			"challenge",
			"timeline",
			"investment",
		]);
		const alternateInvestment = inquiry.alternate.fields.find(
			({ name }) => name === "investment",
		);
		expect(alternateInvestment?.options.map(({ value }) => value)).toEqual(
			expectedBudgets.alternate,
		);
	}
});
