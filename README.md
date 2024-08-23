## 项目名称
limu-ele-pro

## 项目介绍

页面模板，看着哪个像就复制哪个(配合vscode 插件 搜 limu-paste)

## 技术栈

| 技术栈       | 描述                                   | 官网                                 |
| ------------ | -------------------------------------- | ------------------------------------ |
| Vue3         | 渐进式 JavaScript 框架                 | https://v3.cn.vuejs.org/             |
| TypeScript   | JavaScript 的一个超集                  | https://www.tslang.cn/               |
| Vite2        | 前端开发与构建工具                     | https://cn.vitejs.dev/               |
| Element Plus | 基于 Vue 3，面向设计师和开发者的组件库 | https://element-plus.gitee.io/zh-CN/ |
| Pinia        | 新一代状态管理工具                     | https://pinia.vuejs.org/             |
| Vue Router   | Vue.js 的官方路由                      | https://router.vuejs.org/zh/         |

## 项目预览


## 项目地址


## 启动部署

### 环境准备

- 安装 Node

  版本：v14 或 v16

- 开发工具

  推荐 VSCode

- 必装插件

  VSCode 插件市场搜索并安装 Volar, 且一定要禁用 Vetur，不然代码会出现组件使用了但编译器还报组件未使用的警告信息，另外尤大也在 Vue3 生态话题说过 Volar 将会替代 Vetur 作为 Vue 的官方插件。

### 项目启动


1. npm install
2. npm run dev
3. 浏览器访问 http://localhost:9527

如果因为网络问题导致 npm install 安装依赖很慢可更换为淘宝镜像源

```bash
# 设置镜像源地址为淘宝
npm config set registry https://registry.npm.taobao.org
# 确认更换是否成功
npm config get registry
# 继续安装
npm install
```
