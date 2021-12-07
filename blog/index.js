import BlogPreview from '../../components/blogpreview'
import Navbar from '../../components/navbar'
import { fetchAPI } from "../../lib/api"
import { getStrapiMedia } from "../../lib/media"

export default function Home({ articles }) {
  return (
    <div>
    <Navbar />

    <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="my-5 text-4xl font-bold font-heading text-indigo-500">Bienvenue sur notre blog !</h2>
            <p className="text-lg text-gray-500">Retrouvez toutes nos actualités et nos tutos par les membres du Devinci FabLab.</p>
          </div>
          <div className="flex flex-wrap -m-4 mb-16">
            {articles.map(r=>{
              return <BlogPreview blurHash={r.image.blurHash} categorie={r.category.name} banner={getStrapiMedia(r.image)} title={r.title} date={r.published_at} description={r.description} slug={r.slug} author={r.author.name} readingTime={Math.ceil(r.content.split(" ").length/200)}/>
            })}
          </div>
        </div>
            </div>
    </div>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories, homepage] = await Promise.all([
    fetchAPI("/articles"),
    fetchAPI("/categories"),
    fetchAPI("/homepage"),
  ])

  return {
    props: { articles, categories, homepage },
    revalidate: 1,
  }
}