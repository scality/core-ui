import { RuleTester } from 'eslint';
import rule from './modal-title-string.mjs';
import * as tsParser from '@typescript-eslint/parser';

const tester = new RuleTester({
    parser: tsParser,
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
    },
});

const ERROR =
    '<Modal> title should be a plain string for correct screen reader behaviour (aria-labelledby). Use a string literal, template literal, or a string variable instead of JSX.';

tester.run('modal-title-string', rule, {
    valid: [
        // String literal
        { code: '<Modal title="Confirm deletion" footer={null}>Content</Modal>' },
        // String in expression container
        { code: '<Modal title={"Confirm deletion"} footer={null}>Content</Modal>' },
        // Template literal
        { code: '<Modal title={`Delete ${name}?`} footer={null}>Content</Modal>' },
        // Variable reference — can't know the type statically, trust the consumer
        { code: '<Modal title={myTitle} footer={null}>Content</Modal>' },
        // Call expression — likely returns a string (e.g. intl.formatMessage)
        { code: '<Modal title={intl.formatMessage({id: "confirm"})} footer={null}>Content</Modal>' },
        { code: '<Modal title={getTitle()} footer={null}>Content</Modal>' },
        // Non-Modal elements are not checked
        { code: '<Dialog title={<span>Hello</span>}>Content</Dialog>' },
    ],

    invalid: [
        {
            // JSX element
            code: '<Modal title={<span>Hello</span>} footer={null}>Content</Modal>',
            errors: [{ message: ERROR }],
        },
        {
            // JSX element with components
            code: '<Modal title={<Stack><Icon /><Text>Title</Text></Stack>} footer={null}>Content</Modal>',
            errors: [{ message: ERROR }],
        },
        {
            // Object expression (e.g. accidental object literal)
            code: '<Modal title={{key: "value"}} footer={null}>Content</Modal>',
            errors: [{ message: ERROR }],
        },
    ],
});

describe('modal-title-string', () => {
    it('passes all RuleTester cases', () => {
        expect(true).toBe(true);
    });
});
