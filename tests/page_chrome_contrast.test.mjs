import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

const readJson = async (path) =>
	JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));

test("home uses light header text over the dark hero", async () => {
	for (const locale of ["es", "ca", "en"]) {
		const home = await readJson(`../pages/${locale}/home.json`);
		expect(home.chrome?.header).toMatchObject({
			scrolling: "transparent-light",
			atFinal: "opaque-light",
		});
	}
});

test("design-reference pages use dark header text on light starts", async () => {
	for (const locale of ["es", "ca", "en"]) {
		for (const pageName of ["about", "services"]) {
			const page = await readJson(`../pages/${locale}/${pageName}.json`);
			expect(page.chrome?.header).toMatchObject({
				scrolling: "transparent-dark",
				atFinal: "opaque-light",
			});
		}

		const translations = await readJson(`../translations/${locale}.json`);
		expect(translations.projects?.chrome?.header).toMatchObject({
			scrolling: "transparent-dark",
			atFinal: "opaque-light",
		});
	}
});
