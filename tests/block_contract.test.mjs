import { expect, test } from "bun:test";
import { validateBlocks } from "../scripts/validate_blocks.mjs";

test("localized pages and projects use supported generic blocks", async () => {
	expect(await validateBlocks()).toEqual([]);
});

test("legacy and unknown template names fail with a file and block location", async () => {
	const errors = await validateBlocks(["tests/fixtures/legacy-blocks"]);
	expect(errors).toEqual([
		"tests/fixtures/legacy-blocks/home.json blocks[0] uses unsupported template editorialBanner",
	]);
});

test("unknown fields fail instead of being ignored", async () => {
	const errors = await validateBlocks(["tests/fixtures/unknown-block-field"]);
	expect(errors).toEqual([
		"tests/fixtures/unknown-block-field/home.json blocks[0] has unsupported fields: legacyTitle",
	]);
});

test("layout variants are explicit for media blocks", async () => {
	const errors = await validateBlocks(["tests/fixtures/invalid-block-variant"]);
	expect(errors).toEqual([
		"tests/fixtures/invalid-block-variant/home.json blocks[0] has unsupported media variant undefined",
	]);
});
