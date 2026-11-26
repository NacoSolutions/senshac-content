import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

const readPage = async (file) =>
	JSON.parse(await readFile(new URL(file, import.meta.url), "utf8"));

test("approved Conócenos and paired Services images have localized fallbacks", async () => {
	for (const locale of ["es", "ca", "en"]) {
		const about = await readPage(`../pages/${locale}/about.json`);
		const portraitIndex = about.blocks.findIndex(
			({ _template }) => _template === "statement",
		);
		const trobadaIndex = about.blocks.findIndex(
			({ _template, mediaId }) =>
				_template === "showcase" &&
				mediaId === "reference-intake/conocenos/la-trobada",
		);
		expect(trobadaIndex).toBe(portraitIndex + 1);
		expect(about.blocks[trobadaIndex].imageAlt).toBeTruthy();
		expect(about.blocks[trobadaIndex].placeholderLabel).toBeTruthy();

		const services = await readPage(`../pages/${locale}/services.json`);
		const imagePair = services.blocks.find(
			({ _template, items }) =>
				_template === "showcase" &&
				Array.isArray(items) &&
				items.some(
					({ mediaId }) =>
						mediaId === "reference-intake/services/materials-left",
				),
		);
		expect(imagePair.items.map(({ mediaId }) => mediaId)).toEqual([
			"reference-intake/services/materials-left",
			"reference-intake/services/pillow-replacement",
		]);
		for (const item of imagePair.items) {
			expect(item.imageAlt).toBeTruthy();
			expect(item.placeholderLabel).toBeTruthy();
		}
	}
});
