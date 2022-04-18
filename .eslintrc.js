module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': 0,
    curly: ['warn', 'multi'],
    // quotes: ["warn", ["double", "single"]],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react-native/no-inline-styles': 'none',
  },
};
