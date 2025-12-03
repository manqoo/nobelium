// lib/server/notion-api.js
import { NotionAPI } from 'notion-client'

export const notion = new NotionAPI({
  authToken: process.env.NOTION_ACCESS_TOKEN
})
