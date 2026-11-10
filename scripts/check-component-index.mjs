// Checks `stories/ComponentIndex.mdx` against the library's real surface.
//
// A gate that quietly stops catching drift is worse than no gate, so anything
// this script cannot read fails the run instead of being passed over.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

const DEFAULT_ENTRY_POINTS = ['src/lib/index.ts', 'src/lib/next.ts'];
const DEFAULT_INDEX_PAGE = 'stories/ComponentIndex.mdx';

const USAGE = `Usage: node scripts/check-component-index.mjs [options]

  --entry <file>            An entry point to read exports from. Repeatable.
                            Default: ${DEFAULT_ENTRY_POINTS.join(', ')}
  --index-page <file>       The index page to check. Default: ${DEFAULT_INDEX_PAGE}
  --storybook-index <file>  A built storybook-static/index.json. Without it,
                            the Docs links are not resolved.

Paths are relative to the current directory.`;

const FLAGS = ['--entry', '--index-page', '--storybook-index'];

/** An unrecognised argument stops the run, rather than leaving half the check silently off. */
function parseArguments(argv) {
  const entryPoints = [];
  let indexPage;
  let storybookIndex;

  for (let i = 0; i < argv.length; i++) {
    const argument = argv[i];
    const separator = argument.indexOf('=');
    const flag = separator === -1 ? argument : argument.slice(0, separator);

    if (!FLAGS.includes(flag)) {
      throw new Error(`Unrecognised argument "${argument}".\n\n${USAGE}`);
    }

    const value = separator === -1 ? argv[++i] : argument.slice(separator + 1);
    if (!value || value.startsWith('--')) {
      throw new Error(`${flag} needs a file path.\n\n${USAGE}`);
    }

    if (flag === '--entry') entryPoints.push(value);
    else if (flag === '--index-page') indexPage = value;
    else storybookIndex = value;
  }

  return {
    entryPoints: entryPoints.length
      ? entryPoints.map((entry) => path.resolve(entry))
      : DEFAULT_ENTRY_POINTS.map((entry) => path.join(repoRoot, entry)),
    indexPage: indexPage
      ? path.resolve(indexPage)
      : path.join(repoRoot, DEFAULT_INDEX_PAGE),
    storybookIndex: storybookIndex ? path.resolve(storybookIndex) : undefined,
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

/**
 * Parsed with the TypeScript compiler rather than matched with a regex: both
 * entry points keep superseded exports as commented-out lines, and `export
 * type` appears both as a whole clause and as a `type` modifier on a single
 * specifier. A regex reads all three as exports.
 */
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
        if (!element.isTypeOnly) names.add(element.name.text);
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
        bound.forEach((name) => names.add(name));
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

const isSeparatorRow = (line) =>
  line.startsWith('|') && line.includes('-') && /^[\s|:-]+$/.test(line);

/**
 * Read outside code fences and MDX comments: a table shown as an example is
 * markup, and counting it lets the page drift while the check stays green.
 */
function scanIndexPage(absolutePath) {
  const lines = fs.readFileSync(absolutePath, 'utf8').split('\n');
  const rows = new Map();
  const links = new Map();
  const duplicateRows = [];
  const unreadableRows = [];
  let inFence = false;
  let inComment = false;

  lines.forEach((rawLine, zeroBasedLine) => {
    const lineNumber = zeroBasedLine + 1;
    const line = rawLine.trim();

    if (inComment) {
      if (line.includes('*/}')) inComment = false;
      return;
    }
    if (line.startsWith('```')) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;
    if (line.startsWith('{/*')) {
      if (!line.includes('*/}')) inComment = true;
      return;
    }

    for (const match of line.matchAll(/\?path=\/docs\/([A-Za-z0-9-]+)/g)) {
      if (!links.has(match[1])) links.set(match[1], lineNumber);
    }

    if (!line.startsWith('|') || isSeparatorRow(line)) return;
    if (isSeparatorRow(lines[zeroBasedLine + 1]?.trim() ?? '')) return;

    const firstCell = line.split('|')[1]?.trim() ?? '';
    const named = firstCell.match(/^`([A-Za-z_$][\w$]*)`$/);
    if (!named) {
      unreadableRows.push(
        `line ${lineNumber}: ${firstCell || '(empty first cell)'}`,
      );
      return;
    }
    if (rows.has(named[1])) {
      duplicateRows.push(
        `${named[1]} (lines ${rows.get(named[1])} and ${lineNumber})`,
      );
    } else {
      rows.set(named[1], lineNumber);
    }
  });

  if (inFence) {
    throw new Error(
      `${relative(absolutePath)} has an unclosed code fence, so the check cannot ` +
        `tell markup from entries.`,
    );
  }
  return { rows, links, duplicateRows, unreadableRows };
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

const indented = (items) => items.map((item) => `  ${item}`).join('\n');

const withLineNumbers = (names, lineOfName) =>
  indented(names.map((name) => `${name} (line ${lineOfName.get(name)})`));

function check(argv) {
  const { entryPoints, indexPage, storybookIndex } = parseArguments(argv);

  const exported = new Set();
  for (const entryPoint of entryPoints) {
    for (const name of collectValueExports(entryPoint)) exported.add(name);
  }

  const page = relative(indexPage);
  const { rows, links, duplicateRows, unreadableRows } =
    scanIndexPage(indexPage);
  const failures = [];

  if (unreadableRows.length) {
    failures.push(
      `${unreadableRows.length} table row(s) in ${page} do not start with one ` +
        `backticked export name, so the check cannot tell what they claim:\n` +
        indented(unreadableRows),
    );
  }

  if (duplicateRows.length) {
    failures.push(
      `${duplicateRows.length} export(s) have more than one row in ${page}:\n` +
        indented(duplicateRows),
    );
  }

  const missingRows = [...exported].filter((name) => !rows.has(name)).sort();
  if (missingRows.length) {
    failures.push(
      `${missingRows.length} export(s) have no row in ${page}. Add one each:\n` +
        indented(missingRows),
    );
  }

  const staleRows = [...rows.keys()]
    .filter((name) => !exported.has(name))
    .sort();
  if (staleRows.length) {
    failures.push(
      `${staleRows.length} row(s) in ${page} name something no entry point ` +
        `exports. Remove them, or export them:\n` +
        withLineNumbers(staleRows, rows),
    );
  }

  let linkSummary = `${links.size} Docs link(s) not resolved (no --storybook-index)`;
  if (storybookIndex) {
    const entryIds = readStorybookEntryIds(storybookIndex);
    const brokenLinks = [...links.keys()]
      .filter((id) => !entryIds.has(id))
      .sort();
    if (brokenLinks.length) {
      failures.push(
        `${brokenLinks.length} Docs link(s) in ${page} point at a story or docs ` +
          `id that does not exist:\n` +
          withLineNumbers(brokenLinks, links),
      );
    }
    linkSummary = `${links.size} Docs link(s) resolved against ${entryIds.size} Storybook entries`;
  }

  const counts =
    `${exported.size} value export(s) across ` +
    `${entryPoints.map(relative).join(' and ')}, ` +
    `${rows.size + duplicateRows.length} row(s) in ${page}, ${linkSummary}.`;

  return failures.length
    ? {
        ok: false,
        report: `Component index out of date.\n\n${failures.join('\n\n')}\n\n${counts}`,
      }
    : { ok: true, report: `Component index up to date: ${counts}` };
}

try {
  const { ok, report } = check(process.argv.slice(2));
  if (ok) console.log(report);
  else console.error(report);
  process.exit(ok ? 0 : 1);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
