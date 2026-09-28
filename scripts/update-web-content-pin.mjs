import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const pinPattern =
	/const revision = process\.env\.SENSHAC_CONTENT_REVISION \?\?\s*\n\s*"([a-f0-9]{40})";/g;

export async function updateWebContentPin(webRoot, revision) {
	if (!/^[a-f0-9]{40}$/.test(revision)) {
		throw new Error(
			"Content revision must be a full 40-character lowercase SHA",
		);
	}

	const scriptPath = resolve(webRoot, "scripts/sync-editorial-content.mjs");
	const source = await readFile(scriptPath, "utf8");
	const matches = [...source.matchAll(pinPattern)];
	if (matches.length !== 1) {
		throw new Error(
			"Expected exactly one default SENSHAC_CONTENT_REVISION pin",
		);
	}

	const previousRevision = matches[0][1];
	if (previousRevision === revision) return false;

	const updated = source.replace(
		pinPattern,
		`const revision = process.env.SENSHAC_CONTENT_REVISION ??\n\t"${revision}";`,
	);
	await writeFile(scriptPath, updated);
	return true;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	const [webRoot, revision, ...extra] = process.argv.slice(2);
	if (!webRoot || !revision || extra.length > 0) {
		console.error(
			"Usage: node scripts/update-web-content-pin.mjs <web-root> <content-sha>",
		);
		process.exitCode = 2;
	} else {
		try {
			const changed = await updateWebContentPin(webRoot, revision);
			console.log(
				changed
					? `Updated web content pin to ${revision}`
					: "Web content pin already current",
			);
		} catch (error) {
			console.error(error instanceof Error ? error.message : String(error));
			process.exitCode = 1;
		}
	}
}
