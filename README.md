# Deepmost 的小角落

一个使用 React、TypeScript 和 Vite 构建的个人博客。这里主要记录 AI 应用与 Agent 架构、后端工程与实习项目复盘，也整理 FDE、产品思维、读书播客和生活观察。

## 功能

- Markdown 文章在构建时自动读取，无需后端服务
- 支持文章列表、全文搜索、标签筛选和时间归档
- 自动生成文章摘要、阅读时长与标签统计
- 支持亮色 / 暗色主题和响应式布局
- 内置 Ragent 架构文档、CodeTop Top 200 和实习工作总结等独立专题页
- 通过 GitHub Actions 自动构建并部署到 GitHub Pages

## 技术栈

- React 18 + TypeScript
- Vite 6
- React Router
- Tailwind CSS
- Framer Motion
- Markdown-It、Highlight.js、Mermaid

## 本地开发

需要 Node.js 18 或更高版本，推荐使用 Node.js 22。

```bash
npm install
npm run dev
```

Vite 默认会在 `http://localhost:5173` 启动开发服务器。

生产构建：

```bash
npm run build
npm run preview
```

构建产物位于 `dist/`。`npm run build` 还会依次更新实习工作总结页面、处理独立专题页的静态脚本，并清理 Ragent 文档中的开发期内容。

## 添加文章

在 `src/content/posts/` 下新建 Markdown 文件，并添加以下 frontmatter：

```markdown
---
title: 文章标题
date: 2026-08-14 12:00:00
tags:
  - AI
  - 项目复盘
---

正文内容
```

文件名会成为文章路由中的 slug；文章日期用于排序，标签用于筛选和统计。开发服务器和生产构建都会自动载入新文章。

## 项目结构

```text
src/
├── components/        # 导航、首页区块、页脚等通用组件
├── content/
│   ├── posts/         # Markdown 博客文章
│   └── reports/       # 独立报告的源文件
├── lib/               # Markdown 渲染与文本工具
└── pages/             # 首页、文章、归档、标签和关于页
public/                # 图片及独立专题页静态资源
scripts/               # 构建前的内容生成与静态资源处理脚本
```

## 部署

推送到 `react-site` 分支后，[GitHub Actions](.github/workflows/deploy.yml) 会执行 `npm ci` 和 `npm run build`，再将 `dist/` 发布到 GitHub Pages。项目按账户级站点配置，静态资源和前端路由都从域名根路径 `/` 提供。
