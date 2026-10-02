import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

const readPage = async (locale, page) =>
	JSON.parse(
		await readFile(
			new URL(`../pages/${locale}/${page}.json`, import.meta.url),
			"utf8",
		),
	);

test("English and Catalan about and contact pages retain Spanish page structure and media", async () => {
	for (const locale of ["en", "ca"]) {
		for (const pageName of ["about", "contact"]) {
			const source = await readPage("es", pageName);
			const localized = await readPage(locale, pageName);
			expect(localized.blocks.map(({ _template }) => _template)).toEqual(
				source.blocks.map(({ _template }) => _template),
			);
			expect(localized.blocks.map(({ mediaId }) => mediaId)).toEqual(
				source.blocks.map(({ mediaId }) => mediaId),
			);
		}
	}
});

test("localized about pages include both source paragraphs", async () => {
	for (const locale of ["en", "ca"]) {
		const page = await readPage(locale, "about");
		expect(page.blocks[0].content.children).toHaveLength(2);
		expect(page.blocks[0].content.children[1].children[0].text).not.toContain(
			"escenario donde la marca cobra vida",
		);
	}
});
