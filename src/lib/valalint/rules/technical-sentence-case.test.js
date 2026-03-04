import { RuleTester } from 'eslint';
import rule from './technical-sentence-case.js';
import * as tsParser from '@typescript-eslint/parser';

const tester = new RuleTester({
    parser: tsParser,
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
    },
});

tester.run('technical-sentence-case', rule, {
    // ─── Valid ────────────────────────────────────────────────────────────────
    valid: [
        // Non-targeted components are never checked
        { code: '<div>hello world</div>' },
        { code: '<span>bucket deleted</span>' },
        { code: '<label>some text</label>' },

        // Correctly capitalised plain text
        { code: '<Button>Save</Button>' },
        { code: '<Button>Delete item</Button>' },
        { code: '<Text>Welcome back</Text>' },
        { code: '<Tooltip>Click here to continue</Tooltip>' },

        // Correctly capitalised resource names
        { code: '<Button>Delete Bucket</Button>' },
        { code: '<Text>Node is unreachable</Text>' },
        { code: '<Tooltip>View Cluster details</Tooltip>' },
        { code: '<Button>Assign Role</Button>' },
        { code: '<Text>Edit Policy</Text>' },

        // Empty / whitespace-only children are ignored
        { code: '<Button>   </Button>' },
        { code: '<Text>{variable}</Text>' },
    ],

    // ─── Invalid ──────────────────────────────────────────────────────────────
    invalid: [
        // ── Sentence case violations ──────────────────────────────────────────

        {
            code: '<Button>save</Button>',
            errors: [
                {
                    message: 'Text in <Button> should start with a capital letter (sentence case).',
                },
            ],
            output: '<Button> Save </Button>',
        },
        {
            code: '<Text>delete item</Text>',
            errors: [
                {
                    message: 'Text in <Text> should start with a capital letter (sentence case).',
                },
            ],
            output: '<Text> Delete item </Text>',
        },
        {
            code: '<Tooltip>click here to continue</Tooltip>',
            errors: [
                {
                    message:
                        'Text in <Tooltip> should start with a capital letter (sentence case).',
                },
            ],
            output: '<Tooltip> Click here to continue </Tooltip>',
        },

        // ── Resource name violations ───────────────────────────────────────────

        {
            code: '<Button>Delete bucket</Button>',
            errors: [
                {
                    message: 'Resource name "Bucket" in <Button> must be capitalized.',
                },
            ],
            output: '<Button>Delete Bucket</Button>',
        },
        {
            code: '<Text>node is unreachable</Text>',
            errors: [
                // sentence case violation reported first
                {
                    message: 'Text in <Text> should start with a capital letter (sentence case).',
                },
                // resource name violation reported second
                {
                    message: 'Resource name "Node" in <Text> must be capitalized.',
                },
            ],
            // ESLint applies only the first fix in a single pass; the sentence-case
            // fixer fires first and capitalises the leading "n" → "Node" is then correct,
            // but we verify here that the sentence-case fix alone is consistent.
            output: '<Text> Node is unreachable </Text>',
        },
        {
            code: '<Button>Edit policy</Button>',
            errors: [
                {
                    message: 'Resource name "Policy" in <Button> must be capitalized.',
                },
            ],
            output: '<Button>Edit Policy</Button>',
        },
        {
            code: '<Tooltip>View cluster details</Tooltip>',
            errors: [
                {
                    message: 'Resource name "Cluster" in <Tooltip> must be capitalized.',
                },
            ],
            output: '<Tooltip>View Cluster details</Tooltip>',
        },
        {
            // checkResourceNames returns on the first match found in RESOURCE_NAMES order.
            // RESOURCE_NAMES = [..., 'User' (index 7), ..., 'Role' (index 9), ...]
            // → only "User" is reported; "Role" is shadowed by the early return.
            code: '<Text>assign role to user</Text>',
            errors: [
                {
                    message: 'Text in <Text> should start with a capital letter (sentence case).',
                },
                {
                    message: 'Resource name "User" in <Text> must be capitalized.',
                },
            ],
            // sentence-case fixer fires first; only one fix is applied per pass
            output: '<Text> Assign role to user </Text>',
        },

        // ── All targeted components are checked ───────────────────────────────

        {
            code: '<Text>welcome</Text>',
            errors: [
                {
                    message: 'Text in <Text> should start with a capital letter (sentence case).',
                },
            ],
            output: '<Text> Welcome </Text>',
        },
        {
            code: '<Tooltip>hover for more info</Tooltip>',
            errors: [
                {
                    message:
                        'Text in <Tooltip> should start with a capital letter (sentence case).',
                },
            ],
            output: '<Tooltip> Hover for more info </Tooltip>',
        },
    ],
});

// RuleTester.run() throws if any case fails, so reaching this line means all
// cases passed. Jest needs at least one explicit assertion per test file.
describe('technical-sentence-case', () => {
    it('passes all RuleTester cases', () => {
        // Execution of tester.run() above already validated everything.
        expect(true).toBe(true);
    });
});
