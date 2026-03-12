import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      eslintConfigPrettier, // Desactiva reglas de ESLint que chocan con Prettier
    ],
    plugins: {
      prettier,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      'react/react-in-jsx-scope': 'off', // React 17+ no requiere importar React en JSX
      'react/prop-types': 'off', // Usamos TypeScript o JSDoc si es necesario, pero no prop-types estricto
      'prettier/prettier': 'error', // Aplica reglas de Prettier como errores de ESLint
      'no-console': 'warn', // Advierte sobre console.log en producción
      'prefer-const': 'error', // Obliga a usar const si la variable no se reasigna
    },
  },
]);
