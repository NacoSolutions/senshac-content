import { readFile } from 'node:fs/promises';

const localeFiles = ['translations/es.json', 'translations/en.json', 'translations/ca.json'];
const requiredPathIds = ['first-space', 'existing-space', 'growth'];
const fieldNamePattern = /^[a-z][A-Za-z0-9]*$/;

export async function validateInquiryTranslations(files = localeFiles) {
  const errors = [];
  let baseline;
  for (const file of files) {
    const doc = JSON.parse(await readFile(file, 'utf8'));
    const paths = doc.contactForm?.inquiryPaths?.paths;
    if (!Array.isArray(paths) || paths.length !== requiredPathIds.length) {
      errors.push(`${file} must define exactly ${requiredPathIds.length} inquiry paths`);
      continue;
    }
    const ids = paths.map(({ value }) => value);
    if (new Set(ids).size !== ids.length || ids.some((id, i) => id !== requiredPathIds[i])) {
      errors.push(`${file} inquiry paths must be ordered ${requiredPathIds.join(', ')}`);
    }
    for (const path of paths) {
      if (!path.title?.trim() || !path.description?.trim() || !Array.isArray(path.fields) || !path.fields.length) {
        errors.push(`${file} ${path.value} requires title, description, and fields`);
        continue;
      }
      const names = path.fields.map(({ name }) => name);
      if (new Set(names).size !== names.length || names.some((name) => !fieldNamePattern.test(name))) {
        errors.push(`${file} ${path.value} has duplicate or invalid field names`);
      }
      for (const field of path.fields) {
        if (!field.label?.trim() || !['text', 'textarea', 'select', 'file'].includes(field.kind) || typeof field.required !== 'boolean') {
          errors.push(`${file} ${path.value}.${field.name} has an invalid field contract`);
        }
        if (field.kind === 'select' && (!field.options?.length || new Set(field.options.map(({ value }) => value)).size !== field.options.length || field.options.some(({ value, label }) => !value || !label?.trim()))) {
          errors.push(`${file} ${path.value}.${field.name} requires unique labeled options`);
        }
      }
    }
    const signature = paths.map(({ value, fields }) => [value, fields.map(({ name, kind, required, options }) => [name, kind, required, options?.map(({ value }) => value) ?? []])]);
    if (!baseline) baseline = signature;
    else if (JSON.stringify(signature) !== JSON.stringify(baseline)) errors.push(`${file} inquiry field contracts differ from ${files[0]}`);
  }
  return errors;
}

if (import.meta.main) {
  const errors = await validateInquiryTranslations(process.argv.slice(2).length ? process.argv.slice(2) : undefined);
  if (errors.length) {
    for (const error of errors) console.error(`error: ${error}`);
    process.exit(1);
  }
  console.log('valid: localized inquiry path contracts');
}
