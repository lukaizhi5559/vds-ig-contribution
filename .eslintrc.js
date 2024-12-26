
/*!
 * Copyright (C) Verizon. All rights reserved.
 */


/*!
 * Copyright (C) Verizon. All rights reserved.
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['_tpl/*'],
  parserOptions: {
    sourceType: 'module'
  },
  plugins: [
    'notice',
    'tailwindcss'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    es6: true
  },
  rules: {
    'notice/notice': ['error', {
      misMatch: "Copyright [(]C[)] Verizon. All rights reserved.",
      template: `
/*!
 * Copyright (C) Verizon. All rights reserved.
 */
`
    }]
  }
};
