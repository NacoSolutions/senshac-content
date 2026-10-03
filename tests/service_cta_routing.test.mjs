import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

const services = ["strategic-consultation", "decorative-restyling", "integral"];

test("localized methods service CTAs preserve canonical service identifiers", async () => {
	for (const lang of ["es", "en", "ca"]) {
		const page = JSON.parse(
			await readFile(
				new URL(`../pages/${lang}/services.json`, import.meta.url),
				"utf8",
			),
		);
		const items = page.blocks
			.flatMap((block) => block.items ?? [])
			.filter((item) => item.ctaText);
		expect(items.map((item) => item.href)).toEqual(
			services.map((id) => `/${lang}/contact?service=${id}`),
		);
	}
});
