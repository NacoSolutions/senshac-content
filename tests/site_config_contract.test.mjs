import { expect, test } from "bun:test";
import siteConfig from "../config/site.json" with { type: "json" };
import siteSchema from "../schema/site-config.schema.json" with { type: "json" };

const modes = new Set(siteSchema.$defs.chromeElement.properties.mode.enum);
const appearances = new Set(siteSchema.$defs.appearance.enum);

for (const elementName of ["header", "footer"]) {
	test(`${elementName} uses the canonical chrome contract`, () => {
		const element = siteConfig.chrome[elementName];
		expect(modes.has(element.mode)).toBe(true);
		expect(Object.keys(element).sort()).toEqual(["atFinal", "mode", "scrolling"]);
		expect(appearances.has(element.atFinal)).toBe(true);
		expect(appearances.has(element.scrolling)).toBe(true);
	});
}

test("chrome schema exposes the editable header and footer fields", () => {
	expect(siteSchema.$defs.chrome.required).toEqual(["header", "footer"]);
	expect(siteSchema.$defs.chromeElement.required).toEqual([
		"mode",
		"atFinal",
		"scrolling",
	]);
});
