module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'plugins': [
    'react',
    'import',
    'module-resolver',
    '@typescript-eslint',
  ],
  'rules': {
    'max-len': ['error', { 'code': 140 }],
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'object-curly-spacing': ['error', 'always', { arraysInObjects: false }],
    'require-jsdoc': 'off',
    'guard-for-in': 'off',
    'no-invalid-this': 'off',
    'brace-style': 'off',
    'semi': ['error', 'never'],
    'module-resolver/use-alias': 'error',
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2, { 'SwitchCase': 1, 'ignoredNodes': ['JSXAttribute', 'JSXSpreadAttribute']}],
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error'],
    'react/jsx-indent-props': ['error', 'first'],
    'import/no-anonymous-default-export': 'error',
    '@typescript-eslint/strict-boolean-expressions': [0],
    'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
    'padding-line-between-statements': [
      'error',
      {
        'blankLine': 'always',
        'prev': 'multiline-block-like',
        'next': '*',
      },
    ],
  },
}
