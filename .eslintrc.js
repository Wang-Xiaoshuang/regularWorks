module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
  rules: {
    'no-console': 'off',
    'react/self-closing-comp': 0,
    'arrow-body-style': 'off',
    'import/no-extraneous-dependencies': 'off',
    // 'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': 'off', // 存在函数互相调用的情况
    '@typescript-eslint/no-use-before-define': 'off',
  },
};
