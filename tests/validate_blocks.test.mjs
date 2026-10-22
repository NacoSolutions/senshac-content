import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { validateBlocks } from "../scripts/validate_blocks.mjs";

test("feed disableLinks accepts only booleans", async () => {
	const directory = await mkdtemp(join(tmpdir(), "senshac-block-contract-"));
	const home = join(directory, "home.json");

	try {
		await writeFile(
			home,
			JSON.stringify({ blocks: [{ _template: "feed", disableLinks: true }] }),
		);
		assert.deepEqual(await validateBlocks([directory]), []);

		await writeFile(
			home,
			JSON.stringify({ blocks: [{ _template: "feed", disableLinks: "false" }] }),
		);
		assert.ok(
			(await validateBlocks([directory])).some((error) =>
				error.includes("feed disableLinks must be a boolean"),
			),
		);
	} finally {
		await rm(directory, { recursive: true, force: true });
	}
});
