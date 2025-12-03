import { getAllPosts, getPage, getDailyNotes, getPostBlocks } from './notion-api'

// 获取首页文章列表
export async function fetchPosts(databaseId) {
  const database = await getAllPosts(databaseId)
  return database.results
    .map((page) => ({
      id: page.id,
      title: page.properties?.Title?.title[0]?.plain_text || 'Untitled',
      date: page.properties?.Date?.date?.start,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

// 获取日历视图数据
export async function fetchCalendarNotes(databaseId) {
  return await getDailyNotes(databaseId)
}

// 获取文章块
export async function fetchPostBlocks(pageId) {
  return await getPostBlocks(pageId)
}

// 获取单篇文章
export async function fetchPage(pageId) {
  return await getPage(pageId)
}
