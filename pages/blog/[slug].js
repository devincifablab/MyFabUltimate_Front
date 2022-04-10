import Moment from 'react-moment';
import Layout from '../../components/layout';
import { getSinglePost, getPosts, fetchAPIAuth } from '../../lib/api';
import Seo from '../../components/seo'
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';

// PostPage page component
export default function Article({ post }) {
    // Render post title and content in the page from props
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [animate, setAnimate] = useState(false);
    const [like, setLike] = useState(0);
    const [tag, setTag] = useState('fablab');

    console.log(post);

    useEffect(async function () {
        setUser(await fetchAPIAuth("/user/me", getCookie('jwt')))
        setRole(await fetchAPIAuth("/user/role", getCookie('jwt')))
        const likes = await fetchAPIAuth("/article/" + post.id + "/likes");
        const likeStatus = await fetchAPIAuth("/article/" + post.id + "/likes/update");
        if(likeStatus == false || likeStatus == true){
            setAnimate(likeStatus);
        }
        {/*
            Il faudra faire attention à bien initialiser les likes dans la bdd
        */}
        if (likes.error == null) {
            setLike(likes);
        }
        if(post.tags[0] != null){
            setTag(post.tags[0].name)
        }
    }, []);

    return (
        <Layout user={user} role={role}>
            <Seo title={post.title} description={post.excerpt} image={post.feature_image} />
            <div className='container p-10 max-w-3xl space-y-5 m-auto'>
                <div className='space-y-8'>
                    <div>
                        <span className='uppercase text-sm font-light text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-blue-400 animate-gradient-x'>{tag}</span>
                        <h1 className='w-full text-4xl font-extrabold '>{post.title}</h1>
                    </div>
                    <p className='font-light text-gray-400'>{post.excerpt}</p>
                    <div className='flex space-x-3'>
                        <img src={post.authors[0].profile_image || '/logo_square.png'} className='w-10 h-10 rounded-full' />
                        <div>
                            <p className='font-medium -mb-1'>{post.authors[0].name}</p>
                            <p className='text-sm text-gray-400'><Moment format="Do MMM YYYY à HH:mm" locale="fr">{post.created_at}</Moment> · {post.reading_time} min</p>
                        </div>

                    </div>
                    <img src={post.feature_image} className={post.feature_image?'':'hidden'} />
                </div>

                <div className='w-full m-auto space-y-5 prose' dangerouslySetInnerHTML={{ __html: post.html }} />
                <div className='flex place-items-center'>
                    <div className={`HeartAnimation -ml-10 md:-ml-5 ${animate ? 'animate' : ''}`} onClick={async () => {
                        setAnimate(!animate); animate ? setLike(like
                            - 1) : setLike(like
                                + 1); await axios({method:"POST",url:process.env.API+"/api/article/" + post.id + "/likes/update"});
                    }}></div>
                    <p className={` -ml-7 font-semibold ${animate ? 'text-black' : 'text-gray-500'}`}>{like}</p>
                    <p className='text-gray-500 ml-3'>Avez-vous aimé cet article ?</p>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const resGhost = await getPosts();
    const posts = resGhost ? resGhost : [];

    // Get the paths we want to create based on posts
    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }))

    // { fallback: false } means posts not found should 404.
    return { paths, fallback: false }
}


// Pass the page slug over to the "getSinglePost" function
// In turn passing it to the posts.read() to query the Ghost Content API
export async function getStaticProps(context) {
    const post = await getSinglePost(context.params.slug)

    if (!post) {
        return {
            notFound: true,
        }
    }

    return {
        props: { post }
    }
}