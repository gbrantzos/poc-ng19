// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'poc',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'poc',
          style: 'kebab-case'
        }
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../'],
              message: 'Relative imports are not allowed.'
            }
          ]
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@angular-eslint/sort-lifecycle-methods': ['error'],
      '@angular-eslint/no-lifecycle-call': ['error'],
      'no-console': [
        'error',
        {
          allow: ['debug', 'warn', 'error']
        }
      ],
      'no-else-return': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@angular-eslint/prefer-on-push-component-change-detection': ['warn'],
      'no-magic-numbers': ['warn', { ignore: [0, 1], ignoreArrayIndexes: true, ignoreClassFieldInitialValues: true }]
    }
  },
  {
    files: ['**/*spec.ts'],
    rules: {
      'no-magic-numbers': 'off'
    }
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {}
  }
);
