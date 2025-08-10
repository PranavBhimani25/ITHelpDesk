import React from 'react'

export default function TagBadge({ tag }) {
  const style = {
    backgroundColor: tag?.color || '#e5e7eb',
    color: '#081023',
  }
  return (
    <span className="px-2 py-1 rounded-full text-xs font-medium" style={style}>
      {tag?.name || 'Tag'}
    </span>
  )
} 