import { useState } from 'react'
import { getAllPosts } from '@/lib/notion'
import BlogPost from './BlogPost'

export default function CalendarView({ posts }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedPosts, setSelectedPosts] = useState([])

  // 获取当前月份的第一天和最后一天
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // 构造当月天数数组
  const daysInMonth = Array.from(
    { length: lastDay.getDate() },
    (_, i) => new Date(year, month, i + 1)
  )

  // 点击某一天
  const handleClickDay = (day) => {
    const postsForDay = posts.filter(post => {
      const postDate = new Date(post.date) // 确保 Notion 的日期字段是 ISO 字符串
      return (
        postDate.getFullYear() === day.getFullYear() &&
        postDate.getMonth() === day.getMonth() &&
        postDate.getDate() === day.getDate()
      )
    })
    setSelectedPosts(postsForDay)
  }

  // 切换月份
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <button onClick={prevMonth}>上一月</button>
        <h3>{year}年 {month + 1}月</h3>
        <button onClick={nextMonth}>下一月</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
        {daysInMonth.map(day => {
          const hasPost = posts.some(post => {
            const postDate = new Date(post.date)
            return (
              postDate.getFullYear() === day.getFullYear() &&
              postDate.getMonth() === day.getMonth() &&
              postDate.getDate() === day.getDate()
            )
          })
          return (
            <div
              key={day.toISOString()}
              onClick={() => handleClickDay(day)}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: hasPost ? '#e0f7fa' : '#fff'
              }}
            >
              {day.getDate()}
            </div>
          )
        })}
      </div>

      {selectedPosts.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>文章列表</h4>
          {selectedPosts.map(post => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
