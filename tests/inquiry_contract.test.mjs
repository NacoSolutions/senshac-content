import { expect, test } from "bun:test";
import { validateInquiryTranslations } from "../scripts/validate_inquiries.mjs";

test("all locales define the same three strict inquiry contracts", async () => {
  expect(await validateInquiryTranslations()).toEqual([]);
});

test("unknown inquiry ids fail validation", async () => {
  expect(await validateInquiryTranslations(["tests/fixtures/invalid-inquiry.json"])).toContain("tests/fixtures/invalid-inquiry.json must define exactly 3 inquiry paths");
});
