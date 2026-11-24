import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// Run as a child process, not imported: the script runs on load.
const SCRIPT = path.resolve(process.cwd(), 'scripts/component-index.mjs');

const STABLE = '@scality/core-ui';
const NEXT = '@scality/core-ui/dist/next';

let workspace;

const write = (name, contents) => {
  const file = path.join(workspace, name);
  fs.writeFileSync(file, contents);
  return file;
};

const templateFor = (groups) =>
  `# Component index\n\n${groups
    .map((group) => `## ${group}\n\n{/* table: ${group} */}\n`)
    .join('\n')}`;

const entryRow = (
  name,
  use = 'Does a thing.',
  docs = 'components-alpha--stories',
) => ({
  export: name,
  use,
  docs,
});

const STORYBOOK_INDEX = JSON.stringify({
  v: 5,
  entries: {
    'components-alpha--stories': { id: 'components-alpha--stories' },
    'components-alpha--guideline': { id: 'components-alpha--guideline' },
  },
});

const run = ({
  entry,
  entries,
  data,
  template,
  page,
  storybookIndex,
  write: writePage,
  args,
}) => {
  const argv = args ?? [];
  if (!args) {
    for (const declaration of entries ?? [`${entry}=${STABLE}`]) {
      argv.push('--entry', declaration);
    }
    argv.push('--data', data, '--template', template, '--page', page);
    if (storybookIndex) argv.push('--storybook-index', storybookIndex);
    if (writePage) argv.push('--write');
  }
  try {
    return {
      status: 0,
      output: execFileSync('node', [SCRIPT, ...argv], { encoding: 'utf8' }),
    };
  } catch (error) {
    return { status: error.status, output: `${error.stdout}${error.stderr}` };
  }
};

const generated = ({ entry, entries, groups, storybookIndex }) => {
  const options = {
    entry,
    entries,
    data: write('data.json', JSON.stringify(groups)),
    template: write('template.mdx', templateFor(Object.keys(groups))),
    page: path.join(workspace, 'page.mdx'),
    storybookIndex,
  };
  const written = run({ ...options, write: true });
  return {
    written,
    page: () => fs.readFileSync(options.page, 'utf8'),
    check: () => run(options),
    rewrite: () => run({ ...options, write: true }),
  };
};

beforeEach(() => {
  workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'component-index-'));
});

afterEach(() => {
  fs.rmSync(workspace, { recursive: true, force: true });
});

describe('generating the component index', () => {
  it('writes a page the check then accepts', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      groups: { Buttons: [entryRow('Alpha')] },
      storybookIndex: write('index.json', STORYBOOK_INDEX),
    });

    expect(index.written.status).toBe(0);
    const { status, output } = index.check();
    expect(status).toBe(0);
    expect(output).toContain('is up to date');
  });

  it('lists only the entry point that exports the name', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      groups: { Buttons: [entryRow('Alpha')] },
    });

    expect(index.page()).toContain(`\`${STABLE}\``);
    expect(index.page()).not.toContain(NEXT);
  });

  it('writes both entry points when both export the name', () => {
    const index = generated({
      entries: [
        `${write('stable.ts', `export { Alpha } from './alpha';\n`)}=${STABLE}`,
        `${write('next.ts', `export { Alpha } from './alpha';\n`)}=${NEXT}`,
      ],
      groups: { Buttons: [entryRow('Alpha')] },
    });

    expect(index.page()).toContain(`\`${STABLE}\` · \`${NEXT}\``);
  });

  it('labels a guideline link Guideline and a story link Stories', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha, Beta } from './alpha';\n`),
      groups: {
        Buttons: [
          entryRow('Alpha', 'Does a thing.', 'components-alpha--guideline'),
          entryRow('Beta'),
        ],
      },
    });

    expect(index.page()).toContain(
      '[Guideline](?path=/docs/components-alpha--guideline)',
    );
    expect(index.page()).toContain(
      '[Stories](?path=/docs/components-alpha--stories)',
    );
  });

  it('writes an em dash for a row with no documentation', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      groups: { Buttons: [entryRow('Alpha', 'Does a thing.', null)] },
    });

    expect(index.page()).toMatch(/\|\s+—\s+\|/);
  });

  it('escapes a pipe in a sentence so it does not open a column', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      groups: { Buttons: [entryRow('Alpha', 'Takes a | b.')] },
    });

    expect(index.page()).toContain('Takes a \\| b.');
    expect(index.check().status).toBe(0);
  });
  it('escapes a backslash before a pipe, so the pipe stays escaped', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      groups: { Buttons: [entryRow('Alpha', 'Writes a\\|b.')] },
    });

    expect(index.page()).toContain('Writes a\\\\\\|b.');
    expect(index.check().status).toBe(0);
  });
});

describe('checking the committed component index', () => {
  it('fails and names the first line that does not match', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      groups: { Buttons: [entryRow('Alpha', 'Does a thing.')] },
    });
    fs.writeFileSync(
      path.join(workspace, 'page.mdx'),
      index.page().replace('Does a thing.', 'Does another thing.'),
    );

    const { status, output } = index.check();
    expect(status).toBe(1);
    expect(output).toContain('Does another thing.');
    expect(output).toContain('npm run generate:component-index');
  });

  it('accepts the page again once it has been regenerated', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      groups: { Buttons: [entryRow('Alpha')] },
    });
    fs.writeFileSync(path.join(workspace, 'page.mdx'), 'stale\n');

    expect(index.check().status).toBe(1);
    expect(index.rewrite().status).toBe(0);
    expect(index.check().status).toBe(0);
  });

  it('says a committed page that stops early stops early', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      groups: { Buttons: [entryRow('Alpha')] },
    });
    const kept = index.page().split('\n').slice(0, 3).join('\n');
    fs.writeFileSync(path.join(workspace, 'page.mdx'), kept);

    const { status, output } = index.check();
    expect(status).toBe(1);
    expect(output).toContain('6 line(s) short');
    expect(output).not.toMatch(/-\d+ line/);
  });

  it('says so when the page has never been generated', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      groups: { Buttons: [entryRow('Alpha')] },
    });
    fs.rmSync(path.join(workspace, 'page.mdx'));

    const { status, output } = index.check();
    expect(status).toBe(1);
    expect(output).toContain('does not exist');
  });

  it('names the export that has no row', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha, Beta } from './alpha';\n`),
      groups: { Buttons: [entryRow('Alpha')] },
    });

    expect(index.written.status).toBe(1);
    expect(index.written.output).toContain('1 export(s) have no row');
    expect(index.written.output).toContain('Beta');
  });

  it('names the row that no entry point exports', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      groups: { Buttons: [entryRow('Alpha'), entryRow('Ghost')] },
    });

    expect(index.written.status).toBe(1);
    expect(index.written.output).toContain('name something no entry point');
    expect(index.written.output).toContain('Ghost (Buttons)');
  });

  it('names an export given a row in two groups', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      groups: { Buttons: [entryRow('Alpha')], Inputs: [entryRow('Alpha')] },
    });

    expect(index.written.status).toBe(1);
    expect(index.written.output).toContain(
      'Alpha has a row in Buttons and in Inputs',
    );
  });

  it('names a Docs link that points at nothing', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      groups: {
        Buttons: [entryRow('Alpha', 'Does a thing.', 'gone--stories')],
      },
      storybookIndex: write('index.json', STORYBOOK_INDEX),
    });

    expect(index.written.status).toBe(1);
    expect(index.written.output).toContain('does not exist');
    expect(index.written.output).toContain('gone--stories (Alpha)');
  });

  it('checks a Docs link written in the prose, not only in a row', () => {
    const data = write(
      'data.json',
      JSON.stringify({ Buttons: [entryRow('Alpha')] }),
    );
    const template = write(
      'template.mdx',
      `# Index\n\nSee [the rules](?path=/docs/gone--stories).\n\n## Buttons\n\n{/* table: Buttons */}\n`,
    );
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      data,
      template,
      page: path.join(workspace, 'page.mdx'),
      storybookIndex: write('index.json', STORYBOOK_INDEX),
      write: true,
    });

    expect(status).toBe(1);
    expect(output).toContain('gone--stories');
  });
});

