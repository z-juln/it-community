module.exports = {
  extends: [
    // require.resolve("@umijs/fabric/dist/eslint"),
    // "react-app"
  ],

  // in antd-design-pro
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },

  rules: {
    "@typescript-eslint/no-shadow": 0,
  },
};
