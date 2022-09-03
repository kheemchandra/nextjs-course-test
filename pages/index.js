import { Fragment } from "react";
import Head from "next/head";

import Hero from "../components/hero/hero";
import PostList from "../components/posts/post-list";

import { getFeaturedFiles } from "../helpers/utils";

function HomePage(props) {
  const { posts } = props; 

  return <Fragment>
    <Head>
      <title>Kheem's Blog</title>
      <meta name='description' content="I post about programming specially about web development."/>
    </Head>
    <Hero />
    <PostList title='Featured Posts' posts={posts}/>
  </Fragment>
}

export async function getStaticProps(){
  const featuredPosts = getFeaturedFiles();
  return {
    props: { 
      posts: featuredPosts
    },
    revalidate: 600
  }
}

export default HomePage;