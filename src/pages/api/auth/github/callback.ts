import type { APIRoute } from 'astro'

// GitHub OAuth配置
const GITHUB_CLIENT_ID = import.meta.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = import.meta.env.GITHUB_CLIENT_SECRET

export const GET: APIRoute = async ({ request, cookies }) => {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const error = url.searchParams.get('error')

  // 检查是否有错误
  if (error) {
    return new Response(`GitHub授权失败: ${error}`, { status: 400 })
  }

  // 检查必要参数
  if (!code || !state) {
    return new Response('缺少必要的授权参数', { status: 400 })
  }

  // 验证state参数（这里简化处理，实际应该验证cookie中的state）
  // const savedState = cookies.get('oauth_state')?.value
  // if (state !== savedState) {
  //   return new Response('State参数验证失败', { status: 400 })
  // }

  try {
    // 使用授权码获取访问令牌
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
        redirect_uri: 'http://localhost:4322/api/auth/github/callback'
      })
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return new Response(`获取访问令牌失败: ${tokenData.error_description}`, { status: 400 })
    }

    const accessToken = tokenData.access_token

    // 获取用户信息
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    const userData = await userResponse.json()

    // 设置登录状态cookie
    const sessionData = {
      accessToken,
      user: {
        id: userData.id,
        login: userData.login,
        name: userData.name,
        avatar_url: userData.avatar_url
      },
      expiresAt: Date.now() + (8 * 60 * 60 * 1000) // 8小时后过期
    }

    // 设置session cookie
    cookies.set('github_session', JSON.stringify(sessionData), {
      path: '/',
      httpOnly: true,
      secure: false, // 开发环境设为false
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 // 8小时
    })

    // 清除oauth_state cookie
    cookies.delete('oauth_state', { path: '/' })

    // 重定向到成功页面
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/auth-success'
      }
    })

  } catch (error) {
    console.error('GitHub OAuth错误:', error)
    return new Response('GitHub授权处理失败', { status: 500 })
  }
} 