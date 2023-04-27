module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  rules: {
    "no-console": "error",
    // semi: ["error", "never"],
    // "no-unused-vars": "error",
    "no-debugger": "error",
    "@next/next/no-title-in-document-head": "off",
    "array-callback-return": "off",
    "react-hooks/exhaustive-deps": "off",
    "prefer-const": "error",
    "no-self-assign": "error",
  },
};
