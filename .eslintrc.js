/* eslint-disable max-len */
/**
 * npx eslint --init // 自动生成配置文件并安装下面四个依赖
 *
 * npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue -D // 手动创建文件
 *
 * eslint
 * @typescript-eslint/parser // ESLint 默认使用的是 Espree 进行语法解析，所以无法对部分 typescript 语法进行解析，需要替换掉默认的解析器
 * @typescript-eslint/eslint-plugin // 作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则
 * eslint-plugin-vue // 让 eslint 识别 vue 文件
 *
 * 配置文件优先级：
 * .eslintrc.js > .eslintrc.yaml > .eslintrc.yml > .eslintrc.json > .eslintrc > package.json。
 */

module.exports = {
  root: true, // 停止向上查找父级目录中的配置文件
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser', // 指定要使用的解析器
  // 给解析器传入一些其他的配置参数
  parserOptions: {
    ecmaVersion: 'latest', // 支持的es版本
    parser: '@typescript-eslint/parser',
    sourceType: 'module' // 模块类型，默认为script，我们设置为module
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'], // eslint-plugin- 可以省略
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off', // 关闭空方法检查
    '@typescript-eslint/no-explicit-any': 'off', // 关闭any类型的警告
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    'no-unused-vars': ['warn'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'vue/no-unused-vars': ['warn'],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'max-len': ['error', { code: 100 }],
    'linebreak-style': ['warn', 'unix']
  }
};
