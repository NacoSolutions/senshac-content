import { expect, test } from "bun:test";
import { load, validate } from "../scripts/validate_export.mjs";

const fixture = await load("fixtures/editorial-export.json");

test("fixture is valid", () => {
	expect(validate(fixture)).toEqual([]);
});

test("revision must be a pinned SHA", () => {
	const exportCopy = structuredClone(fixture);
	exportCopy.sourceRevision = "latest";
	expect(validate(exportCopy)).toContain(
		"sourceRevision must be a 40-character lowercase Git SHA",
	);
});

test("duplicate locale is rejected", () => {
	const exportCopy = structuredClone(fixture);
	exportCopy.entries.push({ ...exportCopy.entries[0] });
	expect(validate(exportCopy)).toContain(
		"entries[2] duplicates id/locale about-senshac/en",
	);
});

test("missing content is rejected", () => {
	const exportCopy = structuredClone(fixture);
	const { body: _body, ...withoutBody } = exportCopy.entries[0];
	exportCopy.entries[0] = withoutBody;
	expect(validate(exportCopy)).toContain("entries[0].body is required");
});

test("unknown fields are rejected", () => {
	const exportCopy = structuredClone(fixture);
	exportCopy.entries[0].secret = "must not cross the adapter";
	expect(validate(exportCopy)).toContain(
		"entries[0] has unsupported fields: secret",
	);
});
