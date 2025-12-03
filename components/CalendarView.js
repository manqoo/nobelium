import { useState, useMemo } from 'react'
import dayjs from 'dayjs'

export default function CalendarView({ posts }) {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [selectedDay, setSelectedDay] = useState(null)

  // 当月第一天和天数
  const monthStart = currentDate.startOf('month')
  const monthDays = currentDate.daysInMonth()

  // 将文章按日期分组
  const postsByDate = useMemo(() => {
    const map = {}
    posts.forEach(post => {
      const date = dayjs(post.date).format('YYYY-MM-DD')
      if (!map[date]) map[date] = []
      map[date].push(post)
    })
    return map
  }, [posts])

  // 生成日历格子
  const daysArray = Array.from({ length: monthDays }, (_, i) => i + 1)

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{currentDate.format('MMMM YYYY')}</h2>

      <div className="grid grid-cols-7 gap-2 text-center">
        {daysArray.map(day => {
          const dateStr = currentDate.date(day).format('YYYY-MM-DD')
          const hasPost = postsByDate[dateStr]?.length > 0
          return (
            <div
              key={day}
              className={`p-2 border rounded cursor-pointer ${hasPost ? 'bg-green-100' : 'bg-gray-100'}`}
              onClick={() => setSelectedDay(dateStr)}
            >
              {day}
            </div>
          )
        })}
      </div>

      {/* 显示选中日期文章 */}
      {selectedDay && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">
            Posts on {dayjs(selectedDay).format('YYYY-MM-DD')}
          </h3>
          <ul className="list-disc pl-5">
            {postsByDate[selectedDay]?.map(post => (
              <li key={post.id}>
                <a href={post.slug}>{post.title}</a>
              </li>
            )) || <li>No posts</li>}
          </ul>
        </div>
      )}
    </div>
  )
}
