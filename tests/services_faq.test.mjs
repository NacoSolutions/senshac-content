import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

test("Spanish services FAQ matches WEB4 and contains finalized answers", async () => {
	const page = JSON.parse(
		await readFile(
			new URL("../pages/es/services.json", import.meta.url),
			"utf8",
		),
	);
	const faq = page.blocks.find(
		(block) =>
			block._template === "accordion" &&
			block.intro?.children?.[0]?.children?.[0]?.text === "FAQ'S",
	);

	expect(faq?.items.map((item) => item.title)).toEqual([
		"¿Cuándo es el mejor momento para contactar con el estudio?",
		"¿Hacéis proyectos fuera de nuestra ciudad?",
		"¿Os encargáis de la obra, los permisos y la arquitectura estructural?",
		"¿Qué incluye exactamente la fase de supervisión de obra?",
		"¿Cómo se calculan los honorarios del proyecto?",
		"¿Trabajáis con vuestra propia constructora o puedo elegir a mis industriales?",
		"¿Puedo comprar mis propios materiales?",
	]);
	expect(
		faq?.items.every(
			(item) =>
				item.summary?.trim() && !/pendiente/i.test(JSON.stringify(item)),
		),
	).toBe(true);
});
