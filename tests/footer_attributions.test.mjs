import { expect, test } from "bun:test";
import ca from "../translations/ca.json" with { type: "json" };
import en from "../translations/en.json" with { type: "json" };
import es from "../translations/es.json" with { type: "json" };

for (const [locale, document] of Object.entries({ ca, en, es })) {
	test(`${locale} footer has generic editable attribution pairs`, () => {
		expect(document.footer.attributions).toEqual([
			{ label: expect.any(String), name: "©be mediàtic" },
			{ label: expect.any(String), name: "Naco Solutions" },
		]);
	});

	test(`${locale} work heading is sourced from editable translation content`, () => {
		expect(document.projects.heading.split("\n")).toHaveLength(3);
		expect(document.projects.heading.trim()).not.toBe("");
	});
}
