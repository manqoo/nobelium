import { NotionAPI } from 'notion-client'

const client = new NotionAPI({
  authToken: process.env.NOTION_ACCESS_TOKEN
})

// 获取博客文章
export async function getAllPosts() {
  const databaseId = process.env.BLOG_DATABASE_ID
  const response = await client.getDatabase(databaseId)
  return response.results.map(r => ({
    id: r.id,
    title: r.properties.Name.title[0]?.plain_text || '无标题',
    date: r.properties.Date?.date?.start || null,
    url: `/posts/${r.id}`
  }))
}

// 获取每日记录
export async function getDailyNotes() {
  const databaseId = process.env.DAILY_NOTES_DATABASE_ID
  const response = await client.getDatabase(databaseId)
  return response.results.map(r => ({
    id: r.id,
    date: r.properties.Date?.date?.start,
    text: r.properties.Text?.rich_text[0]?.plain_text || ''
  }))
}
