import CalendarView from '@/components/CalendarView'
import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts, getDailyNotes } from '@/lib/server/notion-functions'
import { useConfig } from '@/lib/config'
import { clientConfig } from '@/lib/server/config'

export async function getStaticProps() {
  const posts = await getAllPosts()
  const dailyNotes = await getDailyNotes()

  const postsToShow = posts.slice(0, clientConfig.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > clientConfig.postsPerPage

  return {
    props: { posts, postsToShow, showNext, dailyNotes },
    revalidate: 60
  }
}

export default function Blog({ posts, postsToShow, showNext, dailyNotes }) {
  const { title, description } = useConfig()

  return (
    <Container title={title} description={description}>
      {/* 日历组件 */}
      <CalendarView posts={posts} dailyNotes={dailyNotes} />

      {/* 文章列表 */}
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}

      {showNext && <Pagination page={1} showNext={showNext} />}
    </Container>
  )
}
