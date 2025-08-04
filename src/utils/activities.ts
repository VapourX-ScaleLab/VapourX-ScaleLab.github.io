import type { CollectionEntry } from 'astro:content'

export function getUniqueActivityTypes(activities: CollectionEntry<'activities'>[]): string[] {
  const types = activities.map(activity => activity.data.activityType)
  const uniqueTypes = [...new Set(types)]
  return uniqueTypes.sort()
}

export function getActivitiesByType(
  activities: CollectionEntry<'activities'>[], 
  activityType: string
): CollectionEntry<'activities'>[] {
  return activities.filter(activity => activity.data.activityType === activityType)
}

export function getActivityTypeDisplayName(activityType: string): string {
  const displayNames: Record<string, string> = {
    'event': '活动',
    'project': '项目',
    'achievement': '成就',
    'other': '其他'
  }
  return displayNames[activityType] || activityType
} 