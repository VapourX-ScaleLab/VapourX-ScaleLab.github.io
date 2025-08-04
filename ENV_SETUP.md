# 环境变量配置说明

## 🔧 创建 .env 文件

在项目根目录创建 `.env` 文件，内容如下：

```env
# GitHub OAuth配置
# 请将下面的值替换为你从GitHub OAuth应用获取的实际值
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

# 其他配置（可选）
# GITHUB_TOKEN=your_personal_access_token_here
```

## 📝 获取GitHub OAuth凭据

### 1. 访问GitHub开发者设置
- 打开：https://github.com/settings/developers
- 或者：GitHub → Settings → Developer settings → OAuth Apps

### 2. 创建新的OAuth应用
- 点击 "New OAuth App"
- 填写以下信息：
  ```
  Application name: VapourX Blog System
  Homepage URL: http://localhost:4322
  Application description: VapourX博客文章上传系统
  Authorization callback URL: http://localhost:4322/api/auth/github/callback
  ```

### 3. 获取凭据
- 点击 "Register application"
- 复制 **Client ID** 和 **Client Secret**
- 将这两个值填入 `.env` 文件

## ⚠️ 注意事项

1. **不要提交 .env 文件**
   - `.env` 文件包含敏感信息，不要提交到Git
   - 确保 `.env` 在 `.gitignore` 中

2. **开发环境配置**
   - 当前配置为开发环境（localhost:4322）
   - 生产环境需要更新callback URL

3. **权限范围**
   - 应用只请求 `repo` 权限
   - 用户可以控制授权范围

## 🚀 测试配置

配置完成后：

1. 启动开发服务器：`npm run dev`
2. 访问：http://localhost:4322/login
3. 点击"使用GitHub登录"
4. 应该能正常跳转到GitHub授权页面

## 🐛 常见问题

### 1. "GitHub OAuth未配置"错误
- 检查 `.env` 文件是否存在
- 确认 `GITHUB_CLIENT_ID` 和 `GITHUB_CLIENT_SECRET` 已设置
- 重启开发服务器

### 2. "Callback URL不匹配"错误
- 确认GitHub OAuth应用的callback URL设置正确
- 检查端口号是否为4322

### 3. "权限不足"错误
- 确保用户授权了repo权限
- 检查用户是否有仓库的写入权限 