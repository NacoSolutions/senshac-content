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
			block.items?.some((item) => item.title === "CONSULTORÍA EXPRÉS"),
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
			title: "CONSULTORÍA EXPRÉS",
			text: "Sesión intensiva de dos horas con entrega de dosier 72h después.\nAuditamos tu local para darte directrices sobre cómo integrar tu marca en el espacio, optimizar la distribución y mejorar tus flujos de venta.",
			action: "Agenda sesión",
			href: "/es/contact?package=consultation",
		},
		{
			title: "PROYECTO DECORATIVO",
			text: "Transformación puntual y estilismo sin obras.\nPensado para actualizar una única estancia, redefinir elementos clave (como una barra de bar o diseñar luminarias a medida) o bien refrescar el mobiliario para que encaje a la perfección con tu espacio y tu marca.",
			action: "Cuéntanos qué necesitas",
			href: "/es/contact?package=decorative",
		},
		{
			title: "PROYECTO INTEGRAL",
			text: "Acompañamiento 360º desde la idea hasta la apertura.\nAbarcamos todo el proceso desde la estrategia inicial hasta la ejecución final. La opción ideal si buscas delegar el proyecto con absoluta tranquilidad.",
			action: "Solicita información",
			href: "/es/contact?package=integral",
		},
	]);
});
