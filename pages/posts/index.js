import Head from "next/head";
import { Fragment } from "react";

import PostList from "../../components/posts/post-list";
import { getAllFiles } from "../../helpers/utils";
 

function AllPostsPage(props) {
  const { posts } = props;
  return <Fragment>
    <Head>
      <title>All Posts</title>
      <meta name='description' content='I blog about web development!' />
    </Head>
    <PostList title='All Posts' posts={posts}/>
  </Fragment>
}

export async function getStaticProps(){
  const allPosts = getAllFiles();
  return {
    props: { 
      posts: allPosts
    },
    revalidate: 3600
  }
}

export default AllPostsPage;