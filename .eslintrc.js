module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    globals: {
        'cy': true
    },
    rules: {
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        'object-curly-spacing': ['error', 'never'],
        'array-bracket-spacing': ['error', 'never'],
        'react/prop-types': 'off',
        'quotes': [2, 'single', {'avoidEscape': true}],
        'jsx-quotes': [2, 'prefer-double'],
        'semi': [2, 'never'],
        'no-extra-semi': 'error',
        'comma-dangle': ['error', 'never'],
        'prefer-rest-params': 0
    }
}
