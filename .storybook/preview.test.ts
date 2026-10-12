import fs from 'fs';
import path from 'path';

type Entry = { title: string; name: string };

/**
 * Storybook extracts this arrow's source as text and evaluates it separately
 * from the module — so it must stay inline and carry no TypeScript annotations.
 */
const readSortSidebar = (): ((a: Entry, b: Entry) => number) => {
  const source = fs.readFileSync(path.join(__dirname, 'preview.tsx'), 'utf8');
  const start = source.indexOf('storySort:');
  if (start === -1) throw new Error('no storySort in preview.tsx');

  let depth = 0;
  let end = source.indexOf('{', start);
  for (let i = end; i < source.length; i++) {
    if (source[i] === '{') depth += 1;
    if (source[i] === '}') {
      depth -= 1;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  const arrow = source.slice(source.indexOf('(', start), end);
  // eslint-disable-next-line no-eval
  return (0, eval)(`(${arrow})`);
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

// Deliberately no assertion: most story files predate this rule, so asserting
// would fail the suite for untouched legacy files. console.warn surfaces the
// backlog to whoever next touches one of them.
it('reports the components that have no guideline yet', () => {
  const missing = filesUnder(storiesDir, '.stories.tsx').filter(
    (file) => !documented.has(file),
  );
  if (missing.length === 0) return;

  console.warn(
    [
      `${missing.length} components have no guideline:`,
      ...missing.map((file) => `  ${path.relative(storiesDir, file)}`),
    ].join('\n'),
  );
});
