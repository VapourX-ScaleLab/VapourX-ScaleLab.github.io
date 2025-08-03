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
 * 从博客集合中获取作者及其文章数量
 */
export function getUniqueAuthorsWithCount(collections: CollectionEntry<'blog'>[] | any[]): [string, number][] {
  const authorCount = new Map<string, number>()
  
  collections.forEach((post) => {
    if (post.data.author) {
      const count = authorCount.get(post.data.author) || 0
      authorCount.set(post.data.author, count + 1)
    }
  })
  
  return Array.from(authorCount.entries()).sort((a, b) => b[1] - a[1])
} 