import { useMemo } from 'react'
import dayjs from 'dayjs'

export default function CalendarView({ posts, dailyNotes }) {
  // 按日期分组博客文章
  const postsByDate = useMemo(() => {
    const map = {}
    posts.forEach(post => {
      const date = dayjs(post.date).format('YYYY-MM-DD')
      if (!map[date]) map[date] = []
      map[date].push(post)
    })
    return map
  }, [posts])

  // 按日期分组 daily notes
  const notesByDate = useMemo(() => {
    const map = {}
    dailyNotes.forEach(note => {
      const date = dayjs(note.date).format('YYYY-MM-DD')
      if (!map[date]) map[date] = []
      map[date].push(note)
    })
    return map
  }, [dailyNotes])

  // 获取日历本月日期
  const today = dayjs()
  const daysInMonth = today.daysInMonth()
  const monthStart = today.startOf('month')

  const calendarDays = Array.from({ length: daysInMonth }).map((_, idx) => {
    const date = monthStart.add(idx, 'day').format('YYYY-MM-DD')
    return {
      date,
      posts: postsByDate[date] || [],
      notes: notesByDate[date] || []
    }
  })

  return (
    <div className="grid grid-cols-7 gap-2 mb-8">
      {calendarDays.map(day => (
        <div key={day.date} className="border p-2 rounded">
          <div className="font-bold mb-1">{day.date}</div>
          {/* 显示 Daily Notes 内容 */}
          {day.notes.map(note => (
            <div key={note.id} className="text-sm text-gray-600 mb-1">
              {note.content}
            </div>
          ))}
          {/* 显示文章标题 */}
          {day.posts.map(post => (
            <a
              key={post.id}
              href={`/posts/${post.slug}`}
              className="block text-blue-600 text-sm truncate"
            >
              {post.title}
            </a>
          ))}
        </div>
      ))}
    </div>
  )
}
