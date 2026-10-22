import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

const readPage = async (locale, page) =>
	JSON.parse(
		await readFile(
			new URL(`../pages/${locale}/${page}.json`, import.meta.url),
			"utf8",
		),
	);

const studioOrder = ["statement", "showcase", "text", "list", "text", "text", "callout"];

test("English and Catalan about and contact pages retain Spanish structure and media", async () => {
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

test("studio pages include the localized founder story, recognitions, and contact CTA", async () => {
	const expected = {
		es: {
			label: "Ester, sin hache",
			intro: "Soy Ester",
			statement: "Comunica,\nCautiva,\nConecta.",
		},
		ca: {
			label: "Ester, sense hac",
			intro: "Soc l’Ester",
			statement: "Comunica,\nCaptiva,\nConnecta.",
		},
		en: {
			label: "Ester, no H",
			intro: "I’m Ester",
			statement: "Communicate,\nCaptivate,\nConnect.",
		},
	};
	for (const locale of ["es", "ca", "en"]) {
		const page = await readPage(locale, "about");
		expect(page.blocks.map(({ _template }) => _template)).toEqual(studioOrder);
		expect(page.blocks[0]).toMatchObject({
			label: expected[locale].label,
			statement: expected[locale].statement,
		});
		expect(JSON.stringify(page.blocks[0].content)).toContain(
			expected[locale].intro,
		);
		expect(page.blocks[3].items).toHaveLength(4);
		expect(page.blocks.at(-1)).toMatchObject({
			_template: "callout",
			link: `/${locale}/contact`,
		});
		expect(JSON.stringify(page.blocks)).not.toContain(
			"escenario donde la marca cobra vida",
		);
	}
});
