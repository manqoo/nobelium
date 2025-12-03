// lib/server/notion-functions.js
import { notion } from './notion-api'

// 获取所有文章
export async function getAllPosts() {
  // 这里假设你的 Notion database id 存在环境变量
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID
  const response = await notion.databases.query({ database_id: databaseId })
  return response.results.map(page => ({
    id: page.id,
    title: page.properties.Name.title[0]?.plain_text || 'Untitled',
    date: page.properties.Date.date?.start || null,
    // 根据你的需求添加其他字段
  }))
}

// 获取每日笔记
export async function getDailyNotes() {
  const databaseId = process.env.NOTION_DAILY_DATABASE_ID
  const response = await notion.databases.query({ database_id: databaseId })
  return response.results.map(page => ({
    id: page.id,
    date: page.properties.Date.date?.start || null,
    content: page.properties.Content.rich_text[0]?.plain_text || ''
  }))
}
