import { NotionAPI } from 'notion-client'

const notion = new NotionAPI({
  authToken: process.env.NOTION_ACCESS_TOKEN
})

// 获取单页内容
export async function getPage(pageId) {
  return await notion.getPage(pageId)
}

// 获取数据库里的所有帖子
export async function getAllPosts(databaseId) {
  return await notion.getDatabase(databaseId)
}

// 获取每日笔记
export async function getDailyNotes(databaseId) {
  const database = await notion.getDatabase(databaseId)
  return database.results.filter(
    (page) => page.properties.Type?.select?.name === 'Daily Note'
  )
}

// 获取某篇文章的块
export async function getPostBlocks(pageId) {
  return await notion.getBlocks(pageId)
}

export { notion }
