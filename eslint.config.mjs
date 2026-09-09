import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";

import quality from "./eslint-rules/index.cjs";

export default defineConfig([
  globalIgnores([
    "node_modules/**",
    "package-lock.json",
  ]),
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        document: "readonly",
        Image: "readonly",
        IntersectionObserver: "readonly",
        requestAnimationFrame: "readonly",
      },
    },
    plugins: { quality },
    rules: {
      ...js.configs.recommended.rules,
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-var": "error",
      "prefer-const": "error",
      "quality/max-lines": ["error", { max: 350 }],
      "quality/no-direct-console": [
        "error",
        { logger: "the project logging helper" },
      ],
    },
  },
  {
    files: ["eslint-rules/**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        module: "readonly",
        require: "readonly",
      },
    },
    plugins: { quality },
    rules: {
      "quality/max-lines": ["error", { max: 350 }],
    },
  },
]);