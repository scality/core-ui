import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

// The subpath each entry point is published under, which the file cannot
// state itself.
const DEFAULT_ENTRY_POINTS = {
  'src/lib/index.ts': '',
  'src/lib/next.ts': 'dist/next',
};
const DEFAULT_PAGE = 'stories/ComponentIndex.mdx';
const DEFAULT_TEMPLATE = 'stories/ComponentIndex.template.md';
const DEFAULT_DATA = 'stories/ComponentIndex.data.json';

const BANNER =
  '{/* Generated from ComponentIndex.template.md and ComponentIndex.data.json' +
  ' — run `npm run generate:component-index`. */}';

// Storybook ids are lowercased alphanumerics and dashes, and a row's sentence
// has to survive MDX.
const STORY_ID = /^[a-z0-9]+(?:-+[a-z0-9]+)*$/;
const UNSAFE_IN_A_CELL = /[\n{}<]/;

const COLUMNS = ['Export', 'Use it for', 'Import from', 'Docs'];
const NO_DOCS = '—';

const USAGE = `Usage: node scripts/component-index.mjs [options]

  --write                   Write the page. Without it, the committed page is
                            compared with what the data generates and a
                            difference fails the run.
  --entry <file>=<package>  An entry point, and the import path a reader types
                            to reach what it exports. Repeatable. Default:
                            ${Object.keys(DEFAULT_ENTRY_POINTS).join(' and ')},
                            under the name package.json publishes.
  --page <file>             The page to write. Default: ${DEFAULT_PAGE}
  --template <file>         Its prose, with a {/* table: <group> */} placeholder
                            per table. Default: ${DEFAULT_TEMPLATE}
  --data <file>             The row of each export, by group. Default: ${DEFAULT_DATA}
  --storybook-index <file>  A built storybook-static/index.json. Without it,
                            the Docs links are not resolved.

Paths are relative to the current directory.`;

const PATH_FLAGS = {
  '--page': 'page',
  '--template': 'template',
  '--data': 'data',
  '--storybook-index': 'storybookIndex',
};

function parseEntry(value) {
  const separator = value.indexOf('=');
  const specifier = value.slice(separator + 1);
  if (separator === -1 || !specifier) {
    throw new Error(
      `--entry needs the import path readers type as well as the file: ` +
        `--entry ${value.replace(/=$/, '')}=<package>\n\n${USAGE}`,
    );
  }
  return { file: path.resolve(value.slice(0, separator)), specifier };
}

function defaultEntryPoints() {
  const manifest = path.join(repoRoot, 'package.json');
  const { name } = JSON.parse(fs.readFileSync(manifest, 'utf8'));
  if (!name) {
    throw new Error(
      `${relative(manifest)} has no "name", so the import paths the page gives ` +
        `cannot be checked.`,
    );
  }
  return Object.entries(DEFAULT_ENTRY_POINTS).map(([file, subpath]) => ({
    file: path.join(repoRoot, file),
    specifier: subpath ? `${name}/${subpath}` : name,
  }));
}

function parseArguments(argv) {
  const entryPoints = [];
  const paths = {};
  let write = false;

  for (let i = 0; i < argv.length; i++) {
    const argument = argv[i];
    const separator = argument.indexOf('=');
    const flag = separator === -1 ? argument : argument.slice(0, separator);

    if (flag === '--write') {
      if (separator !== -1) {
        throw new Error(`--write takes no value.\n\n${USAGE}`);
      }
      write = true;
      continue;
    }
    if (flag !== '--entry' && !(flag in PATH_FLAGS)) {
      throw new Error(`Unrecognised argument "${argument}".\n\n${USAGE}`);
    }

    const value = separator === -1 ? argv[++i] : argument.slice(separator + 1);
    if (!value || value.startsWith('--')) {
      throw new Error(`${flag} needs a file path.\n\n${USAGE}`);
    }

    if (flag === '--entry') entryPoints.push(parseEntry(value));
    else paths[PATH_FLAGS[flag]] = path.resolve(value);
  }

  return {
    write,
    entryPoints: entryPoints.length ? entryPoints : defaultEntryPoints(),
    page: paths.page ?? path.join(repoRoot, DEFAULT_PAGE),
    template: paths.template ?? path.join(repoRoot, DEFAULT_TEMPLATE),
    data: paths.data ?? path.join(repoRoot, DEFAULT_DATA),
    storybookIndex: paths.storybookIndex,
  };
}

