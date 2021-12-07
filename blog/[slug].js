import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import NextImage from "../../components/image";
import Seo from "../../components/seo";
import { getStrapiMedia } from "../../lib/media";
import remarkGfm from "remark-gfm";
import "moment/locale/fr";

const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.image);

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <div className="bg-white">
        <div className="container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8">
          {/* Heading */}
          <div className="text-center">
            <div className="text-sm uppercase font-bold tracking-wider mb-1 text-indigo-700">
              {article.category.name}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              {article.title}
            </h2>
            <h3 className="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600 lg:w-2/3 mx-auto">
              <span className="text-indigo-600 hover:text-indigo-400">
                {article.author.name}
              </span>{" "}
              le{" "}
              <span className="font-semibold">
                <Moment format="Do MMM YYYY HH:MM" locale="fr">
                  {article.published_at}
                </Moment>
              </span>{" "}
              · {Math.ceil(article.content.split(" ").length / 200)} min
            </h3>
          </div>
          {/* Blog Post */}
          <article className="prose prose-indigo prose-lg mx-auto">
            <img src={imageUrl} alt="Thumbnail" className="rounded-lg" />
            <ReactMarkdown
              children={article.content}
              remarkPlugins={[remarkGfm]}
            />
          </article>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles");

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(`/articles?slug=${params.slug}`);
  const categories = await fetchAPI("/categories");

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  };
}

export default Article;
