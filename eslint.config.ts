import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JS 推荐
  js.configs.recommended,

  // TS 推荐（注意：typescript-eslint 的 flat configs 通常是数组/多段配置）
  ...tseslint.configs.recommended,

  // Vue essential（也是数组/多段配置时用展开更稳）
  ...pluginVue.configs["flat/essential"],

  // 全局语言环境
  {
    languageOptions: {
      globals: globals.browser,
    },
  },

  // 让 <script lang="ts"> 用 TS parser
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
  },

  // 放最后：覆盖 Vue 规则
  {
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
]);