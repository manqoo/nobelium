import { NotionAPI } from 'notion-client'

const notion = new NotionAPI({
  authToken: process.env.NOTION_ACCESS_TOKEN
})

export { notion } // 注意是命名导出
