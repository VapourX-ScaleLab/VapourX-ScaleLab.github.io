# GitHub OAuth配置说明

## 🎯 功能概述

现在系统支持GitHub OAuth登录，用户可以直接使用GitHub账号登录，无需配置Personal Access Token。

## 🔧 配置步骤

### 1. 创建GitHub OAuth应用

1. 访问 [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - **Application name**: `VapourX Blog System`
   - **Homepage URL**: `http://localhost:4322`
   - **Application description**: `VapourX博客文章上传系统`
   - **Authorization callback URL**: `http://localhost:4322/api/auth/github/callback`

4. 点击 "Register application"
5. 记录下 **Client ID** 和 **Client Secret**

### 2. 配置环境变量

在项目根目录创建 `.env` 文件：

```env
# GitHub OAuth配置
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
```

### 3. 安装依赖

```bash
npm install @octokit/oauth-app
```

## 🚀 使用方法

### 1. 用户登录流程

1. 用户访问 `/login` 页面
2. 点击 "使用GitHub登录" 按钮
3. 跳转到GitHub授权页面
4. 用户授权后自动跳转回系统
5. 登录成功，可以创建文章

### 2. 创建文章流程

1. 登录后访问 `/newblog` 页面
2. 填写文章信息
3. 提交表单
4. 系统自动创建GitHub Pull Request
5. 显示成功信息

## 📄 页面说明

### 登录相关页面

- **`/login`** - GitHub登录页面
- **`/auth-success`** - 登录成功页面
- **`/api/auth/github`** - OAuth授权端点
- **`/api/auth/github/callback`** - OAuth回调处理

### 功能页面

- **`/newblog`** - 文章创建页面（需要登录）
- **`/api/create-blog`** - 文章提交API（需要登录）

## 🔒 安全特性

- **OAuth 2.0**: 使用标准的OAuth 2.0流程
- **State参数**: 防止CSRF攻击
- **Session管理**: 安全的session cookie
- **Token过期**: 8小时后自动过期
- **权限控制**: 只请求必要的repo权限

## 🎨 用户体验

- **一键登录**: 点击即可使用GitHub账号登录
- **自动授权**: 登录后自动获得创建PR的权限
- **状态保持**: 登录状态保持8小时
- **友好提示**: 清晰的登录状态和错误提示

## ⚠️ 注意事项

1. **开发环境**: 当前配置为开发环境（localhost）
2. **生产环境**: 部署时需要更新callback URL
3. **权限范围**: 只请求repo权限，不会访问其他数据
4. **Token安全**: 用户token存储在安全的httpOnly cookie中

## 🐛 故障排除

### 常见问题

1. **OAuth未配置**
   - 确保已创建GitHub OAuth应用
   - 检查环境变量是否正确设置

2. **Callback URL错误**
   - 确保callback URL与GitHub应用配置一致
   - 检查端口号是否正确

3. **权限不足**
   - 确保用户授权了repo权限
   - 检查用户是否有仓库的写入权限

4. **登录状态丢失**
   - 检查cookie设置
   - 确认浏览器支持cookie

## 📝 下一步

1. 配置GitHub OAuth应用
2. 设置环境变量
3. 测试登录功能
4. 创建第一篇文章

现在用户可以方便地使用GitHub账号登录并创建文章了！🎉 