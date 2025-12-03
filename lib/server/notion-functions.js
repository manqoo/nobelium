import client from './notion-api'

// 获取博客文章
export async function getAllPosts() {
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID
  const response = await client.getDatabase(databaseId)

  const posts = response.results.map(page => ({
    id: page.id,
    title: page.properties.Name.title[0]?.plain_text || 'Untitled',
    date: page.properties.Date.date.start,
    slug: page.properties.Slug.rich_text[0]?.plain_text || ''
  }))

  // 按日期倒序排列
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

// 获取 Daily Notes
export async function getDailyNotes() {
  const databaseId = process.env.NOTION_DAILY_NOTES_ID
  const response = await client.getDatabase(databaseId)

  const notes = response.results.map(page => ({
    id: page.id,
    date: page.properties.Date.date.start,
    content: page.properties.Content.rich_text[0]?.plain_text || ''
  }))

  return notes
}
