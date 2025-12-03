import { useMemo, useState } from 'react'
import dayjs from 'dayjs'

export default function CalendarView({ posts, dailyNotes }) {
  const [currentMonth, setCurrentMonth] = useState(dayjs())

  // 按日期分组
  const postsByDate = useMemo(() => {
    const map = {}
    posts.forEach(post => {
      const date = dayjs(post.date).format('YYYY-MM-DD')
      if (!map[date]) map[date] = []
      map[date].push(post)
    })
    return map
  }, [posts])

  const notesByDate = useMemo(() => {
    const map = {}
    dailyNotes.forEach(note => {
      const date = dayjs(note.date).format('YYYY-MM-DD')
      map[date] = note.content
    })
    return map
  }, [dailyNotes])

  // 渲染简单日历
  const startOfMonth = currentMonth.startOf('month')
  const endOfMonth = currentMonth.endOf('month')
  const days = []
  for (let d = startOfMonth.date(); d <= endOfMonth.date(); d++) {
    const dateStr = currentMonth.date(d).format('YYYY-MM-DD')
    days.push(
      <div key={dateStr} className="border p-2">
        <div className="font-bold">{d}</div>
        <div className="text-sm text-gray-600">{notesByDate[dateStr]}</div>
        {postsByDate[dateStr]?.map(post => (
          <div key={post.id}>
            <a href={post.url} className="text-blue-600 underline">
              {post.title}
            </a>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">{currentMonth.format('YYYY年MM月')}</h2>
      <div className="grid grid-cols-7 gap-2">{days}</div>
    </div>
  )
}
