module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react-native/all",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-native", "@typescript-eslint"],
  rules: {
    // https://github.com/Intellicode/eslint-plugin-react-native/issues/298
    "react-native/sort-styles": 0,
    "react-native/no-color-literals": 0,
    "@typescript-eslint/no-empty-function": 0,
    "react-native/no-inline-styles": 0,
  },
};
