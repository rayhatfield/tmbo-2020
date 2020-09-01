const path = require('path');

module.exports = {
  extends: ['react-app', 'plugin:import/errors'],
  // settings: {
  //   'import/resolver': {
  //     webpack: {
  //       config: path.join(__dirname, 'node_modules/react-scripts/config/webpack.config.js')
  //     }
  //   },
  // },
  rules: {
    'arrow-spacing': 1,
    'brace-style': ['error', 'stroustrup'],
    'comma-spacing': 1,
    curly: ['error', 'multi-line'],
    'import/no-unresolved': 'error',
    'import/order': ['error', {
      groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
      'newlines-between': 'always'
    }],
    indent: ['error', 4],
    'key-spacing': 1,
    'keyword-spacing': 1,
    'no-console': ["error", { allow: ["warn", "error", "group", "groupCollapsed", "groupEnd"] }],
    'no-trailing-spaces': 1,
    'no-var': 'error',
    "object-curly-spacing": ["warn", "always"],
    'prefer-object-spread': 1,
    'space-before-blocks': 1,
    'space-before-function-paren': 1,
    'space-infix-ops': 1,
    'spaced-comment': 1,
    'react/jsx-key': 'error'
  }
};
