module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  extends: ["airbnb", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: "module"
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": [
      "error",
      { args: "after-used", argsIgnorePattern: "^_" }
    ],
    "array-callback-return": "off"
  }
};
