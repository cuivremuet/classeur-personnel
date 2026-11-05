import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export function classify(data) {
  if (!Array.isArray(data.entries)) throw new Error('entries doit être une liste');
  const groups = new Map();
  for (const entry of data.entries) {
    for (const field of ['title', 'collection', 'reference']) {
      if (typeof entry[field] !== 'string' || !entry[field].trim()) throw new Error(`${field} requis`);
    }
    const group = groups.get(entry.collection) ?? [];
    group.push(entry);
    groups.set(entry.collection, group);
  }
  const sections = [...groups.keys()].sort().map(collection => {
    const rows = groups.get(collection).toSorted((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0)
      .map(entry => `| ${cell(entry.title)} | ${cell(entry.reference)} |`);
    return [`## ${cell(collection)}`, '', '| Titre | Référence |', '| --- | --- |', ...rows].join('\n');
  });
  return ['# Classement personnel', ...sections, ''].join('\n\n');
}

function cell(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\\', '\\\\').replaceAll('|', '\\|').replace(/[\r\n]+/g, ' ');
}

async function main() {
  const [input, output] = process.argv.slice(2);
  if (!input || !output) throw new Error('Usage : node main.mjs entree.json index.md');
  const markdown = classify(JSON.parse(await readFile(input, 'utf8')));
  await writeFile(output, markdown, 'utf8');
  console.log('Index écrit. Aucune référence ouverte ou déplacée.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(`Erreur : ${error.message}`); process.exitCode = 1; });
}
