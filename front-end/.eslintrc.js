module.exports = {
  extends: ["react-app", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error"
  },
  plugins: ["prettier"],
  settings: {
    react: {
      version: "detect"
    }
  }
};
