import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...nextCoreWebVitals,
  {
    rules: {
      'react-hooks/static-components': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/coverage/**',
      '**/build/**',
      'eslint.config.mjs',
    ],
  },
]
