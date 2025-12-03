import CalendarView from '@/components/CalendarView'
import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts, getDailyNotes } from '@/lib/server/notion-api' // <- 新增获取 dailyNotes
import { useConfig } from '@/lib/config'
import { clientConfig } from '@/lib/server/config'

export async function getStaticProps() {
  // 获取所有文章（不包含子页面）
  const posts = await getAllPosts({ includePages: false })

  // 获取每日笔记
  const dailyNotes = await getDailyNotes()

  // 首页显示的文章数量
  const postsToShow = posts.slice(0, clientConfig.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > clientConfig.postsPerPage

  return {
    props: { posts, dailyNotes, postsToShow, showNext },
    revalidate: 60 // 每 60 秒重新生成页面
  }
}

export default function Blog({ posts, dailyNotes, postsToShow, showNext }) {
  const { title, description } = useConfig()

  return (
    <Container title={title} description={description}>
      {/* 日历组件，传入文章和每日笔记 */}
      <CalendarView posts={posts} dailyNotes={dailyNotes} />

      {/* 文章列表 */}
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}

      {/* 分页 */}
      {showNext && <Pagination page={1} showNext={showNext} />}
    </Container>
  )
}