describe('reading the template and the data', () => {
  it('names a group that the template never places', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      data: write(
        'data.json',
        JSON.stringify({ Buttons: [entryRow('Alpha')] }),
      ),
      template: write('template.mdx', `# Index\n`),
      page: path.join(workspace, 'page.mdx'),
      write: true,
    });

    expect(status).toBe(1);
    expect(output).toContain('no {/* table: … */} placeholder for');
    expect(output).toContain('Buttons');
  });

  it('names a placeholder that has no rows', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      data: write(
        'data.json',
        JSON.stringify({ Buttons: [entryRow('Alpha')] }),
      ),
      template: write('template.mdx', templateFor(['Buttons', 'Inputs'])),
      page: path.join(workspace, 'page.mdx'),
      write: true,
    });

    expect(status).toBe(1);
    expect(output).toContain('places a table for "Inputs"');
  });

  it('refuses a row with no sentence saying what the export is for', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      data: write(
        'data.json',
        JSON.stringify({ Buttons: [{ export: 'Alpha', use: '', docs: null }] }),
      ),
      template: write('template.mdx', templateFor(['Buttons'])),
      page: path.join(workspace, 'page.mdx'),
      write: true,
    });

    expect(status).toBe(1);
    expect(output).toContain('has no "use" sentence');
  });

  it('refuses a docs id that is not one, such as a pasted link', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      data: write(
        'data.json',
        JSON.stringify({
          Buttons: [
            {
              export: 'Alpha',
              use: 'Does a thing.',
              docs: '?path=/docs/components-alpha--stories',
            },
          ],
        }),
      ),
      template: write('template.mdx', templateFor(['Buttons'])),
      page: path.join(workspace, 'page.mdx'),
      write: true,
    });

    expect(status).toBe(1);
    expect(output).toContain('needs a "docs" story id');
  });

  it('refuses a sentence MDX would not read as text', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      data: write(
        'data.json',
        JSON.stringify({
          Buttons: [entryRow('Alpha', 'Shows {count} items.', null)],
        }),
      ),
      template: write('template.mdx', templateFor(['Buttons'])),
      page: path.join(workspace, 'page.mdx'),
      write: true,
    });

    expect(status).toBe(1);
    expect(output).toContain('a brace or an angle bracket');
  });

  it('refuses a sentence carrying a newline, which would shear the table', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      data: write(
        'data.json',
        JSON.stringify({
          Buttons: [entryRow('Alpha', 'Does a thing.\nAnd another.', null)],
        }),
      ),
      template: write('template.mdx', templateFor(['Buttons'])),
      page: path.join(workspace, 'page.mdx'),
      write: true,
    });

    expect(status).toBe(1);
    expect(output).toContain('newline');
  });

  it('refuses a group declared twice, which JSON would collapse', () => {
    const { status, output } = run({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      data: write(
        'data.json',
        '{"Buttons": [{"export":"Alpha","use":"a","docs":null}],' +
          ' "Buttons": [{"export":"Beta","use":"b","docs":null}]}',
      ),
      template: write('template.mdx', templateFor(['Buttons'])),
      page: path.join(workspace, 'page.mdx'),
      write: true,
    });

    expect(status).toBe(1);
    expect(output).toContain('Buttons is declared more than once');
  });

  it('says so when the Storybook index is not a Storybook index', () => {
    const index = generated({
      entry: write('entry.ts', `export { Alpha } from './alpha';\n`),
      groups: { Buttons: [entryRow('Alpha')] },
      storybookIndex: write('index.json', JSON.stringify({ v: 5 })),
    });

    expect(index.written.status).toBe(1);
    expect(index.written.output).toContain('not a Storybook index');
  });
});

