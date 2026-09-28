import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { updateWebContentPin } from "../scripts/update-web-content-pin.mjs";

const previousRevision = "d".repeat(40);
const nextRevision = "8".repeat(40);
const source = `const revision = process.env.SENSHAC_CONTENT_REVISION ??\n\t"${previousRevision}";\n`;

async function withWebRoot(run, initialSource = source) {
	const root = await mkdtemp(join(tmpdir(), "senshac-web-pin-"));
	const scripts = join(root, "scripts");
	await mkdir(scripts);
	const path = join(scripts, "sync-editorial-content.mjs");
	await writeFile(path, initialSource);
	try {
		await run(root, path);
	} finally {
		await rm(root, { recursive: true, force: true });
	}
}

test("updates the default pin while preserving the local environment override", async () => {
	await withWebRoot(async (root, path) => {
		assert.equal(await updateWebContentPin(root, nextRevision), true);
		assert.equal(
			await readFile(path, "utf8"),
			`const revision = process.env.SENSHAC_CONTENT_REVISION ??\n\t"${nextRevision}";\n`,
		);
	});
});

test("rejects abbreviated revisions and unexpected pin layouts", async () => {
	await withWebRoot(async (root, path) => {
		await assert.rejects(
			updateWebContentPin(root, "deadbeef"),
			/full 40-character lowercase SHA/,
		);
		await assert.rejects(
			updateWebContentPin(root, nextRevision),
			/exactly one default/,
		);
		assert.equal(
			await readFile(path, "utf8"),
			"const revision = 'not the expected pin';\n",
		);
	}, "const revision = 'not the expected pin';\n");
});

test("is idempotent when the web pin already matches", async () => {
	await withWebRoot(async (root, path) => {
		assert.equal(await updateWebContentPin(root, previousRevision), false);
		assert.equal(await readFile(path, "utf8"), source);
	});
});
