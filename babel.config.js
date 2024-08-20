module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-syntax-import-attributes', {deprecatedAssertSyntax: true}],
    '@babel/plugin-transform-export-namespace-from',
    'react-native-reanimated/plugin'
  ],
};
