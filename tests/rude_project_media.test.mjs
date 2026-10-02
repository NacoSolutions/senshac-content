import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

for (const locale of ["es", "ca", "en"]) {
	test(`${locale} RUDE project uses the canonical WEB4 cover without empty media blocks`, async () => {
		const project = JSON.parse(
			await readFile(
				new URL(`../projects/${locale}/rude.json`, import.meta.url),
				"utf8",
			),
		);
		expect(project.blocks).toHaveLength(1);
		expect(project.blocks[0]).toMatchObject({
			_template: "media",
			variant: "banner",
			mediaId: "projects/rude/cover",
		});
		expect(project.blocks[0].alt.trim()).not.toBe("");
	});
}
