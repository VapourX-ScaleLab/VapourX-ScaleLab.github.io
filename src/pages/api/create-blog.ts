import type { APIRoute } from 'astro'
import { Octokit } from '@octokit/rest'

interface BlogData {
  title: string
  folderName: string
  publishDate: string
  tags: string
  description: string
  author: string
  language: string
  content: string
}

// GitHub配置
const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN
const REPO_OWNER = 'VapourX-ScaleLab'
const REPO_NAME = 'VapourX-ScaleLab.github.io'
const BASE_BRANCH = 'main'

const octokit = new Octokit({
  auth: GITHUB_TOKEN
})

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const data: BlogData = await request.json()
    
    // 检查用户是否已登录
    const sessionCookie = cookies.get('github_session')
    if (!sessionCookie?.value) {
      return new Response(JSON.stringify({ 
        error: '请先使用GitHub登录',
        needLogin: true
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    let sessionData
    try {
      sessionData = JSON.parse(sessionCookie.value)
    } catch (e) {
      return new Response(JSON.stringify({ 
        error: '登录状态无效，请重新登录',
        needLogin: true
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // 检查token是否过期
    if (sessionData.expiresAt < Date.now()) {
      return new Response(JSON.stringify({ 
        error: '登录已过期，请重新登录',
        needLogin: true
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // 验证必需字段
    if (!data.title || !data.folderName || !data.content) {
      return new Response(JSON.stringify({ error: '缺少必需字段' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // 格式化日期
    const publishDate = data.publishDate ? new Date(data.publishDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // 处理标签
    const tags = data.tags ? data.tags.split(',').map(tag => tag.trim()) : []

    // 生成Markdown内容
    const markdownContent = generateMarkdownContent(data, publishDate, tags)

    // 创建GitHub Pull Request
    try {
      const prUrl = await createGitHubPullRequest(data.folderName, markdownContent, sessionData.accessToken)
      
      return new Response(JSON.stringify({ 
        success: true, 
        prUrl,
        message: '文章提交成功！Pull Request已创建。'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (error) {
      console.error('GitHub API错误:', error)
      return new Response(JSON.stringify({ 
        success: false,
        error: 'GitHub Token未配置，无法创建Pull Request。请配置GitHub Token或手动创建文章。',
        prUrl: `https://github.com/${REPO_OWNER}/${REPO_NAME}/pull/new/new-blog-${data.folderName}-${Date.now()}`,
        message: '文章内容已生成，但无法自动创建Pull Request。'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

  } catch (error) {
    console.error('创建博客文章时出错:', error)
    return new Response(JSON.stringify({ 
      error: '服务器内部错误，请稍后重试' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

function generateMarkdownContent(data: BlogData, publishDate: string, tags: string[]): string {
  const frontmatter = `---
title: '${data.title}'
publishDate: '${publishDate}'
updatedDate: '${publishDate}'
description: '${data.description || ''}'
tags:
${tags.map(tag => `  - ${tag}`).join('\n')}
language: '${data.language || 'English'}'
author: '${data.author || 'VapourX'}'
authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=${data.author || 'VapourX'}'
heroImage: { src: './thumbnail.jpg', color: '#9698C1' }
---

`

  return frontmatter + data.content
}

async function createGitHubPullRequest(folderName: string, content: string, userToken: string): Promise<string> {
  // 使用用户的GitHub token
  const userOctokit = new Octokit({
    auth: userToken
  })

  const branchName = `new-blog-${folderName}-${Date.now()}`
  const filePath = `src/content/blog/${folderName}/index.md`

  try {
    // 1. 获取最新的commit SHA
    const { data: ref } = await userOctokit.git.getRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: `heads/${BASE_BRANCH}`
    })

    // 2. 创建新分支
    await userOctokit.git.createRef({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      ref: `refs/heads/${branchName}`,
      sha: ref.object.sha
    })

    // 3. 创建文件
    await userOctokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      message: `Add new blog: ${folderName}`,
      content: Buffer.from(content).toString('base64'),
      branch: branchName
    })

    // 4. 创建Pull Request
    const { data: pr } = await userOctokit.pulls.create({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      title: `Add new blog: ${folderName}`,
      body: `## 新文章提交

**文件夹名称:** ${folderName}
**文件路径:** ${filePath}

请检查文章内容并合并此Pull Request。

### 注意事项
- 请确保文章内容符合社区规范
- 如有图片，请添加到对应的文件夹中
- 请检查frontmatter格式是否正确
`,
      head: branchName,
      base: BASE_BRANCH
    })

    return pr.html_url

  } catch (error) {
    console.error('GitHub API错误:', error)
    throw new Error('创建Pull Request失败')
  }
} 