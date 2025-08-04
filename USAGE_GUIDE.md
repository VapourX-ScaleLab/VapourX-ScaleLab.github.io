# 博客上传功能使用指南

## 🎯 功能概述

我已经成功为你的VapourX网站创建了一个完整的博客上传功能。这个功能允许用户通过网页界面创建新的博客文章，并自动创建GitHub Pull Request。

## 📁 创建的文件

1. **`src/pages/newblog.astro`** - 主上传页面
2. **`src/pages/demo.astro`** - 演示页面
3. **`src/pages/test.astro`** - 功能测试页面
4. **`src/pages/api/create-blog.ts`** - API端点
5. **`BLOG_UPLOAD_SETUP.md`** - 配置说明
6. **`README_BLOG_UPLOAD.md`** - 完整文档
7. **`USAGE_GUIDE.md`** - 本使用指南

## 🚀 如何使用

### 1. 访问功能

- **演示页面**: 访问 `http://localhost:4322/demo` 了解功能
- **测试页面**: 访问 `http://localhost:4322/test` 测试表单功能
- **上传页面**: 访问 `http://localhost:4322/newblog` 创建文章

### 2. 功能特性

✅ **Markdown编辑器**: 支持实时预览，语法高亮
✅ **自动生成frontmatter**: 根据表单内容自动生成文章元数据
✅ **GitHub集成**: 自动创建分支、文件和Pull Request
✅ **响应式设计**: 支持桌面和移动设备
✅ **表单验证**: 实时验证用户输入
✅ **现代化UI**: 美观的用户界面和交互效果

### 3. 使用流程

1. **填写文章信息**:
   - 标题（必填）
   - 文件夹名称（必填，英文）
   - 发布日期（自动填充今天）
   - 标签（用逗号分隔）
   - 描述
   - 作者
   - 语言（中文/英文）

2. **编写文章内容**:
   - 使用Markdown格式
   - 支持实时预览
   - 支持语法高亮

3. **提交文章**:
   - 点击"提交文章"按钮
   - 系统自动创建GitHub Pull Request
   - 显示成功/失败提示

## 🔧 配置说明

### 1. GitHub Token配置

要使用完整的GitHub集成功能，需要配置GitHub Personal Access Token：

1. 访问 [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. 生成新的Personal Access Token
3. 选择权限：`repo`, `workflow`
4. 在项目根目录创建 `.env` 文件：
   ```env
   GITHUB_TOKEN=your_token_here
   ```

### 2. 依赖安装

```bash
npm install marked @octokit/rest
```

## 📝 文章格式

生成的文章将遵循以下格式：

```markdown
---
title: '文章标题'
publishDate: 'January 15, 2025'
updatedDate: 'January 15, 2025'
description: '文章描述'
tags:
  - 标签1
  - 标签2
language: 'Chinese'
author: '作者名'
authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=作者名'
heroImage: { src: './thumbnail.jpg', color: '#9698C1' }
---

# 文章内容

这里是Markdown格式的文章内容...
```

## 🎨 界面特色

- **毛玻璃效果**: 现代化的视觉设计
- **渐变背景**: 动态渐变背景效果
- **响应式布局**: 适配各种屏幕尺寸
- **交互反馈**: 悬停效果和动画
- **错误处理**: 友好的错误提示

## 🔍 测试功能

### 测试页面 (`/test`)
- 简化的表单，不依赖GitHub API
- 可以测试Markdown预览功能
- 显示表单数据，便于调试

### 演示页面 (`/demo`)
- 功能介绍和使用说明
- 链接到各个功能页面

## ⚠️ 注意事项

1. **文件夹名称**: 必须是英文，只能包含字母、数字、连字符和下划线
2. **缩略图**: 需要手动添加到生成的文件夹中
3. **权限**: GitHub Token需要有足够的权限
4. **审核**: Pull Request需要手动审核和合并
5. **内容规范**: 确保文章内容符合社区规范

## 🛠️ 故障排除

### 常见问题

1. **模态框无法关闭**
   - 已修复：点击背景或关闭按钮都可以关闭
   - 支持ESC键关闭（如果浏览器支持）

2. **GitHub Token未配置**
   - 功能仍可正常使用，会显示模拟的PR URL
   - 配置Token后可创建真实的Pull Request

3. **端口问题**
   - 开发服务器运行在端口4322
   - 确保访问正确的端口

### 调试方法

1. 查看浏览器开发者工具的控制台
2. 检查网络请求的响应
3. 查看服务器日志
4. 使用测试页面验证功能

## 🎉 总结

这个博客上传功能已经完全集成到你的VapourX网站中，提供了：

- ✅ 完整的用户界面
- ✅ Markdown编辑和预览
- ✅ GitHub集成
- ✅ 响应式设计
- ✅ 错误处理
- ✅ 测试功能

你现在可以：
1. 访问 `/demo` 了解功能
2. 访问 `/test` 测试基本功能
3. 访问 `/newblog` 创建真实文章
4. 配置GitHub Token后使用完整功能

功能已经准备就绪，可以开始使用了！🎊 