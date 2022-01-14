import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import { fetchAPIAuth, getPosts } from '../../lib/api';

export default function Blog({ posts }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);


    useEffect(async function () {
        setUser(await fetchAPIAuth("/user/me", getCookie('jwt')))
          setRole(await fetchAPIAuth("/user/role", getCookie('jwt')))
      }, []);

    return (
        <Layout user={user} role={role}>
            <Seo title="Blog" description="Bienvenue sur le blog du Devinci FabLab !" />
            <div className=''>

                <img src="/photo/P1000167.jpg" className='w-full aspect-3 md:aspect-5 object-cover' />
                <div className='px-10'>
                    <h2 className="relative text-3xl md:text-4xl font-extrabold text-center py-10">
                        Le blog du {" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-blue-400 animate-gradient-x"> DeVinci FabLab </span>!
                    </h2>

                    <div className='mb-10 -mt-5 border-gray-300 border-b-2 py-10'>
                        <Link href={"/blog/" + posts[0].slug}>
                            <div className='relative grid grid-cols-1 lg:grid-cols-2 md:gap-12 max-w-4xl m-auto cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'>
                                <img src={posts[0].feature_image || '/logo.png'} alt="Image blog" className="rounded-lg" />
                                <div className="flex flex-col">
                                    <div className='flex space-x-3 py-5 md:py-0 md:mb-3'>
                                        <img src={posts[0].authors[0].profile_image || '/logo_square.png'} className='w-10 h-10 rounded-full' />
                                        <div>
                                            <p className='font-medium -mb-1'>{posts[0].authors[0].name}</p>
                                            <p className='text-sm text-gray-400'><Moment format="Do MMM YYYY à HH:mm" locale="fr">{posts[0].created_at}</Moment> · {posts[0].reading_time} min</p>
                                        </div>

                                    </div>
                                    <h4 className="font-bold text-lg sm:text-xl mb-4 grow-0">
                                        <a className="leading-7 text-gray-800 hover:text-gray-600">{posts[0].title}</a>
                                    </h4>
                                    <p className='font-light text-gray-400'>{posts[0].excerpt}</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className='relative grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-4xl m-auto'>

                        {posts.slice(1).map(post => (
                            <Link href={"/blog/" + post.slug}>
                                <div className="flex flex-col cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
                                    <a className="block relative group rounded overflow-hidden">
                                        <img src={post.feature_image || '/logo.png'} alt="Image blog" className="rounded-lg" />
                                    </a>
                                    <div className='flex space-x-3 py-3'>
                                        <img src={post.authors[0].profile_image || '/logo_square.png'} className='w-10 h-10 rounded-full' />
                                        <div>
                                            <p className='font-medium -mb-1'>{post.authors[0].name}</p>
                                            <p className='text-sm text-gray-400'><Moment format="Do MMM YYYY à HH:mm" locale="fr">{post.created_at}</Moment> · {post.reading_time} min</p>
                                        </div>

                                    </div>
                                    <h4 className="font-bold text-lg sm:text-xl mb-4 grow">
                                        <a className="leading-7 text-gray-800 hover:text-gray-600">{post.title}</a>
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const posts = await getPosts()

    if (!posts) {
        return {
            notFound: true,
        }
    }

    return {
        props: { posts }
    }
}
