import "tailwindcss/tailwind.css";
import App from "next/app";
import Head from "next/head";
import { createContext } from "react";
import { fetchAPI, fetchAPIAuth, parseCookies } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import 'react-markdown-editor-lite/lib/index.css';
import 'moment/locale/fr'
import '../styles/global.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Seo from "../components/seo";


//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Seo title={"Accueil"} description={"Bienvenue sur le site du Devinci FabLab !"}/>
        <Component {...pageProps}>
        </Component>
        <ToastContainer />
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  const global = [];
  return { ...appProps, pageProps: { global } };
};

export default MyApp;
