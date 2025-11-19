import type { CollectionEntry } from 'astro:content'

export function getUniqueActivityTypes(activities: CollectionEntry<'activities'>[]): string[] {
  const types = activities.map(activity => activity.data.activityType)
  const uniqueTypes = [...new Set(types)]
  
  // 自定义排序顺序：学术活动、读书会、社区活动
  const order = ['学术活动', '读书会', '社区活动', 'achievement', 'other']
  return uniqueTypes.sort((a, b) => {
    const indexA = order.indexOf(a)
    const indexB = order.indexOf(b)
    // 如果类型不在顺序列表中，放到最后
    if (indexA === -1 && indexB === -1) return a.localeCompare(b)
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })
}

export function getActivitiesByType(
  activities: CollectionEntry<'activities'>[], 
  activityType: string
): CollectionEntry<'activities'>[] {
  return activities.filter(activity => activity.data.activityType === activityType)
}

export function getActivityTypeDisplayName(activityType: string): string {
  const displayNames: Record<string, string> = {
    '学术活动': '学术活动',
    '社区活动': '社区活动',
    '读书会': '读书会',
    'achievement': 'Achievement',
    'other': 'Other'
  }
  return displayNames[activityType] || activityType
}

/**
 * 为活动生成随机渐变背景
 * 基于活动 ID 生成一致的随机颜色，确保相同活动总是得到相同的渐变
 */
export function getActivityGradient(activityId: string): string {
  // 精心挑选的渐变色对，确保颜色饱和度适中且对比度好
  const gradients = [
    'linear-gradient(135deg, #3b82f6, #7c3aed)',
    'linear-gradient(135deg, #06b6d4, #2563eb)',
    'linear-gradient(135deg, #4f46e5, #7c3aed)',
    'linear-gradient(135deg, #7c3aed, #db2777)',
    'linear-gradient(135deg, #8b5cf6, #ec4899)',
    'linear-gradient(135deg, #d946ef, #ec4899)',
    'linear-gradient(135deg, #ec4899, #f43f5e)',
    'linear-gradient(135deg, #f43f5e, #f97316)',
    'linear-gradient(135deg, #f97316, #f59e0b)',
    'linear-gradient(135deg, #f59e0b, #ca8a04)',
    'linear-gradient(135deg, #14b8a6, #0ea5e9)',
    'linear-gradient(135deg, #10b981, #0f766e)',
    'linear-gradient(135deg, #22c55e, #047857)',
    'linear-gradient(135deg, #84cc16, #16a34a)',
    'linear-gradient(135deg, #38bdf8, #4f46e5)',
    'linear-gradient(135deg, #2563eb, #4338ca)',
    'linear-gradient(135deg, #7c3aed, #1d4ed8)',
    'linear-gradient(135deg, #db2777, #7c3aed)',
    'linear-gradient(135deg, #ef4444, #ec4899)',
    'linear-gradient(135deg, #ea580c, #dc2626)',
  ]

  // 使用简单的哈希函数将活动ID转换为索引
  let hash = 0
  for (let i = 0; i < activityId.length; i++) {
    hash = ((hash << 5) - hash) + activityId.charCodeAt(i)
    hash = hash & hash // 转换为32位整数
  }
  
  const index = Math.abs(hash) % gradients.length
  return gradients[index]
} 