const relative = (absolutePath) =>
  path.relative(repoRoot, absolutePath) || absolutePath;

function bindingNames(name) {
  if (ts.isIdentifier(name)) return [name.text];
  if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
    return name.elements.flatMap((element) =>
      ts.isBindingElement(element) ? bindingNames(element.name) : [],
    );
  }
  return [];
}

function collectValueExports(absolutePath) {
  const source = ts.createSourceFile(
    absolutePath,
    fs.readFileSync(absolutePath, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );
  const names = new Set();
  const unsupported = [];
  const lineOf = (node) =>
    source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
  const reject = (node, what) =>
    unsupported.push(`${what} at line ${lineOf(node)}`);

  source.forEachChild((node) => {
    if (ts.isExportDeclaration(node)) {
      if (node.isTypeOnly) return;
      if (!node.exportClause) return reject(node, 'export *');
      if (ts.isNamespaceExport(node.exportClause)) {
        names.add(node.exportClause.name.text);
        return;
      }
      for (const element of node.exportClause.elements) {
        if (element.isTypeOnly) continue;
        if (!ts.isIdentifier(element.name)) {
          reject(element, 'an export named by a string');
        } else if (element.name.text === 'default') {
          reject(element, 'export default');
        } else {
          names.add(element.name.text);
        }
      }
      return;
    }

    // `export default x` and `export = x` carry no export modifier, so they
    // would otherwise fall through the check below unseen.
    if (ts.isExportAssignment(node)) return reject(node, 'export default');

    const modifiers = ts.getModifiers(node) ?? [];
    if (!modifiers.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) return;
    if (modifiers.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword)) {
      return reject(node, 'export default');
    }

    if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node))
      return;

    if (ts.isVariableStatement(node)) {
      for (const declaration of node.declarationList.declarations) {
        const bound = bindingNames(declaration.name);
        if (!bound.length) reject(declaration, 'a binding with no plain name');
        for (const name of bound) names.add(name);
      }
    } else if (
      (ts.isFunctionDeclaration(node) ||
        ts.isClassDeclaration(node) ||
        ts.isEnumDeclaration(node)) &&
      node.name
    ) {
      names.add(node.name.text);
    } else {
      reject(node, ts.SyntaxKind[node.kind]);
    }
  });

  if (unsupported.length) {
    throw new Error(
      `${relative(absolutePath)} uses export forms this check does not read, so ` +
        `it cannot vouch for the file. Teach it these first:\n  ${unsupported.join('\n  ')}`,
    );
  }
  return names;
}

