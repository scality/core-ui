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

  it('orders the sections and the component categories', () => {
    const sorted = sidebar([
      entry('Components/Styling/Box', 'Stories'),
      entry('Introduction', 'Introduction'),
      entry('Components/Feedback/Banner', 'Stories'),
      entry('Templates/Form', 'Stories'),
      entry('Components/Navigation/Tabs', 'Stories'),
    ]);

    expect(sorted).toEqual([
      'Introduction :: Introduction',
      'Templates/Form :: Stories',
      'Components/Navigation/Tabs :: Stories',
      'Components/Feedback/Banner :: Stories',
      'Components/Styling/Box :: Stories',
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

const mdxFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((item) => {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) return mdxFiles(full);
    return item.name.endsWith('.mdx') ? [full] : [];
  });

const attachedPages = mdxFiles(storiesDir).filter((file) =>
  /<Meta\s+of=\{/.test(fs.readFileSync(file, 'utf8')),
);

// A page attached with `of={...}` and no name is named after `docs.defaultName`
// and takes the generated props table's place, so the component silently loses a
// page instead of gaining one. The name is also what `storySort` ranks it by.
it.each(attachedPages.map((file) => path.relative(storiesDir, file)))(
  'stories/%s declares name="Guideline"',
  (file) => {
    const source = fs.readFileSync(path.join(storiesDir, file), 'utf8');
    expect(source).toMatch(/<Meta\s+of=\{[^}]+\}\s+name="Guideline"/);
  },
);
