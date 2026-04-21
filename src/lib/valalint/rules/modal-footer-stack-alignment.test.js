import { RuleTester } from 'eslint';
import rule from './modal-footer-stack-alignment.mjs';
import * as tsParser from '@typescript-eslint/parser';

const tester = new RuleTester({
    parser: tsParser,
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
    },
});

const ERROR = '<Stack> inside a Modal footer must have justifyContent="flex-end".';

tester.run('modal-footer-stack-alignment', rule, {
    valid: [
        // Stack with justifyContent="flex-end" in Modal footer
        {
            code: '<Modal footer={<Stack justifyContent="flex-end"><Button>Cancel</Button></Stack>}>Content</Modal>',
        },
        // justifyContent as expression container
        {
            code: '<Modal footer={<Stack justifyContent={"flex-end"}><Button>Cancel</Button></Stack>}>Content</Modal>',
        },
        // Stack outside Modal footer — not checked
        {
            code: '<Stack><Button>Cancel</Button></Stack>',
        },
        // Stack inside Modal children (not footer) — not checked
        {
            code: '<Modal footer={null}><Stack><Button>Cancel</Button></Stack></Modal>',
        },
        // Stack nested inside Box which is inside footer — also checked, but here it has flex-end
        {
            code: '<Modal footer={<Box><Stack justifyContent="flex-end"><Button>Ok</Button></Stack></Box>}>Content</Modal>',
        },
    ],

    invalid: [
        {
            // No justifyContent at all
            code: '<Modal footer={<Stack><Button>Cancel</Button></Stack>}>Content</Modal>',
            errors: [{ message: ERROR }],
        },
        {
            // Wrong justifyContent value
            code: '<Modal footer={<Stack justifyContent="flex-start"><Button>Cancel</Button></Stack>}>Content</Modal>',
            errors: [{ message: ERROR }],
        },
        {
            // Stack nested in Box in footer — still flagged
            code: '<Modal footer={<Box><Stack><Button>Cancel</Button></Stack></Box>}>Content</Modal>',
            errors: [{ message: ERROR }],
        },
        {
            // Real-world pattern with multiple buttons
            code: `
<Modal
  title="Confirm"
  isOpen={open}
  footer={
    <Stack gap="r8">
      <Button label="Cancel" />
      <Button label="Confirm" />
    </Stack>
  }
>
  Are you sure?
</Modal>`,
            errors: [{ message: ERROR }],
        },
    ],
});

describe('modal-footer-stack-alignment', () => {
    it('passes all RuleTester cases', () => {
        expect(true).toBe(true);
    });
});
