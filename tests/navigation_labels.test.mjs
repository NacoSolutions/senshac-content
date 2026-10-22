import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

const expected = {
	es: {
		social: "Síguenos",
		menu: "Menú",
		letsTalk: "Hablemos",
		links: ["Conócenos", "Proyectos", "Servicios", "Contacto"],
	},
	ca: {
		social: "Segueix-nos",
		menu: "Menú",
		letsTalk: "Parlem",
		links: ["Coneix-nos", "Projectes", "Serveis", "Contacte"],
	},
	en: {
		social: "Follow us",
		menu: "Menu",
		letsTalk: "Let's talk",
		links: ["About", "Projects", "Services", "Contact"],
	},
};

test("localized navigation labels preserve every existing route", async () => {
	const routes = ["studio", "works", "methods", "contact"];
	for (const locale of ["es", "ca", "en"]) {
		const document = JSON.parse(
			await readFile(
				new URL(`../translations/${locale}.json`, import.meta.url),
				"utf8",
			),
		);
		expect(document.nav).toMatchObject({
			social: expected[locale].social,
			menu: expected[locale].menu,
			letsTalk: expected[locale].letsTalk,
		});
		for (const links of [document.nav.links, document.footer.links]) {
			expect(links.map(({ label }) => label)).toEqual(
				expected[locale].links,
			);
			expect(links.map(({ href }) => href)).toEqual(
				routes.map((route) => `/${locale}/${route}`),
			);
		}
	}
});
