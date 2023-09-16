const { ModuleDetectionKind } = require("typescript");

ModuleDetectionKind.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    "vue/require-default-prop": "off",
    "vue/multi-word-component-names": "off",
  },
};
