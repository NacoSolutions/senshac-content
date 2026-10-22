import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

const readPage = async (file) =>
	JSON.parse(await readFile(new URL(file, import.meta.url), "utf8"));

const homeOrder = [
	"hero",
	"showcase",
	"showcase",
	"text",
	"showcase",
	"callout",
	"accordion",
	"feed",
	"list",
	"list",
];

const inquiryHrefs = (locale) => [
	`/${locale}/contact?situation=first-space`,
	`/${locale}/contact?situation=existing-space`,
	`/${locale}/contact?situation=growth`,
	`/${locale}/contact?situation=growth&service=other-challenge`,
];

test("localized homepages include the five reference phases without changing inquiry routes", async () => {
	const titles = {
		es: ["Nos conocemos", "Análisis y medidas", "Exploramos opciones", "Diseño final", "Presupuesto transparente"],
		ca: ["Ens coneixem", "Anàlisi i mesures", "Explorem opcions", "Disseny final", "Pressupost transparent"],
		en: ["Getting to know you", "Analysis and measurements", "Exploring options", "Final design", "Transparent budget"],
	};
	for (const locale of ["es", "ca", "en"]) {
		const page = await readPage(`../pages/${locale}/home.json`);
		const phaseRail = page.blocks.find(
			({ _template, variant }) => _template === "list" && variant === "phase-scroll",
		);
		expect(phaseRail).toBeDefined();
		expect(phaseRail.items.map(({ number }) => number)).toEqual(["01", "02", "03", "04", "05"]);
		expect(phaseRail.items.map(({ title }) => title)).toEqual(titles[locale]);
		expect(page.blocks.find(({ _template, variant }) => _template === "list" && !variant).items.map(({ href }) => href)).toEqual(inquiryHrefs(locale));
	}
});

test("Spanish homepage follows the approved opening and retains the inquiry paths", async () => {
	const page = await readPage("../pages/es/home.json");
	expect(page.blocks.map((block) => block._template)).toEqual(homeOrder);
	expect(page.blocks[0]).toMatchObject({
		title: "DISEÑAMOS ESPACIOS\nPARA MARCAS QUE TIENEN\nALGO QUE DECIR.",
		intro: "Espacio, Identidad de Marca & Estrategia.",
		ctaText: "¿Quieres que tu espacio hable?",
		ctaLink: "/es/contact",
	});
	expect(page.blocks[1]).toMatchObject({
		_template: "showcase",
		eyebrow: "interior design studio®",
		title: "Comunica.\nCautiva.\nConecta.",
	});
	expect(page.blocks[1]).not.toHaveProperty("mediaId");
	expect(page.blocks[1]).not.toHaveProperty("items");
	expect(page.blocks[2].items).toEqual([
		{
			title: "RUDE / RETAIL",
			link: "/es/works/rude",
			ctaText: "VER PROYECTO",
			mediaId: "projects/rude/cover",
			imageAlt:
				"Interior de la tienda RUDE, con zona de exposición y probadores.",
		},
	]);
	expect(page.blocks[3]).toMatchObject({
		title:
			"Si tu producto o servicio te hace diferente, tu espacio tiene que demostrarlo.",
		headingLevel: "h2",
		body: "Diseñamos interiores con lenguaje visual propio, integrados en el universo de tu marca y pensados para funcionar como una parte real de tu negocio.\n\nAnalizamos cómo se mueve tu cliente, cómo trabaja tu equipo y qué necesita el espacio para que marca, experiencia y operativa trabajen juntas.",
	});
	expect(page.blocks[4]).toMatchObject({
		_template: "showcase",
		mediaType: "video",
		mediaId:
			"https://media.senshac.com/videos/redesign/horizontal-1-corto/master.m3u8",
	});
	expect(page.blocks[5]).toMatchObject({
		_template: "callout",
		text: "Nuestro método",
		link: "/es/methods",
	});
	expect(page.blocks[6].items.map((item) => item.title)).toEqual([
		"DIFERENCIAR TU MARCA",
		"ELEVAR SU VALOR",
		"CONVERTIR TU ESPACIO EN UNA HERRAMIENTA",
	]);
	expect(page.blocks[7]).toMatchObject({
		_template: "feed",
		tag: "novedades",
		limit: 4,
		maxVisible: 3,
		disableLinks: true,
	});
	expect(page.blocks[9].items.map((item) => item.href)).toEqual(
		inquiryHrefs("es"),
	);

});

