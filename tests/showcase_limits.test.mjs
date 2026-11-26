import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { validateBlocks } from "../scripts/validate_blocks.mjs";

test("showcase limit, maxVisible, and scrollStep accept integers from one through three", async () => {
	const directory = await mkdtemp(join(tmpdir(), "senshac-showcase-contract-"));
	const home = join(directory, "home.json");

	try {
		await writeFile(
			home,
			JSON.stringify({
				blocks: [
					{ _template: "showcase", limit: 3, maxVisible: 3, scrollStep: 3 },
					{ _template: "showcase", maxVisible: 2, scrollStep: 1 },
				],
			}),
		);
		assert.deepEqual(await validateBlocks([directory]), []);

		for (const [field, value] of [
			["limit", 0],
			["limit", 1.5],
			["limit", 4],
			["maxVisible", 0],
			["maxVisible", 1.5],
			["maxVisible", 4],
			["scrollStep", 0],
			["scrollStep", 1.5],
			["scrollStep", 4],
		]) {
			await writeFile(
				home,
				JSON.stringify({ blocks: [{ _template: "showcase", [field]: value }] }),
			);
			assert.ok(
				(await validateBlocks([directory])).some((error) =>
					error.includes(`showcase ${field} must be an integer between 1 and 3`),
				),
			);
		}
	} finally {
		await rm(directory, { recursive: true, force: true });
	}
});
