import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Required
  schema: ({ image }) =>
    z.object({
      // Required
      title: z.string().max(60),
      description: z.string().max(160),
      publishDate: z.coerce.date(),
      // Optional
      updatedDate: z.coerce.date().optional(),
      heroImage: z
        .object({
          src: image(),
          alt: z.string().optional(),
          inferSize: z.boolean().optional(),
          width: z.number().optional(),
          height: z.number().optional(),

          color: z.string().optional()
        })
        .optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      language: z.string().optional(),
      author: z.string().optional(),
      authorAvatar: z.union([
        z.string(),
        z.object({
          src: image(),
          alt: z.string().optional(),
          width: z.number().optional(),
          height: z.number().optional()
        })
      ]).optional(),
      draft: z.boolean().default(false),
      // Special fields
      comment: z.boolean().default(true)
    })
})

// Define activities collection
const activities = defineCollection({
  // Load Markdown and MDX files in the `src/content/activities/` directory.
  loader: glob({ base: './src/content/activities', pattern: '**/*.{md,mdx}' }),
  // Required
  schema: ({ image }) =>
    z.object({
      // Required
      title: z.string().max(60),
      description: z.string().max(160),
      publishDate: z.coerce.date(),
      // Optional
      updatedDate: z.coerce.date().optional(),
      heroImage: z
        .object({
          src: image(),
          alt: z.string().optional(),
          inferSize: z.boolean().optional(),
          width: z.number().optional(),
          height: z.number().optional(),
          color: z.string().optional()
        })
        .optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      language: z.string().optional(),
      author: z.string().optional(),
      authorAvatar: z.union([
        z.string(),
        z.object({
          src: image(),
          alt: z.string().optional(),
          width: z.number().optional(),
          height: z.number().optional()
        })
      ]).optional(),
      draft: z.boolean().default(false),
      // Activity specific fields
      activityType: z.enum(['event', 'project', 'achievement', 'read-in', 'other']).default('other'),
      location: z.string().optional(),
      duration: z.string().optional(),
      participants: z.number().optional(),
      // Special fields
      comment: z.boolean().default(true),
      order: z.number().default(999)
    })
})

// Define docs collection
const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(60),
      description: z.string().max(160),
      publishDate: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      language: z.string().optional(),
      author: z.string().optional(),
      authorAvatar: z.union([
        z.string(),
        z.object({
          src: image(),
          alt: z.string().optional(),
          width: z.number().optional(),
          height: z.number().optional()
        })
      ]).optional(),
      draft: z.boolean().default(false),
      // Special fields
      order: z.number().default(999)
    })
})

export const collections = { blog, activities, docs }
