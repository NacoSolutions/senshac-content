import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

const packages = ["consultation", "decorative", "integral"];

test("localized methods package CTAs preserve stable package identifiers", async () => {
	for (const lang of ["es", "en", "ca"]) {
		const page = JSON.parse(
			await readFile(new URL(`../pages/${lang}/services.json`, import.meta.url), "utf8"),
		);
		const items = page.blocks.flatMap((block) => block.items ?? []).filter((item) => item.ctaText);
		expect(items.map((item) => item.href)).toEqual(
			packages.map((id) => `/${lang}/contact?package=${id}`),
		);
	}
});
