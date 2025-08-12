import membersData from '../data/members.json'

// Type assertion to ensure proper typing
const typedMembersData = membersData as { members: Person[] }

export interface Person {
  id: string
  name: string
  avatar: string
  organization: string
  role: string | string[]
  slogan: string
  description: string
  github?: string
  website?: string
  email?: string
  linkedin?: string
  bilibili?: string
  behance?: string
  dribbble?: string
  xiaohongshu?: string
  x?: string
  instagram?: string
  tags: string[]
  research: {
    title: string
    description: string
    link?: string
  }[]
}

export function getAllMembers(): Person[] {
  return typedMembersData.members
}

export function getMemberById(id: string): Person | undefined {
  return typedMembersData.members.find(member => member.id === id)
}

export function getMembersByTag(tag: string): Person[] {
  return typedMembersData.members.filter(member => 
    member.tags.includes(tag)
  )
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  typedMembersData.members.forEach(member => {
    member.tags.forEach(tag => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

export function getTagCounts(): Map<string, number> {
  const tagCounts = new Map<string, number>()
  typedMembersData.members.forEach(member => {
    member.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })
  return tagCounts
} 