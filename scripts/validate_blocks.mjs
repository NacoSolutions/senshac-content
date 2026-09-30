#!/usr/bin/env node

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const blockVariants = new Map([
	["media", new Set(["banner", "full"])],
	["text", new Set(["brief", "concept", "strategy"])],
]);
const blockTypes = new Set([
	"accordion",
	"banner",
	"callout",
	"carousel",
	"credits",
	"details",
	"feed",
	"form",
	"gallery",
	"hero",
	"list",
	"media",
	"showcase",
	"statement",
	"text",
]);
const blockFields = new Map(
	Object.entries({
		accordion: ["intro", "items"],
		banner: [
			"title",
			"subtitle",
			"topRight",
			"mediaId",
			"imageAlt",
			"placeholderLabel",
			"objectFit",
		],
		callout: ["text", "link"],
		carousel: ["items"],
		credits: ["title", "list"],
		details: [
			"title",
			"subtitle",
			"mediaId",
			"services",
			"servicesLabel",
			"category",
			"categoryLabel",
			"area",
			"areaLabel",
			"location",
			"locationLabel",
		],
		feed: ["title", "description", "tag", "limit", "maxVisible"],
		form: ["heading", "subheading", "mediaId"],
		gallery: ["cols", "images"],
		hero: [
			"title",
			"intro",
			"ctaText",
			"ctaLink",
			"mediaType",
			"mediaId",
			"imageAlt",
			"placeholderLabel",
			"objectFit",
		],
		list: ["title", "intro", "items"],
		media: ["variant", "mediaId", "alt"],
		showcase: [
			"eyebrow",
			"title",
			"mediaType",
			"mediaId",
			"imageAlt",
			"placeholderLabel",
			"ctaText",
			"ctaLink",
			"items",
		],
		statement: [
			"label",
			"content",
			"statement",
			"mediaId",
			"imageAlt",
			"placeholderLabel",
		],
		text: ["eyebrow", "title", "headingLevel", "variant", "body", "showStar"],
	}).map(([name, fields]) => [name, new Set(["_template", ...fields])]),
);

async function jsonFiles(directory) {
	const files = [];
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const file = path.join(directory, entry.name);
		if (entry.isDirectory()) files.push(...(await jsonFiles(file)));
		else if (entry.isFile() && entry.name.endsWith(".json")) files.push(file);
	}
	return files;
}

export async function validateBlocks(roots = ["pages", "projects"]) {
	const errors = [];
	for (const root of roots) {
		for (const file of await jsonFiles(root)) {
			const document = JSON.parse(await readFile(file, "utf8"));
			if (!Array.isArray(document.blocks)) {
				errors.push(`${file} requires a blocks array`);
				continue;
			}
			for (const [index, block] of document.blocks.entries()) {
				const location = `${file} blocks[${index}]`;
				if (!block || typeof block !== "object" || Array.isArray(block)) {
					errors.push(`${location} must be an object`);
					continue;
				}
				if (!blockTypes.has(block._template)) {
					errors.push(
						`${location} uses unsupported template ${String(block._template)}`,
					);
					continue;
				}
				const unsupportedFields = Object.keys(block)
					.filter((field) => !blockFields.get(block._template)?.has(field))
					.sort();
				if (unsupportedFields.length) {
					errors.push(
						`${location} has unsupported fields: ${unsupportedFields.join(", ")}`,
					);
				}
				if (block._template === "list" && Array.isArray(block.items)) {
					for (const [itemIndex, item] of block.items.entries()) {
						const invalid = Object.keys(item).filter((field) => !["title", "text", "href"].includes(field));
						if (invalid.length) errors.push(`${location} items[${itemIndex}] has unsupported fields: ${invalid.sort().join(", ")}`);
					}
				}
				const variants = blockVariants.get(block._template);
				const variant = block.variant;
				if (
					block._template === "media" &&
					(!variants || !variants.has(variant))
				) {
					errors.push(
						`${location} has unsupported ${block._template} variant ${String(variant)}`,
					);
				}
				if (block._template === "text" && variant && !variants?.has(variant)) {
					errors.push(
						`${location} has unsupported ${block._template} variant ${String(block.variant)}`,
					);
				}
				if (!variants && "variant" in block) {
					errors.push(
						`${location} does not support variant ${String(block.variant)}`,
					);
				}
			}
		}
	}
	return errors;
}

if (import.meta.main) {
	const errors = await validateBlocks(
		process.argv.slice(2).length ? process.argv.slice(2) : undefined,
	);
	if (errors.length) {
		for (const error of errors) console.error(`error: ${error}`);
		process.exit(1);
	}
	console.log("valid: generic block templates and variants");
}
