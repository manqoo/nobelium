export default function CalendarView({ posts, dailyNotes }) {
  return (
    <div>
      <h2>日历视图</h2>
      <ul>
        {dailyNotes.map(note => (
          <li key={note.id}>
            <strong>{note.date}:</strong> {note.text}
            <br />
            {posts
              .filter(post => post.date === note.date)
              .map(post => (
                <a key={post.id} href={post.url}>
                  {post.title}
                </a>
              ))}
          </li>
        ))}
      </ul>
    </div>
  )
}
