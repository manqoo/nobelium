// components/CalendarView.js
export default function CalendarView({ posts, dailyNotes }) {
  // 示例渲染逻辑
  return (
    <div>
      <h2>Calendar View</h2>
      {posts.map(post => (
        <div key={post.id}>
          {post.date}: {post.title}
        </div>
      ))}

      <h3>Daily Notes</h3>
      {dailyNotes.map(note => (
        <div key={note.id}>
          {note.date}: {note.content}
        </div>
      ))}
    </div>
  )
}