test("localized homepages keep the same structure and locale-correct paths", async () => {
	const heroCopy = {
		es: [
			"DISEÑAMOS ESPACIOS\nPARA MARCAS QUE TIENEN\nALGO QUE DECIR.",
			"Espacio, Identidad de Marca & Estrategia.",
		],
		ca: [
			"DISSENYEM ESPAIS\nPER A MARQUES QUE\nTENEN ALGUNA COSA A DIR.",
			"Espai, Identitat de Marca & Estratègia.",
		],
		en: [
			"WE DESIGN SPACES\nFOR BRANDS WITH\nSOMETHING TO SAY.",
			"Space, Brand Identity & Strategy.",
		],
	};
const carouselTitles = {
	es: "Comunica.\nCautiva.\nConecta.",
	ca: "Comunica.\nCaptiva.\nConnecta.",
	en: "Communicate.\nCaptivate.\nConnect.",
};
	for (const locale of ["es", "ca", "en"]) {

		const page = await readPage(`../pages/${locale}/home.json`);
		expect(page.blocks.map(({ _template }) => _template)).toEqual(homeOrder);
		expect(page.blocks[0]).toMatchObject({
			title: heroCopy[locale][0],
			intro: heroCopy[locale][1],
			ctaLink: `/${locale}/contact`,
		});
		expect(page.blocks.find(({ _template, variant }) => _template === "list" && !variant).items.map(({ href }) => href)).toEqual(
			inquiryHrefs(locale),
		);
		expect(page.blocks[1]).toMatchObject({
			_template: "showcase",
			eyebrow: "interior design studio®",
			title: carouselTitles[locale],
		});
		expect(page.blocks[1]).not.toHaveProperty("mediaId");
		expect(page.blocks[2].items[0]).toMatchObject({
			link: `/${locale}/works/rude`,
			mediaId: "projects/rude/cover",
		});
		expect(page.blocks[4]).toMatchObject({
			mediaType: "video",
			mediaId:
				"https://media.senshac.com/videos/redesign/horizontal-1-corto/master.m3u8",
		});
		expect(page.blocks[7]).toMatchObject({
			_template: "feed",
			tag: "novedades",
			limit: 4,
			maxVisible: 3,
			disableLinks: true,
		});
	}
});

test("Spanish methods phases match the WEB4 sequence and approved descriptions", async () => {
	const page = await readPage("../pages/es/services.json");
	expect(page.title).toBe("Servicios - Sens*Hac");
	expect(page.blocks.map(({ _template }) => _template)).toEqual([
		"text",
		"list",
		"showcase",
		"accordion",
		"callout",
		"showcase",
		"callout",
		"showcase",
		"accordion",
	]);
	expect(page.blocks[0]).toMatchObject({
		title: "SERVICIOS A MEDIDA DE TUS NECESIDADES:",
		headingLevel: "h1",
	});
	expect(page.blocks[1].intro.children[0].children[0].text).toBe(
		"Sabemos que no hay dos situaciones iguales, por eso te ofrecemos la flexibilidad de contratar sólo lo que necesitas:",
	);
	const methods = page.blocks.find(
		(block) => block._template === "accordion" && block.items?.length === 4,
	);
	expect(methods?.intro.children[0].children[0].text).toBe(
		"El paso a paso: de la estrategia a la apertura.",
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

test("English and Catalan pages follow the WEB4 homepage and method structure", async () => {
	for (const locale of ["en", "ca"]) {
		const methods = await readPage(`../pages/${locale}/services.json`);
		expect(methods.blocks.map(({ _template }) => _template)).toEqual([
			"text",
			"list",
			"showcase",
			"accordion",
			"callout",
			"showcase",
			"callout",
			"showcase",
			"accordion",
		]);
		expect(methods.blocks[3].items).toHaveLength(4);
		expect(methods.blocks[8].items).toHaveLength(7);
		expect(methods.title).toBe(
			locale === "ca" ? "Serveis - Sens*Hac" : "Services - Sens*Hac",
		);
		expect(methods.blocks[1].intro.children[0].children[0].text).toBe(
			locale === "ca"
				? "Sabem que no hi ha dues situacions iguals; per això t’oferim la flexibilitat de contractar només el que necessites:"
				: "We know no two situations are alike, so we offer the flexibility to choose only what you need:",
		);
		expect(methods.blocks[3].intro.children[0].children[0].text).toBe(
			locale === "ca"
				? "El pas a pas: de l’estratègia a l’obertura."
				: "Step by step: from strategy to opening.",
		);
	}
});
