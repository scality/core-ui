import tsParser from '@typescript-eslint/parser';
import technicalSentenceCase from './rules/technical-sentence-case.js';
import noRawNumberInJsx from './rules/no-raw-number-in-jsx.js';

const rules = {
    'technical-sentence-case': technicalSentenceCase,
    'no-raw-number-in-jsx': noRawNumberInJsx,
};

/** Default rule severity for the recommended config. */
const recommendedRules = {
    'valalint/technical-sentence-case': 'warn',
    'valalint/no-raw-number-in-jsx': 'warn',
};

const plugin = {
    meta: {
        name: 'valalint',
        version: '1.0.0',
    },

    rules,
    configs: {
        /** Legacy eslintrc-style recommended config. */
        recommended: {
            plugins: ['valalint'],
            rules: recommendedRules,
        },
    },
};

plugin.configs['flat/recommended'] = {
    plugins: { valalint: plugin },
    rules: recommendedRules,
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
            project: true,
        },
    },
};

export default plugin;
