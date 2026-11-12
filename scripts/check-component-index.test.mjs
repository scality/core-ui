import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// Run as a child process, not imported: the script runs its check on load.
const SCRIPT = path.resolve(process.cwd(), 'scripts/check-component-index.mjs');

let workspace;

const write = (name, contents) => {
  const file = path.join(workspace, name);
  fs.writeFileSync(file, contents);
  return file;
};

const page = (rows) => `# Component index

| Export    | Use it for   | Import from        | Docs                                              |
| --------- | ------------ | ------------------ | ------------------------------------------------- |
${rows.join('\n')}
`;

const row = (name, docsId = 'components-alpha--stories') =>
  `| \`${name}\` | Does a thing. | \`@scality/core-ui\` | [Stories](?path=/docs/${docsId}) |`;

const STORYBOOK_INDEX = JSON.stringify({
  v: 5,
  entries: { 'components-alpha--stories': { id: 'components-alpha--stories' } },
});

const run = ({ entry, indexPage, storybookIndex }) => {
  const args = [SCRIPT, '--entry', entry, '--index-page', indexPage];
  if (storybookIndex) args.push('--storybook-index', storybookIndex);
  try {
    return {
      status: 0,
      output: execFileSync('node', args, { encoding: 'utf8' }),
    };
  } catch (error) {
    return { status: error.status, output: `${error.stdout}${error.stderr}` };
  }
};

beforeEach(() => {
  workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'component-index-'));
});

afterEach(() => {
  fs.rmSync(workspace, { recursive: true, force: true });
});

describe('the component index check', () => {
  it('passes when every export has a row and every link resolves', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      indexPage: write('page.mdx', page([row('Alpha')])),
      storybookIndex: write('index.json', STORYBOOK_INDEX),
    });

    expect(status).toBe(0);
    expect(output).toContain('Component index up to date');
  });

  it('names the export that has no row', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha, Beta } from './alpha';\n`),
      indexPage: write('page.mdx', page([row('Alpha')])),
    });

    expect(status).toBe(1);
    expect(output).toContain('have no row');
    expect(output).toContain('Beta');
  });

  it('names the row that no entry point exports', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      indexPage: write('page.mdx', page([row('Alpha'), row('Ghost')])),
    });

    expect(status).toBe(1);
    expect(output).toContain('name something no entry point exports');
    expect(output).toContain('Ghost');
  });

  it('names an export that has been given two rows', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      indexPage: write('page.mdx', page([row('Alpha'), row('Alpha')])),
    });

    expect(status).toBe(1);
    expect(output).toContain('more than one row');
  });

  it('does not accept a row shown inside a code fence as a real row', () => {
    const indexPage = write(
      'page.mdx',
      `${page([row('Alpha')])}
\`\`\`md
${row('Beta')}
\`\`\`
`,
    );
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha, Beta } from './alpha';\n`),
      indexPage,
    });

    expect(status).toBe(1);
    expect(output).toContain('Beta');
  });

  it('names a Docs link that points at nothing', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      indexPage: write(
        'page.mdx',
        page([row('Alpha', 'components-gone--stories')]),
      ),
      storybookIndex: write('index.json', STORYBOOK_INDEX),
    });

    expect(status).toBe(1);
    expect(output).toContain('components-gone--stories');
  });

  it('ignores an export that has been commented out', () => {
    const { status } = run({
      entry: write(
        'entry.ts',
        `export { Alpha } from './alpha';\n// export { Beta } from './beta';\n`,
      ),
      indexPage: write('page.mdx', page([row('Alpha')])),
    });

    expect(status).toBe(0);
  });

  it('ignores type-only exports, in either form', () => {
    const { status } = run({
      entry: write(
        'entry.ts',
        `export { Alpha, type Gamma } from './alpha';\n` +
          `export type { Delta } from './delta';\n`,
      ),
      indexPage: write('page.mdx', page([row('Alpha')])),
    });

    expect(status).toBe(0);
  });

  it('refuses to pass a file whose export form it cannot read', () => {
    const { status, output } = run({
      entry: write(
        'entry.ts',
        `export { Alpha } from './alpha';\nexport * from './beta';\n`,
      ),
      indexPage: write('page.mdx', page([row('Alpha')])),
    });

    expect(status).toBe(1);
    expect(output).toContain('export forms this check does not read');
  });

  it('rejects a mistyped argument instead of checking half of what was asked', () => {
    const entry = write('entry.ts', `export { Alpha } from './alpha';\n`);
    const indexPage = write('page.mdx', page([row('Alpha')]));
    let result;
    try {
      execFileSync(
        'node',
        [SCRIPT, '--entry', entry, '--index-pag', indexPage],
        {
          encoding: 'utf8',
        },
      );
      result = { status: 0, output: '' };
    } catch (error) {
      result = {
        status: error.status,
        output: `${error.stdout}${error.stderr}`,
      };
    }

    expect(result.status).toBe(1);
    expect(result.output).toContain('Unrecognised argument');
  });

  it('refuses to pass a table row whose first cell is not one export name', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      indexPage: write(
        'page.mdx',
        page([row('Alpha'), '| `Alpha` and `Beta` | Two. | — | — |']),
      ),
    });

    expect(status).toBe(1);
    expect(output).toContain('do not start with one backticked export name');
  });

  it('refuses to pass a page whose code fence is never closed', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      indexPage: write('page.mdx', `${page([row('Alpha')])}\n\`\`\`md\n`),
    });

    expect(status).toBe(1);
    expect(output).toContain('unclosed code fence');
  });

  it('says so when the Storybook index is not a Storybook index', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      indexPage: write('page.mdx', page([row('Alpha')])),
      storybookIndex: write('index.json', '[]'),
    });

    expect(status).toBe(1);
    expect(output).toContain('is not a Storybook index');
  });

  it('does not accept a row inside a tilde fence as a real row', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha, Beta } from './alpha';\n`),
      indexPage: write(
        'page.mdx',
        `${page([row('Alpha')])}\n~~~md\n${row('Beta')}\n~~~\n`,
      ),
    });

    expect(status).toBe(1);
    expect(output).toContain('Beta');
  });

  it('keeps a longer fence open across the shorter one it quotes', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha, Beta } from './alpha';\n`),
      indexPage: write(
        'page.mdx',
        `${page([row('Alpha')])}\n\`\`\`\`md\n\`\`\`md\n${row('Beta')}\n\`\`\`\n\`\`\`\`\n`,
      ),
    });

    expect(status).toBe(1);
    expect(output).toContain('Beta');
  });
});
