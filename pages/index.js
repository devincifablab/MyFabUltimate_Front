import router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { fetchAPI, fetchAPIAuth, parseCookies } from "../lib/api";

const Home = ({ homepage, user }) => {
  const router = useRouter();
  useEffect(function () {
    if(user.flags == null || user.flags.filter(r=> r.name == "Superviseur").length < 1){

    //router.push('/wip')
    }
}, []);
  /*if(user.flags == null || user.flags.filter(r=> r.name == "Superviseur").length < 1){
  return('')
  }else{*/
    return (
      <Layout user={user}>
        <Seo seo={homepage.seo} />
        <div className="container xl:max-w-7xl mx-auto px-4 mt-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Bienvenue sur le site du{" "}
              <span className="text-indigo-600"> DeVinci FabLab !</span>
            </h2>
            <h3 className="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600 lg:w-2/3 mx-auto">
              Le FabLab est un lieu d'échange et de création du pôle universitaire
              Léonard de Vinci. Que vous soyez étudiant ou non, venez découvrir
              nos créations, articles et tutos !
            </h3>
          </div>
  
          <video
            width="640"
            height="360"
            controls={false}
            autoPlay="autoplay"
            muted
            loop={true}
            className="mt-5 rounded-lg mx-auto shadow-lg"
          >
            <source src="video/banner.mp4" type="video/mp4" />
          </video>
        </div>
      </Layout>
    );
  //}
};

export async function getServerSideProps({req}) {
  const cookies = parseCookies(req);
  var user = await fetchAPIAuth("/api/users/me/?populate=*", cookies.jwt);
  const [homepage] = await Promise.all([fetchAPI("/homepage")]);

  return {
    props: { user, homepage }, // will be passed to the page component as props
  }
}

export default Home;
