import type { CollectionEntry } from 'astro:content'

/**
 * 从博客集合中获取唯一作者列表
 */
export function getUniqueAuthors(collections: CollectionEntry<'blog'>[] | any[]): string[] {
  const authors = new Set<string>()
  
  collections.forEach((post) => {
    if (post.data.author) {
      authors.add(post.data.author)
    }
  })
  
  return Array.from(authors).sort()
}

/**
 * 从docs集合中获取唯一作者列表
 */
export function getUniqueDocsAuthors(collections: CollectionEntry<'docs'>[] | any[]): string[] {
  const authors = new Set<string>()
  
  collections.forEach((doc) => {
    if (doc.data.author) {
      authors.add(doc.data.author)
    }
  })
  
  return Array.from(authors).sort()
}

/**
 * 从博客集合中获取作者及其文章数量
 */
export function getUniqueAuthorsWithCount(collections: CollectionEntry<'blog'>[] | any[]): [string, number][] {
  const authorCounts = new Map<string, number>()
  
  collections.forEach((post) => {
    if (post.data.author) {
      const count = authorCounts.get(post.data.author) || 0
      authorCounts.set(post.data.author, count + 1)
    }
  })
  
  return Array.from(authorCounts.entries()).sort((a, b) => b[1] - a[1])
}

/**
 * 从docs集合中获取作者及其文档数量
 */
export function getUniqueDocsAuthorsWithCount(collections: CollectionEntry<'docs'>[] | any[]): [string, number][] {
  const authorCounts = new Map<string, number>()
  
  collections.forEach((doc) => {
    if (doc.data.author) {
      const count = authorCounts.get(doc.data.author) || 0
      authorCounts.set(doc.data.author, count + 1)
    }
  })
  
  return Array.from(authorCounts.entries()).sort((a, b) => b[1] - a[1])
} 