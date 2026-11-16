import { parseSync } from '@babel/core';
import fs from 'fs';
import path from 'path';

type Entry = { title: string; name: string };

const previewPath = path.join(__dirname, 'preview.tsx');
const previewSource = fs.readFileSync(previewPath, 'utf8');

/**
 * Storybook extracts this arrow's source as text and evaluates it apart from the
 * module, not as an imported function — so the test re-implements that same
 * extraction.
 */
const readSortSidebar = (): ((a: Entry, b: Entry) => number) => {
  const ast = parseSync(previewSource, { filename: previewPath });
  const property = (node, key) =>
    node?.properties?.find((candidate) => candidate.key?.name === key)?.value;

  const parameters = ast.program.body
    .flatMap((node) =>
      node.type === 'ExportNamedDeclaration'
        ? (node.declaration?.declarations ?? [])
        : [],
    )
    .find((declaration) => declaration.id.name === 'parameters')?.init;
  const storySort = property(property(parameters, 'options'), 'storySort');

  if (storySort?.type !== 'ArrowFunctionExpression')
    throw new Error(
      'storySort must stay an inline arrow under parameters.options: Storybook reads it statically and rejects a reference to a function defined elsewhere',
    );
  if (storySort.params.some((parameter) => parameter.typeAnnotation))
    throw new Error(
      'storySort cannot annotate its parameters: Storybook evaluates its source as plain JavaScript',
    );

  // eslint-disable-next-line no-eval
  return (0, eval)(`(${previewSource.slice(storySort.start, storySort.end)})`);
};

const sortSidebar = readSortSidebar();

const entry = (title: string, name: string): Entry => ({ title, name });

const sidebar = (entries: Entry[]) =>
  [...entries].sort(sortSidebar).map((e) => `${e.title} :: ${e.name}`);

describe('storySort', () => {
  it('puts a guideline first even when its file is nowhere near its stories', () => {
    const sorted = sidebar([
      entry('Components/Accordion', 'Stories'),
      entry('Components/Accordion', 'Playground'),
      entry('Components/Button', 'Stories'),
      entry('Components/Accordion', 'Guideline'),
    ]);

    expect(sorted).toEqual([
      'Components/Accordion :: Guideline',
      'Components/Accordion :: Stories',
      'Components/Accordion :: Playground',
      'Components/Button :: Stories',
    ]);
  });

  it('keeps the stories of one component in the order they were authored', () => {
    const sorted = sidebar([
      entry('Components/Accordion', 'Stories'),
      entry('Components/Accordion', 'Zebra'),
      entry('Components/Accordion', 'Alpha'),
    ]);

    expect(sorted).toEqual([
      'Components/Accordion :: Stories',
      'Components/Accordion :: Zebra',
      'Components/Accordion :: Alpha',
    ]);
  });

  // A misspelled section or category name here goes unranked rather than
  // erroring, dropping it below the names that still rank.
  it('orders the sections and every component category', () => {
    const sorted = sidebar([
      entry('Components/Styling/Box', 'Stories'),
      entry('Introduction', 'Introduction'),
      entry('Guidelines/Responsive', 'Stories'),
      entry('Components/Progress & loading/Stepper', 'Stories'),
      entry('Components/Deprecated/Banner', 'Stories'),
      entry('Style/Colors', 'Stories'),
      entry('Components/Feedback/Toast', 'Stories'),
      entry('Templates/Form', 'Stories'),
      entry('Component index', 'Stories'),
      entry('Components/Data Display/Card', 'Stories'),
      entry('Components/Navigation/Tabs', 'Stories'),
      entry('Components/Inputs/Checkbox', 'Stories'),
    ]);

    expect(sorted).toEqual([
      'Introduction :: Introduction',
      'Component index :: Stories',
      'Style/Colors :: Stories',
      'Guidelines/Responsive :: Stories',
      'Templates/Form :: Stories',
      'Components/Navigation/Tabs :: Stories',
      'Components/Data Display/Card :: Stories',
      'Components/Inputs/Checkbox :: Stories',
      'Components/Feedback/Toast :: Stories',
      'Components/Progress & loading/Stepper :: Stories',
      'Components/Styling/Box :: Stories',
      'Components/Deprecated/Banner :: Stories',
    ]);
  });

  it('puts a section above the components nested under it', () => {
    expect(
      sidebar([
        entry('Components/Navigation/Tabs', 'Stories'),
        entry('Components', 'Stories'),
      ]),
    ).toEqual([
      'Components :: Stories',
      'Components/Navigation/Tabs :: Stories',
    ]);
  });
});

const storiesDir = path.join(__dirname, '..', 'stories');

const filesUnder = (dir: string, suffix: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((item) => {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) return filesUnder(full, suffix);
    return item.name.endsWith(suffix) ? [full] : [];
  });

const attachedPages = filesUnder(storiesDir, '.mdx').flatMap((file) => {
  const source = fs.readFileSync(file, 'utf8');
  const tag = source.match(/<Meta\b([^>]*)>/);
  const of = tag?.[1].match(/\bof=\{(\w+)\}/);
  if (!of) return [];
  return [{ file, of: of[1], name: tag?.[1].match(/\bname="([^"]*)"/)?.[1], source }];
});

// A page attached with `of={...}` and no name is named after `docs.defaultName`
// and takes the generated props table's place, so the component silently loses a
// page instead of gaining one. The name is also what `storySort` ranks it by.
it.each(attachedPages.map((page) => path.relative(storiesDir, page.file)))(
  'stories/%s declares name="Guideline"',
  (file) => {
    const page = attachedPages.find(
      (candidate) => path.relative(storiesDir, candidate.file) === file,
    );
    expect(page?.name).toBe('Guideline');
  },
);

const documented = new Set(
  attachedPages
    .filter((page) => page.name === 'Guideline')
    .map((page) => {
      const imported = page.source.match(
        new RegExp(`import \\* as ${page.of} from '([^']+)'`),
      );
      return imported
        ? `${path.join(path.dirname(page.file), imported[1].replace(/\.tsx$/, ''))}.tsx`
        : '';
    }),
);

const missingGuideline = filesUnder(storiesDir, '.stories.tsx').filter(
  (file) => !documented.has(file),
);
if (missingGuideline.length > 0)
  console.warn(
    [
      `${missingGuideline.length} components have no guideline:`,
      ...missingGuideline.map((file) => `  ${path.relative(storiesDir, file)}`),
    ].join('\n'),
  );
