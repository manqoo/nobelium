import { getAllPosts } from '@/lib/server/notion-functions'
import CalendarView from '@/components/CalendarView'
import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { clientConfig } from '@/lib/server/config'

export async function getStaticProps() {
  const posts = await getAllPosts()
  const postsToShow = posts.slice(0, clientConfig.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > clientConfig.postsPerPage

  return {
    props: { posts, postsToShow, showNext },
    revalidate: 60
  }
}

export default function Blog({ posts, postsToShow, showNext }) {
  return (
    <Container title="我的博客" description="博客描述">
      <CalendarView posts={posts} />
      {postsToShow.map(post => <BlogPost key={post.id} post={post} />)}
      {showNext && <Pagination page={1} showNext={showNext} />}
    </Container>
  )
}
