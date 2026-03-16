/**
 * @jest-environment node
 */
import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from './no-raw-number-in-jsx.js';
import path from 'path';

// Jest runs from the project root, so process.cwd() is the workspace root
// where tsconfig.json lives.
const tsconfigRootDir = process.cwd();

// Virtual filename placed at the workspace root so it is matched by the
// allowDefaultProject glob ('*.tsx') and uses the workspace tsconfig.
const filename = path.join(tsconfigRootDir, 'test.tsx');

const tester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaFeatures: { jsx: true },
            ecmaVersion: 2020,
            projectService: {
                allowDefaultProject: ['*.tsx'],
                defaultProject: 'tsconfig.json',
            },
            tsconfigRootDir,
        },
    },
});

const ERROR =
    'Avoid rendering raw numbers in JSX text. Use formatISONumber(value) to apply proper ISO formatting (space as thousands separator, leading zero before decimal point).';

tester.run('no-raw-number-in-jsx', rule, {
    // ─── Valid ────────────────────────────────────────────────────────────────
    valid: [
        // ── Numbers in JSX attribute values — never flagged ───────────────────
        {
            // Numeric literal in an attribute
            code: 'const el = <input value={42} />;',
            filename,
        },
        {
            // Typed number variable in an attribute
            code: 'declare const max: number; const el = <Chart max={max} />;',
            filename,
        },
        {
            // Multiple numeric attributes
            code: 'declare const n: number; const el = <Slider step={0.5} min={0} max={n} />;',
            filename,
        },

        // ── String types in JSX children — not flagged ────────────────────────
        {
            code: 'declare const name: string; const el = <Text>{name}</Text>;',
            filename,
        },
        {
            code: 'const el = <Text>{"hello"}</Text>;',
            filename,
        },
        {
            code: 'const el = <Text>{`template`}</Text>;',
            filename,
        },
        {
            // Template literal containing a number expression is still a string
            // eslint-disable-next-line no-template-curly-in-string
            code: 'declare const count: number; const el = <Text>{`Total: ${count}`}</Text>;',
            filename,
        },

        // ── formatISONumber returns string — not flagged ───────────────────────
        {
            code: 'declare function formatISONumber(n: number, opts?: object): string; declare const count: number; const el = <Text>{formatISONumber(count)}</Text>;',
            filename,
        },

        // ── Methods that return strings — not flagged ──────────────────────────
        {
            // Number.prototype.toFixed returns string
            code: 'declare const value: number; const el = <Text>{value.toFixed(2)}</Text>;',
            filename,
        },
        {
            // Number.prototype.toPrecision returns string
            code: 'declare const value: number; const el = <Text>{value.toPrecision(4)}</Text>;',
            filename,
        },
        {
            // String.prototype.toUpperCase returns string
            code: 'declare const label: string; const el = <Text>{label.toUpperCase()}</Text>;',
            filename,
        },

        // ── Other non-numeric types — not flagged ─────────────────────────────
        {
            code: 'const el = <Text>{null}</Text>;',
            filename,
        },
        {
            code: 'declare const flag: boolean; const el = <Text>{flag}</Text>;',
            filename,
        },
        {
            // string + number → string (TS widens to string)
            code: 'declare const count: number; const el = <Text>{count + " items"}</Text>;',
            filename,
        },
        {
            // Conditional producing string
            code: 'declare const flag: boolean; const el = <Text>{flag ? "yes" : "no"}</Text>;',
            filename,
        },

        // ── JSX comment — not flagged ──────────────────────────────────────────
        {
            code: 'const el = <Text>{/* comment */}</Text>;',
            filename,
        },
    ],

    // ─── Invalid ──────────────────────────────────────────────────────────────
    invalid: [
        // ── Numeric literals (TypeFlags.NumberLiteral) ─────────────────────────
        {
            code: 'const el = <Text>{42}</Text>;',
            filename,
            errors: [{ message: ERROR }],
        },
        {
            code: 'const el = <Text>{0}</Text>;',
            filename,
            errors: [{ message: ERROR }],
        },
        {
            code: 'const el = <Text>{3.14}</Text>;',
            filename,
            errors: [{ message: ERROR }],
        },

        // ── Typed number variables (TypeFlags.Number) ─────────────────────────
        {
            code: 'declare const count: number; const el = <Text>{count}</Text>;',
            filename,
            errors: [{ message: ERROR }],
        },
        {
            // Works on any element tag
            code: 'declare const price: number; const el = <Tooltip>{price}</Tooltip>;',
            filename,
            errors: [{ message: ERROR }],
        },

        // ── Arithmetic that produces a number ─────────────────────────────────
        {
            // number + number → number
            code: 'declare const a: number; declare const b: number; const el = <Text>{a + b}</Text>;',
            filename,
            errors: [{ message: ERROR }],
        },
        {
            code: 'declare const total: number; declare const tax: number; const el = <Text>{total - tax}</Text>;',
            filename,
            errors: [{ message: ERROR }],
        },
        {
            code: 'declare const bytes: number; const el = <Text>{bytes / 1024}</Text>;',
            filename,
            errors: [{ message: ERROR }],
        },

        // ── Unary minus on a number ───────────────────────────────────────────
        {
            code: 'declare const n: number; const el = <Text>{-n}</Text>;',
            filename,
            errors: [{ message: ERROR }],
        },

        // ── Properties that return number ─────────────────────────────────────
        {
            // Array.length → number
            code: 'declare const items: string[]; const el = <Text>{items.length}</Text>;',
            filename,
            errors: [{ message: ERROR }],
        },

        // ── Functions that return number ───────────────────────────────────────
        {
            code: 'declare function getCount(): number; const el = <Text>{getCount()}</Text>;',
            filename,
            errors: [{ message: ERROR }],
        },

        // ── Union types that include number ───────────────────────────────────
        {
            // number | undefined — when defined it would render an unformatted number
            code: 'declare const count: number | undefined; const el = <Text>{count}</Text>;',
            filename,
            errors: [{ message: ERROR }],
        },
        {
            // string | number
            code: 'declare const value: string | number; const el = <Text>{value}</Text>;',
            filename,
            errors: [{ message: ERROR }],
        },

        // ── Real-world patterns ────────────────────────────────────────────────
        {
            // Numeric literal mixed with JSX text siblings
            code: 'const el = <Text>Total: {1234567}</Text>;',
            filename,
            errors: [{ message: ERROR }],
        },
        {
            // Multiple violations in the same element
            code: 'declare const a: number; declare const b: number; const el = <Text>{a}{b}</Text>;',
            filename,
            errors: [{ message: ERROR }, { message: ERROR }],
        },
        {
            // Nested expressions
            code: 'declare const a: number; declare const b: number; const el = <Text><span>{a}</span></Text>;',
            filename,
            errors: [{ message: ERROR }],
        },
    ],
});

// RuleTester.run() throws if any case fails, so reaching this line means all
// cases passed. Jest needs at least one explicit assertion per test file.
describe('no-raw-number-in-jsx', () => {
    it('passes all RuleTester cases', () => {
        expect(true).toBe(true);
    });
});
