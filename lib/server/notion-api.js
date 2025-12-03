// lib/server/notion-api.js
import { NotionAPI } from 'notion-client'

const notion = new NotionAPI({
  authToken: process.env.NOTION_ACCESS_TOKEN
})

// 获取所有文章
export async function getAllPosts() {
  try {
    // 假设你有一个数据库 ID，替换为你自己的
    const databaseId = process.env.NOTION_BLOG_DATABASE_ID

    const posts = await notion.getDatabase(databaseId)
    return posts.results.map(post => ({
      id: post.id,
      title: post.properties.Name.title[0]?.plain_text || '',
      date: post.properties.Date.date?.start || '',
      tags: post.properties.Tags.multi_select || [],
      slug: post.properties.Slug.rich_text[0]?.plain_text || '',
      cover: post.cover?.external?.url || ''
    }))
  } catch (error) {
    console.error('getAllPosts error:', error)
    return []
  }
}

// 获取每日笔记
export async function getDailyNotes() {
  try {
    const databaseId = process.env.NOTION_DAILY_NOTES_DATABASE_ID

    const notes = await notion.getDatabase(databaseId)
    return notes.results.map(note => ({
      id: note.id,
      title: note.properties.Name.title[0]?.plain_text || '',
      date: note.properties.Date.date?.start || ''
    }))
  } catch (error) {
    console.error('getDailyNotes error:', error)
    return []
  }
}

export { notion }