function readRowData(absolutePath) {
  const shown = relative(absolutePath);
  const source = fs.readFileSync(absolutePath, 'utf8');
  let parsed;
  try {
    parsed = JSON.parse(source);
  } catch (error) {
    throw new Error(`${shown} is not readable JSON: ${error.message}`);
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`${shown} must be an object of group name to rows.`);
  }

  const rows = new Map();
  const groups = new Map();
  const malformed = [];

  // JSON.parse keeps only the last of two identical keys, so a second block
  // for a group would silently drop the first.
  const declared = [...source.matchAll(/"((?:[^"\\]|\\.)*)"\s*:\s*\[/g)].map(
    (match) => match[1],
  );
  for (const group of new Set(declared)) {
    if (declared.filter((name) => name === group).length > 1) {
      malformed.push(`${group} is declared more than once`);
    }
  }

  for (const [group, entries] of Object.entries(parsed)) {
    if (!Array.isArray(entries)) {
      malformed.push(`${group} is not a list of rows`);
      continue;
    }
    groups.set(group, entries);
    entries.forEach((entry, position) => {
      const where = `${group}[${position}]`;
      if (!entry || typeof entry.export !== 'string' || !entry.export) {
        malformed.push(`${where} has no "export" name`);
        return;
      }
      if (typeof entry.use !== 'string' || !entry.use.trim()) {
        malformed.push(`${where} (${entry.export}) has no "use" sentence`);
      } else if (UNSAFE_IN_A_CELL.test(entry.use)) {
        // The page is MDX, where `{` opens an expression and `<` a tag, and a
        // newline ends the table. Each renders as something other than text.
        malformed.push(
          `${where} (${entry.export}) has a "use" sentence holding a newline, ` +
            `a brace or an angle bracket`,
        );
      }
      if (entry.docs !== null && !STORY_ID.test(entry.docs ?? '')) {
        malformed.push(
          `${where} (${entry.export}) needs a "docs" story id such as ` +
            `components-button--guideline, or null. Give the id alone, not the ` +
            `whole ?path= link.`,
        );
      }
      if (rows.has(entry.export)) {
        malformed.push(
          `${entry.export} has a row in ${rows.get(entry.export).group} and in ${group}`,
        );
        return;
      }
      rows.set(entry.export, { ...entry, group });
    });
  }

  if (malformed.length) {
    throw new Error(`${shown} cannot be read:\n  ${malformed.join('\n  ')}`);
  }
  return { rows, groups };
}

function readStorybookEntryIds(absolutePath) {
  const shown = relative(absolutePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(
      `No Storybook index at ${shown}. Build it first: npm run build-storybook`,
    );
  }
  let index;
  try {
    index = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  } catch (error) {
    throw new Error(`${shown} is not readable JSON: ${error.message}`);
  }
  const entries = index?.entries;
  if (!entries || typeof entries !== 'object' || Array.isArray(entries)) {
    throw new Error(
      `${shown} has no "entries" object, so it is not a Storybook index.`,
    );
  }
  return new Set(Object.keys(entries));
}

// The backslash goes first, or escaping a pipe that already follows one
// would leave the pipe itself unescaped.
const cell = (text) => text.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');

const docsCell = (id) =>
  id === null
    ? NO_DOCS
    : `[${id.endsWith('--guideline') ? 'Guideline' : 'Stories'}](?path=/docs/${id})`;

function renderTable(entries, exportedFrom) {
  const rows = entries.map((entry) => [
    cell(`\`${entry.export}\``),
    cell(entry.use),
    cell(
      exportedFrom
        .get(entry.export)
        .map((s) => `\`${s}\``)
        .join(' · '),
    ),
    cell(docsCell(entry.docs)),
  ]);

  const widths = COLUMNS.map((heading, column) =>
    Math.max(heading.length, ...rows.map((row) => row[column].length)),
  );
  const line = (cells) =>
    `| ${cells.map((text, column) => text.padEnd(widths[column])).join(' | ')} |`;

  return [
    line(COLUMNS),
    line(widths.map((width) => '-'.repeat(width))),
    ...rows.map(line),
  ].join('\n');
}

const PLACEHOLDER = /^\{\/\* table: (.+?) \*\/\}$/;

function renderPage({ template, groups, exportedFrom }) {
  const placed = new Set();
  const body = fs
    .readFileSync(template, 'utf8')
    .split('\n')
    .map((templateLine) => {
      const placeholder = templateLine.trim().match(PLACEHOLDER);
      if (!placeholder) return templateLine;
      const group = placeholder[1];
      if (!groups.has(group)) {
        throw new Error(
          `${relative(template)} places a table for "${group}", which has no rows.`,
        );
      }
      placed.add(group);
      return renderTable(groups.get(group), exportedFrom);
    })
    .join('\n');

  const unplaced = [...groups.keys()].filter((group) => !placed.has(group));
  if (unplaced.length) {
    throw new Error(
      `${relative(template)} has no {/* table: … */} placeholder for:\n  ${unplaced.join('\n  ')}`,
    );
  }
  return `${BANNER}\n${body}`;
}

const indented = (items) => items.map((item) => `  ${item}`).join('\n');

