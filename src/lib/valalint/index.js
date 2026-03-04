import tsParser from '@typescript-eslint/parser';
import technicalSentenceCase from './rules/technical-sentence-case.js';

const rules = {
    'technical-sentence-case': technicalSentenceCase,
};

/** Default rule severity for the recommended config. */
const recommendedRules = {
    'valalint/technical-sentence-case': 'warn',
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
        },
    },
};

export default plugin;
