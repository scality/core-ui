import { RuleTester } from 'eslint';
import rule from './modal-button-forbidden-label.js';
import * as tsParser from '@typescript-eslint/parser';

const tester = new RuleTester({
    parser: tsParser,
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
    },
});

const ERROR = 'Button inside Modal should not use "Yes", "No", or "Ok" as a label.';

tester.run('modal-button-forbidden-label', rule, {
    // ─── Valid ────────────────────────────────────────────────────────────────
    valid: [
        // Buttons outside a Modal are never checked, even if the label is forbidden
        { code: '<Button>Yes</Button>' },
        { code: '<Button>No</Button>' },
        { code: '<Button>Ok</Button>' },
        { code: '<Button label="Ok" />' },

        // Non-Modal wrappers do not trigger the rule
        { code: '<Dialog><Button>Yes</Button></Dialog>' },

        // Buttons inside Modal with acceptable labels
        { code: '<Modal><Button>Cancel</Button></Modal>' },
        { code: '<Modal><Button>Confirm</Button></Modal>' },
        { code: '<Modal><Button>Delete item</Button></Modal>' },
        { code: '<Modal><Button label="Cancel" /></Modal>' },
        { code: '<Modal><Button label="Delete item" /></Modal>' },
        { code: '<Modal footer={<Button label="Cancel" />}>Content</Modal>' },

        // Non-Button elements inside Modal are not checked
        { code: '<Modal><Text>Yes</Text></Modal>' },
        { code: '<Modal><span>No</span></Modal>' },

        // Words that merely contain the forbidden substring are NOT matched
        // ("Okay" → "ok" is not a whole word because "a" follows it)
        { code: '<Modal><Button>Okay</Button></Modal>' },
        { code: '<Modal><Button label="Rebook" /></Modal>' },
        { code: '<Modal><Button label="Nobody" /></Modal>' },

        // Empty / whitespace-only children are ignored
        { code: '<Modal><Button>   </Button></Modal>' },
        { code: '<Modal><Button>{variable}</Button></Modal>' },
    ],

    // ─── Invalid ──────────────────────────────────────────────────────────────
    invalid: [
        // ── JSX text children ─────────────────────────────────────────────────

        {
            code: '<Modal><Button>Yes</Button></Modal>',
            errors: [{ message: ERROR }],
        },
        {
            code: '<Modal><Button>No</Button></Modal>',
            errors: [{ message: ERROR }],
        },
        {
            code: '<Modal><Button>Ok</Button></Modal>',
            errors: [{ message: ERROR }],
        },
        {
            // case-insensitive matching
            code: '<Modal><Button>yes</Button></Modal>',
            errors: [{ message: ERROR }],
        },
        {
            code: '<Modal><Button>no</Button></Modal>',
            errors: [{ message: ERROR }],
        },
        {
            code: '<Modal><Button>ok</Button></Modal>',
            errors: [{ message: ERROR }],
        },
        {
            // forbidden word embedded in a longer label
            code: '<Modal><Button>Ok, got it</Button></Modal>',
            errors: [{ message: ERROR }],
        },

        // ── label prop — string literal ────────────────────────────────────────

        {
            code: '<Modal><Button label="Yes" /></Modal>',
            errors: [{ message: ERROR }],
        },
        {
            code: '<Modal><Button label="No" /></Modal>',
            errors: [{ message: ERROR }],
        },
        {
            code: '<Modal><Button label="Ok" /></Modal>',
            errors: [{ message: ERROR }],
        },
        {
            // real-world example from the rule description
            code: '<Modal><Button label="Ok, delete" /></Modal>',
            errors: [{ message: ERROR }],
        },

        // ── label prop — JSX expression container ─────────────────────────────

        {
            code: '<Modal><Button label={"Yes"} /></Modal>',
            errors: [{ message: ERROR }],
        },

        // ── Button nested inside a JSX attribute expression (e.g. footer) ─────

        {
            code: '<Modal footer={<Button label="Ok, delete" />}>Content</Modal>',
            errors: [{ message: ERROR }],
        },
        {
            code: '<Modal footer={<Button label="No" />}>Content</Modal>',
            errors: [{ message: ERROR }],
        },
        {
            // Button nested deeper inside the footer expression
            code: '<Modal footer={<Box><Button label="Yes" /></Box>}>Content</Modal>',
            errors: [{ message: ERROR }],
        },

        // ── All three targeted components (Button) are covered ────────────────

        {
            // Mirrors the example from the rule description
            code: `
<Modal
  isOpen={isModalOpen}
  title="Remove deployment"
  footer={
    <Box>
      <Button variant="secondary" label="Cancel" />
      <Button variant="danger" label="Ok, delete" />
    </Box>
  }
>
  Are you sure?
</Modal>`,
            errors: [{ message: ERROR }],
        },
    ],
});

// RuleTester.run() throws if any case fails, so reaching this line means all
// cases passed. Jest needs at least one explicit assertion per test file.
describe('modal-button-forbidden-label', () => {
    it('passes all RuleTester cases', () => {
        // Execution of tester.run() above already validated everything.
        expect(true).toBe(true);
    });
});
