# 博客上传功能配置说明

## 功能概述

这个功能允许用户通过网页界面创建新的博客文章，并自动创建GitHub Pull Request。

## 配置步骤

### 1. 创建GitHub Personal Access Token

1. 访问 [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. 点击 "Generate new token (classic)"
3. 选择以下权限：
   - `repo` (完整的仓库访问权限)
   - `workflow` (可选，如果需要GitHub Actions权限)
4. 生成并复制token

### 2. 配置环境变量

在项目根目录创建 `.env` 文件：

```env
GITHUB_TOKEN=your_github_personal_access_token_here
```

### 3. 安装依赖

```bash
npm install marked @octokit/rest
```

## 使用方法

1. 访问 `/newblog` 页面
2. 填写文章信息：
   - 标题
   - 文件夹名称（英文，如：my-new-post）
   - 发布日期
   - 标签（用逗号分隔）
   - 描述
   - 作者
   - 语言
   - 文章内容（Markdown格式）
3. 点击"提交文章"
4. 系统会自动创建GitHub Pull Request
5. 在GitHub上检查并合并Pull Request

## 文件结构

提交的文章将创建在以下路径：
```
src/content/blog/{folderName}/index.md
```

## 注意事项

- 文件夹名称必须是英文，只能包含字母、数字、连字符和下划线
- 文章内容支持Markdown格式
- 系统会自动生成frontmatter
- 需要手动添加缩略图（thumbnail.jpg）到对应文件夹
- Pull Request需要手动审核和合并

## 故障排除

### 常见错误

1. **GitHub Token未配置**
   - 确保在 `.env` 文件中设置了 `GITHUB_TOKEN`

2. **权限不足**
   - 确保GitHub Token有足够的权限
   - 确保Token没有过期

3. **文件夹名称冲突**
   - 确保文件夹名称是唯一的
   - 避免使用特殊字符

### 调试

查看浏览器控制台和服务器日志以获取详细错误信息。 