import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

const richText = (value) =>
	(value?.children ?? [])
		.flatMap((node) => node.children ?? [])
		.map((node) => node.text ?? "")
		.join("\n");

test("Spanish services cards match WEB SERVICES.indd names, copy, and actions", async () => {
	const page = JSON.parse(
		await readFile(
			new URL("../pages/es/services.json", import.meta.url),
			"utf8",
		),
	);
	const cards = page.blocks.find(
		(block) =>
			block._template === "list" &&
			block.items?.some((item) => item.title === "CONSULTORÍA ESTRATÉGICA"),
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
			title: "CONSULTORÍA ESTRATÉGICA",
			text: "Sesión intensiva de dos horas con entrega de dosier 72h después.\nUna auditoría de tu espacio para detectar oportunidades y tomar decisiones estratégicas.",
			action: "Agenda sesión ↗",
			href: "/es/methods/consultation",
		},
		{
			title: "ESTILISMO / REBRANDING",
			text: "Transformación puntual o estilismo sin cambios de distribución.\nRenueva la imagen de tu negocio y actualiza elementos para alinearlos con tu marca.",
			action: "Cuéntanos qué necesitas ↗",
			href: "/es/contact?service=decorative-restyling",
		},
		{
			title: "PROYECTO INTEGRAL",
			text: "Acompañamiento 360º desde la idea hasta la apertura.\nPara crear un espacio completamente hecho para tu marca.",
			action: "Solicita información ↗",
			href: "/es/contact?service=integral",
		},
	]);
});
