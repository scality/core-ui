import { RuleTester } from 'eslint';
import rule from './modal-alertdialog-no-close.mjs';
import * as tsParser from '@typescript-eslint/parser';

const tester = new RuleTester({
    parser: tsParser,
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
    },
});

const ERROR =
    '<Modal role="alertdialog"> must not have a close prop. Alert dialogs require an explicit user action via footer buttons.';

tester.run('modal-alertdialog-no-close', rule, {
    valid: [
        // Standard dialog with close — fine
        { code: '<Modal close={onClose} footer={null}>Content</Modal>' },
        // alertdialog without close — correct
        { code: '<Modal role="alertdialog" footer={null}>Content</Modal>' },
        // dialog role explicitly set with close — fine
        { code: '<Modal role="dialog" close={onClose} footer={null}>Content</Modal>' },
        // Non-Modal elements are not checked
        { code: '<Dialog role="alertdialog" close={onClose}>Content</Dialog>' },
    ],

    invalid: [
        {
            code: '<Modal role="alertdialog" close={onClose} footer={null}>Content</Modal>',
            errors: [{ message: ERROR }],
        },
        {
            code: '<Modal role="alertdialog" close={() => setOpen(false)} footer={null}>Content</Modal>',
            errors: [{ message: ERROR }],
        },
        {
            // role as JSX expression container
            code: '<Modal role={"alertdialog"} close={onClose} footer={null}>Content</Modal>',
            errors: [{ message: ERROR }],
        },
    ],
});

describe('modal-alertdialog-no-close', () => {
    it('passes all RuleTester cases', () => {
        expect(true).toBe(true);
    });
});