describe('reading the entry points', () => {
  it('ignores an export that has been commented out', () => {
    const index = generated({
      entry: write(
        'entry.ts',
        `export { Alpha } from './alpha';\n// export { Beta } from './beta';\n`,
      ),
      groups: { Buttons: [entryRow('Alpha')] },
    });

    expect(index.written.status).toBe(0);
  });

  it('ignores type-only exports, in either form', () => {
    const index = generated({
      entry: write(
        'entry.ts',
        `export { Alpha } from './alpha';\n` +
          `export type { Props } from './alpha';\n` +
          `export { type Options } from './alpha';\n`,
      ),
      groups: { Buttons: [entryRow('Alpha')] },
    });

    expect(index.written.status).toBe(0);
  });

  it('refuses a file whose export form it cannot read', () => {
    const index = generated({
      entry: write('entry.ts', `export * from './alpha';\n`),
      groups: { Buttons: [] },
    });

    expect(index.written.status).toBe(1);
    expect(index.written.output).toContain(
      'export forms this check does not read',
    );
    expect(index.written.output).toContain('export *');
  });

  it('refuses an export aliased to default, or named by a string', () => {
    const index = generated({
      entry: write(
        'entry.ts',
        `export { Alpha } from './alpha';\n` +
          `export { Alpha as default } from './alpha';\n` +
          `export { Alpha as "a name" } from './alpha';\n`,
      ),
      groups: { Buttons: [entryRow('Alpha')] },
    });

    expect(index.written.status).toBe(1);
    expect(index.written.output).toContain('export default at line 2');
    expect(index.written.output).toContain(
      'an export named by a string at line 3',
    );
  });

  it('refuses an entry point given without the import path readers type', () => {
    const { status, output } = run({
      args: ['--entry', 'src/lib/index.ts'],
    });

    expect(status).toBe(1);
    expect(output).toContain('needs the import path readers type');
  });
});

describe('reading the arguments', () => {
  it('rejects a mistyped flag instead of taking it for a file path', () => {
    const { status, output } = run({ args: ['--storybok-index', 'x.json'] });

    expect(status).toBe(1);
    expect(output).toContain('Unrecognised argument "--storybok-index"');
  });

  it('rejects --write given a value, which would write instead of check', () => {
    const { status, output } = run({ args: ['--write=false'] });

    expect(status).toBe(1);
    expect(output).toContain('--write takes no value');
  });

  it('rejects a known flag given no value', () => {
    const { status, output } = run({ args: ['--data', '--write'] });

    expect(status).toBe(1);
    expect(output).toContain('--data needs a file path');
  });
});
