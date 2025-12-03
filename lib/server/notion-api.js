import { NotionAPI } from 'notion-client'

const notion = new NotionAPI({
  authToken: process.env.NOTION_ACCESS_TOKEN
})

// 下面是原本的函数
export async function getAllPosts() {
  // ...这里写 getAllPosts 的逻辑，直接用 notion 实例
}

export async function getDailyNotes() {
  // ...这里写 getDailyNotes 的逻辑
}

export async function getPostBlocks(id) {
  // ...这里写 getPostBlocks 的逻辑
}

// 如果有 getPageProperties 也一起 export
export async function getPageProperties(id) {
  // ...
}
