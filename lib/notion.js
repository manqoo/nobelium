export { getAllPosts } from './notion/getAllPosts'
export { getAllTagsFromPosts } from './notion/getAllTagsFromPosts'
export { getPostBlocks } from './notion/getPostBlocks'
export async function getDailyNotes() {
  const databaseId = process.env.NOTION_DAILYNOTES_ID
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: 'Date', direction: 'ascending' }]
  })
  return response.results.map(page => ({
    id: page.id,
    date: page.properties.Date.date.start,
    text: page.properties.Text.rich_text[0]?.plain_text || ''
  }))
}
