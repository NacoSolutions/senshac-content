import { expect, test } from "bun:test";
import ca from "../pages/ca/home.json" with { type: "json" };
import en from "../pages/en/home.json" with { type: "json" };
import es from "../pages/es/home.json" with { type: "json" };

for (const [locale, page] of Object.entries({ ca, en, es })) {
	test(`${locale} homepage uses page-scoped header styling`, () => {
		expect(page.headerStyle).toBeUndefined();
		expect(page.chrome).toEqual({ header: { style: "transparent" } });
	});
}
