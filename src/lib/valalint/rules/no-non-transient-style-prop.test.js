import { RuleTester } from 'eslint';
import rule from './no-non-transient-style-prop.mjs';
import * as tsParser from '@typescript-eslint/parser';

const tester = new RuleTester({
    parser: tsParser,
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
});

tester.run('no-non-transient-style-prop', rule, {
    valid: [
        // Transient prop — correct v6 convention
        { code: 'styled.div`color:${p=>p.$isOpen?"a":"b"}`' },
        { code: 'styled.div`x:${({ $isOpen }) => $isOpen}`' },
        // Genuine HTML/React attributes must reach the DOM (Tier 3)
        { code: 'styled.button`opacity:${p=>p.disabled?0.5:1}`' },
        { code: 'styled.a`color:${p=>p.href?"a":"b"}`' },
        { code: 'styled.input`x:${p=>p.type}`' },
        { code: 'styled.div`x:${p=>p.role}`' },
        // Framework props
        { code: 'styled.div`color:${p=>p.theme.textPrimary}`' },
        { code: 'styled.div`color:${({ theme }) => theme.textPrimary}`' },
        // styled(Component) is not a host element — not this rule's concern
        { code: 'styled(Foo)`color:${p=>p.isOpen?"a":"b"}`' },
        { code: "styled(Foo).attrs({ as: 'a' })`x:${p=>p.isOpen}`" },
        // Explicit shouldForwardProp: author controls forwarding (Box/Text pattern)
        {
            code: 'styled.span.withConfig({ shouldForwardProp: (p) => p !== "variant" })`x:${p=>p.variant}`',
        },
        // Non-prop member access should not be flagged
        { code: 'styled.div`margin:${spacing.r16}`' },
        { code: 'styled.div`x:${p=>Math.max(p.$a, 1)}`' },
    ],

    invalid: [
        // Tier-1 custom prop read via props.<name>
        {
            code: 'styled.div`color:${p=>p.isOpen?"a":"b"}`',
            errors: [{ messageId: 'useTransient' }],
        },
        // Tier-1 custom prop via destructuring
        {
            code: 'styled.div`x:${({ isSelected }) => isSelected}`',
            errors: [{ messageId: 'useTransient' }],
        },
        // Not a valid HTML attribute, on a host element
        {
            code: 'styled.button`x:${p=>p.variant}`',
            errors: [{ messageId: 'useTransient' }],
        },
        // Host element reached through .attrs()/.withConfig() chains still flagged
        {
            code: "styled.div.attrs({ as: 'a' })`x:${p=>p.isOpen}`",
            errors: [{ messageId: 'useTransient' }],
        },
        {
            code: 'styled.div.withConfig({ displayName: "X" })`x:${p=>p.isOpen}`',
            errors: [{ messageId: 'useTransient' }],
        },
    ],
});

describe('no-non-transient-style-prop', () => {
    it('passes all RuleTester cases', () => {
        expect(true).toBe(true);
    });
});
