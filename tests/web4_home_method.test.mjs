import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

const readPage = async (file) =>
	JSON.parse(await readFile(new URL(file, import.meta.url), "utf8"));

test("Spanish homepage follows the WEB4 section order and owner copy", async () => {
	const page = await readPage("../pages/es/home.json");
	expect(page.blocks.map((block) => block._template)).toEqual([
		"banner",
		"hero",
		"showcase",
		"text",
		"callout",
		"showcase",
		"accordion",
		"showcase",
		"list",
		"feed",
	]);
	expect(page.blocks[0].title).toBe("Comunica.\nCautiva.\nConecta.");
	expect(page.blocks[1]).toMatchObject({
		title: "EL ESPACIO ES\nDONDE TU MARCA\nCOBRA VIDA.",
		intro:
			"Diseñamos espacios para marcas que tienen algo que decir.\nEspacio, Identidad de Marca & Estrategia.",
		ctaText: "¿Quieres que tu espacio hable?",
		ctaLink: "/es/contact",
	});
	expect(page.blocks[2].items).toEqual([
		{
			title: "RUDE / RETAIL",
			link: "/es/works/rude",
			ctaText: "VER PROYECTO",
			mediaId: "projects/rude/cover",
			imageAlt: "Interior de la tienda RUDE, con zona de exposición y probadores.",
		},
	]);
	expect(page.blocks[3]).toMatchObject({
		title:
			"Si tu producto o servicio te hace diferente, tu espacio tiene que demostrarlo.",
		headingLevel: "h2",
		body: "Diseñamos interiores con lenguaje visual propio, integrados en el universo de tu marca y pensados para funcionar como una parte real de tu negocio.\n\nAnalizamos cómo se mueve tu cliente, cómo trabaja tu equipo y qué necesita el espacio para que marca, experiencia y operativa trabajen juntas.",
	});
	expect(page.blocks[4]).toMatchObject({
		_template: "callout",
		text: "Nuestro método",
		link: "/es/methods",
	});
	expect(page.blocks[6]).toMatchObject({
		intro: {
			type: "root",
			children: [
				{
					type: "h2",
					children: [
						{
							type: "text",
							text: "¿Qué puede hacer el diseño por tu negocio?",
						},
					],
				},
			],
		},
		items: [
			{
				number: "1",
				title: "DIFERENCIAR TU MARCA",
				summary:
					"Tu espacio comunica quién eres y qué te hace diferente. Haz que sea tan reconocible como tu marca.",
			},
			{
				number: "2",
				title: "ELEVAR SU VALOR",
				summary:
					"El diseño eleva el valor percibido, atrae al cliente adecuado y te permite posicionar tu producto o servicio en el nivel que merece.",
			},
			{
				number: "3",
				title: "CONVERTIR TU ESPACIO EN UNA HERRAMIENTA",
				summary:
					"Una distribución inteligente agiliza la operativa, facilita la venta y mejora la experiencia del cliente. Haz que cada metro cuadrado trabaje para tu negocio.",
			},
		],
	});
	expect(page.blocks[8]).toMatchObject({
		title: "Queremos entenderte.\n¿En qué punto está tu negocio?",
		items: [
			{ title: "Quiero abrir mi primer espacio", href: "/es/contact?path=first-space" },
			{ title: "Mi local no funciona como debería", href: "/es/contact?path=existing-space" },
			{ title: "Quiero escalar mi negocio", href: "/es/contact?path=growth" },
			{ title: "¿Tienes otro reto? Hablemos", href: "/es/contact" },
		],
	});
});

test("Spanish methods phases match the WEB4 sequence and approved descriptions", async () => {
	const page = await readPage("../pages/es/services.json");
	const methods = page.blocks.find(
		(block) => block._template === "accordion" && block.items?.length === 4,
	);
	expect(
		methods?.items.map(({ number, title, summary }) => ({
			number,
			title,
			summary,
		})),
	).toEqual([
		{
			number: "01",
			title: "Diagnóstico y estrategia espacial",
			summary:
				"Antes de diseñar, analizamos tu marca, tu negocio y las necesidades del espacio para definir una estrategia que haga que todo trabaje en la misma dirección.",
		},
		{
			number: "02",
			title: "Concepto creativo",
			summary:
				"Traducimos tu estrategia en una experiencia espacial memorable. Diseñamos el recorrido del cliente y una atmósfera visual capaz de hacer que tu negocio destaque y tenga una identidad propia.",
		},
		{
			number: "03",
			title: "Desarrollo técnico",
			summary:
				"Convertimos la visión creativa en un proyecto ejecutable. Desarrollamos toda la documentación técnica necesaria para llevar el proyecto de interiorismo a la realidad con control y coherencia.",
		},
		{
			number: "04",
			title: "Supervisión de obra y coordinación de montaje",
			summary:
				"Acompañamos el proceso de ejecución para que la transición del papel a la realidad sea fiel al diseño, resolviendo imprevistos y coordinando el montaje.",
		},
	]);
});
