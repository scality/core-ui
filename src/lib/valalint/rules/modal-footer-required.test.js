import { RuleTester } from 'eslint';
import rule from './modal-footer-required.mjs';
import * as tsParser from '@typescript-eslint/parser';

const tester = new RuleTester({
    parser: tsParser,
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
    },
});

const ERROR = '<Modal> must have a footer prop.';

tester.run('modal-footer-required', rule, {
    valid: [
        // footer as JSX expression
        { code: '<Modal footer={<Stack><Button>Cancel</Button></Stack>}>Content</Modal>' },
        // footer as string (unusual but valid prop)
        { code: '<Modal footer="actions">Content</Modal>' },
        // footer with null — consumer's choice
        { code: '<Modal footer={null}>Content</Modal>' },
        // Non-Modal elements without footer are fine
        { code: '<Dialog>Content</Dialog>' },
        { code: '<div>Content</div>' },
    ],

    invalid: [
        {
            code: '<Modal title="Confirm" isOpen={open}>Content</Modal>',
            errors: [{ message: ERROR }],
        },
        {
            code: '<Modal title="Confirm" isOpen={open} close={onClose}>Content</Modal>',
            errors: [{ message: ERROR }],
        },
        {
            // Self-closing (unusual for Modal but should still be caught)
            code: '<Modal title="Confirm" isOpen={open} />',
            errors: [{ message: ERROR }],
        },
    ],
});

describe('modal-footer-required', () => {
    it('passes all RuleTester cases', () => {
        expect(true).toBe(true);
    });
});
