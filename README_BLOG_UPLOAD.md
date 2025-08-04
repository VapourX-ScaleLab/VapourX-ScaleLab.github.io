# 博客上传功能

## 概述

这个功能允许用户通过网页界面创建新的博客文章，并自动创建GitHub Pull Request。用户可以在Markdown编辑器中编写文章，预览内容，然后提交到GitHub仓库。

## 功能特性

- 📝 **Markdown编辑器**: 支持实时预览，语法高亮
- 🏷️ **自动生成frontmatter**: 根据表单内容自动生成文章元数据
- 🔄 **GitHub集成**: 自动创建分支、文件和Pull Request
- 📱 **响应式设计**: 支持桌面和移动设备
- ✅ **表单验证**: 实时验证用户输入
- 🎨 **现代化UI**: 美观的用户界面和交互效果

## 文件结构

```
src/
├── pages/
│   ├── newblog.astro          # 主上传页面
│   ├── demo.astro             # 演示页面
│   └── api/
│       └── create-blog.ts     # API端点
├── BLOG_UPLOAD_SETUP.md       # 配置说明
└── README_BLOG_UPLOAD.md      # 本文档
```

## 页面说明

### 1. 演示页面 (`/demo`)
- 功能介绍和使用说明
- 链接到主上传页面

### 2. 上传页面 (`/newblog`)
- 文章信息表单
- Markdown编辑器
- 实时预览功能
- 提交和错误处理

### 3. API端点 (`/api/create-blog`)
- 处理表单提交
- 生成Markdown内容
- 创建GitHub Pull Request

## 使用方法

### 1. 配置GitHub Token

1. 访问 [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. 生成新的Personal Access Token
3. 选择权限：`repo`, `workflow`
4. 在项目根目录创建 `.env` 文件：
   ```env
   GITHUB_TOKEN=your_token_here
   ```

### 2. 安装依赖

```bash
npm install marked @octokit/rest
```

### 3. 使用功能

1. 访问 `/demo` 页面了解功能
2. 点击"开始创建文章"进入上传页面
3. 填写文章信息：
   - 标题
   - 文件夹名称（英文）
   - 发布日期
   - 标签
   - 描述
   - 作者
   - 语言
   - 文章内容（Markdown）
4. 使用预览功能检查内容
5. 点击提交按钮
6. 在GitHub上检查并合并Pull Request

## 技术实现

### 前端技术
- **Astro**: 静态站点生成器
- **UnoCSS**: 原子化CSS框架
- **Marked**: Markdown解析器
- **TypeScript**: 类型安全

### 后端技术
- **GitHub REST API**: 仓库操作
- **Octokit**: GitHub API客户端
- **环境变量**: 安全配置

### 主要功能模块

1. **表单处理**: 收集用户输入并验证
2. **Markdown预览**: 实时渲染Markdown内容
3. **内容生成**: 自动生成frontmatter和完整文章
4. **GitHub集成**: 创建分支、文件和Pull Request
5. **错误处理**: 用户友好的错误提示

## 文章格式

生成的文章遵循以下格式：

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

## 注意事项

1. **文件夹名称**: 必须是英文，只能包含字母、数字、连字符和下划线
2. **缩略图**: 需要手动添加到生成的文件夹中
3. **权限**: GitHub Token需要有足够的权限
4. **审核**: Pull Request需要手动审核和合并
5. **内容规范**: 确保文章内容符合社区规范

## 故障排除

### 常见问题

1. **GitHub Token未配置**
   - 检查 `.env` 文件是否存在
   - 确认Token格式正确

2. **权限不足**
   - 检查Token权限设置
   - 确认Token未过期

3. **文件夹名称冲突**
   - 使用唯一的文件夹名称
   - 避免特殊字符

4. **API错误**
   - 检查网络连接
   - 查看浏览器控制台错误信息

### 调试方法

1. 查看浏览器开发者工具的控制台
2. 检查网络请求的响应
3. 查看服务器日志
4. 验证GitHub API权限

## 扩展功能

可以考虑添加的功能：

1. **图片上传**: 支持直接上传图片到文章文件夹
2. **草稿保存**: 保存未完成的文章
3. **模板系统**: 提供文章模板
4. **批量操作**: 支持批量创建文章
5. **权限管理**: 限制特定用户的使用权限

## 贡献

欢迎提交Issue和Pull Request来改进这个功能！

## 许可证

本项目采用Apache-2.0许可证。 