import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

const richText = (value) =>
	(value?.children ?? [])
		.flatMap((node) => node.children ?? [])
		.map((node) => node.text ?? "")
		.join("\n");

test("Spanish services cards match WEB4 names, copy, and actions", async () => {
	const page = JSON.parse(
		await readFile(
			new URL("../pages/es/services.json", import.meta.url),
			"utf8",
		),
	);
	const cards = page.blocks.find(
		(block) =>
			block._template === "list" &&
			block.items?.some((item) => item.title === "Consultoría estratégica"),
	);

	expect(
		cards?.items.map((item) => ({
			title: item.title,
			text: richText(item.text),
			action: item.ctaText,
			href: item.href,
		})),
	).toEqual([
		{
			title: "Consultoría estratégica",
			text: "Sesión intensiva de dos horas con entrega de dosier 72h después. Analizamos tu local y te damos directrices estratégicas para integrar la marca, optimizar el espacio y mejorar los flujos de venta.",
			action: "Solicita una Consultoría estratégica ↗",
			href: "/es/contact?service=strategic-consultation",
		},
		{
			title: "Proyecto Decorativo y Restyling",
			text: "Desarrollamos el concepto espacial y la expresión de marca, seleccionamos mobiliario, iluminación y piezas a medida, con ninguna o mínima modificación de la distribución y sin obra o con intervención mínima.",
			action: "Solicita un Proyecto Decorativo y Restyling ↗",
			href: "/es/contact?service=decorative-restyling",
		},
		{
			title: "Proyecto Integral",
			text: "Acompañamiento 360º desde la idea hasta la apertura. Abarcamos el proceso desde la estrategia inicial hasta la ejecución, incluyendo los cambios de distribución y la obra necesarios.",
			action: "Solicita un Proyecto Integral ↗",
			href: "/es/contact?service=integral",
		},
	]);
});
