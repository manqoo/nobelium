// components/CalendarView.js
import { useMemo } from 'react'
import dayjs from 'dayjs'

export default function CalendarView({ posts }) {
  // 将文章按日期分组
  const postsByDate = useMemo(() => {
    const map = {}
    posts.forEach(post => {
      // 取模板文章的实际日期字段，依次尝试 publishTime / createdTime / date
      const rawDate = post.publishTime || post.createdTime || post.date
      if (!rawDate) return // 没日期就跳过

      const date = dayjs(rawDate).format('YYYY-MM-DD')
      if (!map[date]) map[date] = []
      map[date].push(post)
    })
    return map
  }, [posts])

  // 获取当前月份
  const now = dayjs()
  const startOfMonth = now.startOf('month')
  const endOfMonth = now.endOf('month')
  const daysInMonth = endOfMonth.date()

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1
    const dateKey = dayjs(`${now.year()}-${now.month() + 1}-${day}`).format('YYYY-MM-DD')
    return {
      day,
      posts: postsByDate[dateKey] || []
    }
  })

  return (
    <div className="calendar grid grid-cols-7 gap-2 mb-6">
      {calendarDays.map(d => (
        <div key={d.day} className="day p-2 border rounded">
          <div className="day-number">{d.day}</div>
          {d.posts.length > 0 && (
            <ul className="mt-1 text-xs">
              {d.posts.map(p => (
                <li key={p.id}>{p.title}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