function run(argv) {
  const { write, entryPoints, page, template, data, storybookIndex } =
    parseArguments(argv);

  const exportedFrom = new Map();
  for (const { file, specifier } of entryPoints) {
    for (const name of collectValueExports(file)) {
      const specifiers = exportedFrom.get(name);
      if (!specifiers) exportedFrom.set(name, [specifier]);
      else if (!specifiers.includes(specifier)) specifiers.push(specifier);
    }
  }

  const shownData = relative(data);
  const { rows, groups } = readRowData(data);
  const failures = [];

  const missingRows = [...exportedFrom.keys()]
    .filter((name) => !rows.has(name))
    .sort();
  if (missingRows.length) {
    failures.push(
      `${missingRows.length} export(s) have no row in ${shownData}. Add one ` +
        `each, under the group it belongs to:\n${indented(missingRows)}`,
    );
  }

  const staleRows = [...rows.keys()]
    .filter((name) => !exportedFrom.has(name))
    .sort();
  if (staleRows.length) {
    failures.push(
      `${staleRows.length} row(s) in ${shownData} name something no entry ` +
        `point exports. Remove them, or export them:\n` +
        indented(staleRows.map((name) => `${name} (${rows.get(name).group})`)),
    );
  }

  if (failures.length) {
    return {
      ok: false,
      report: `Component index out of date.\n\n${failures.join('\n\n')}`,
    };
  }

  const rendered = renderPage({ template, groups, exportedFrom });
  const shownPage = relative(page);

  const links = new Set(
    [...rendered.matchAll(/\?path=\/docs\/([A-Za-z0-9-]+)/g)].map((m) => m[1]),
  );
  let linkSummary = `${links.size} Docs link(s) not resolved (no --storybook-index)`;
  if (storybookIndex) {
    const entryIds = readStorybookEntryIds(storybookIndex);
    const owner = new Map();
    for (const [name, row] of rows) if (row.docs) owner.set(row.docs, name);
    const brokenLinks = [...links]
      .filter((id) => !entryIds.has(id))
      .sort()
      .map((id) => `${id} (${owner.get(id) ?? 'in the prose'})`);
    if (brokenLinks.length) {
      return {
        ok: false,
        report:
          `${brokenLinks.length} Docs link(s) point at a story or docs id ` +
          `that does not exist:\n${indented(brokenLinks)}`,
      };
    }
    linkSummary = `${links.size} Docs link(s) resolved against ${entryIds.size} Storybook entries`;
  }
  const counts =
    `${exportedFrom.size} value export(s) across ` +
    `${entryPoints.map(({ file }) => relative(file)).join(' and ')}, ` +
    `${rows.size} row(s) in ${shownData}, ${linkSummary}.`;

  if (write) {
    fs.writeFileSync(page, rendered);
    return { ok: true, report: `Wrote ${shownPage}: ${counts}` };
  }

  const rerun = 'Run npm run generate:component-index and commit the result.';
  if (!fs.existsSync(page)) {
    return { ok: false, report: `${shownPage} does not exist. ${rerun}` };
  }
  const committed = fs.readFileSync(page, 'utf8');
  if (committed !== rendered) {
    return {
      ok: false,
      report:
        `${shownPage} is not what ${shownData} and ${relative(template)} ` +
        `generate${describeFirstDifference(committed, rendered)}\n\n${rerun}`,
    };
  }
  return { ok: true, report: `${shownPage} is up to date: ${counts}` };
}

function describeFirstDifference(committed, rendered) {
  const was = committed.split('\n');
  const now = rendered.split('\n');
  const at = was.findIndex((line, index) => line !== now[index]);
  // Every line matched, so the committed page is a prefix of the generated one
  // and simply stops early.
  if (at === -1) {
    return `: it stops at line ${was.length}, ${now.length - was.length} line(s) short.`;
  }
  return `, from line ${at + 1}:\n\n  committed: ${was[at]}\n  generated: ${now[at] ?? '(end of file)'}`;
}

try {
  const { ok, report } = run(process.argv.slice(2));
  if (ok) console.log(report);
  else console.error(report);
  process.exit(ok ? 0 : 1);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
