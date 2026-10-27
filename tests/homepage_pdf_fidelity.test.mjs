import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

const readHome = async (locale) =>
	JSON.parse(await readFile(new URL(`../pages/${locale}/home.json`, import.meta.url), "utf8"));

test("Home carousel is configured for two visible projects and one slide per move", async () => {
	for (const locale of ["es", "ca", "en"]) {
		const home = await readHome(locale);
		const carousel = home.blocks.find((block) => block._template === "showcase" && block.limit === undefined);
		expect(carousel).toMatchObject({ maxVisible: 2, scrollStep: 1 });
	}
});

test("Home benefits and inquiry copy match the PDF in each locale", async () => {
	const expected = {
		es: ["El espacio debe trabajar para ti, y no al revés. El diseño inteligente te ayuda a:", "¿En qué punto estás ahora mismo?", "Cada negocio es un mundo y tiene sus propios retos. Para poder ayudarte, necesito entender tu situación.", "Mi local necesita un cambio"],
		ca: ["L'espai ha de treballar per a tu, i no al revés. El disseny intel·ligent t'ajuda a:", "En quin punt et trobes ara mateix?", "Cada negoci és un món i té els seus propis reptes. Per poder ajudar-te, necessito entendre la teva situació.", "El meu local necessita un canvi"],
		en: ["Your space should work for you, not the other way around. Smart design helps you:", "Where is your business right now?", "Every business is different and has its own challenges. To help you, I need to understand your situation.", "My space needs a change"],
	};
	for (const locale of ["es", "ca", "en"]) {
		const home = await readHome(locale);
		const accordion = home.blocks.find((block) => block._template === "accordion");
		const inquiry = home.blocks.find((block) => block._template === "list" && !block.variant);
		const accordionText = accordion.intro.children.flatMap((node) => node.children ?? []).map((node) => node.text ?? "").join("");
		expect(accordionText).toBe(expected[locale][0]);
		expect(inquiry.title).toBe(expected[locale][1]);
		expect(inquiry.intro).toBe(expected[locale][2]);
		expect(inquiry.items[1].title).toBe(expected[locale][3]);
	}
});
