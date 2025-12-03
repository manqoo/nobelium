import { notion } from './notion-api'

const BLOG_DB_ID = process.env.NOTION_BLOG_DATABASE_ID
const DAILY_DB_ID = process.env.NOTION_DAILY_DATABASE_ID

// 获取博客文章
export async function getAllPosts() {
  const response = await notion.getDatabase(BLOG_DB_ID)
  return response.results
}

// 获取日历数据
export async function getDailyNotes() {
  const response = await notion.getDatabase(DAILY_DB_ID)
  return response.results
}

// 获取单篇文章
export async function getPostBlocks(postId) {
  const response = await notion.getBlocks(postId)
  return response.results
}
