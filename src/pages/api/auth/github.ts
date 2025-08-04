import type { APIRoute } from 'astro'

// GitHub OAuth配置
const GITHUB_CLIENT_ID = import.meta.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = import.meta.env.GITHUB_CLIENT_SECRET
const REDIRECT_URI = 'http://localhost:4322/api/auth/github/callback'

export const GET: APIRoute = async () => {
  if (!GITHUB_CLIENT_ID) {
    return new Response('GitHub OAuth未配置', { status: 500 })
  }

  // 生成随机state参数防止CSRF攻击
  const state = Math.random().toString(36).substring(7)
  
  // 构建GitHub OAuth URL
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=repo&state=${state}`

  // 重定向到GitHub授权页面
  return new Response(null, {
    status: 302,
    headers: {
      'Location': githubAuthUrl,
      'Set-Cookie': `oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`
    }
  })
} 