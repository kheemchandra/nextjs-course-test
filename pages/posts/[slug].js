import Head from 'next/head';

import { getFileList, getFileData } from "../../helpers/utils";

import PostDetail from "../../components/posts/post-detail/post-detail";
import { Fragment } from 'react';

function DetailPostPage(props) { 
  const { title, slug, image, content } = props.post;

  return <Fragment>
    <Head>
      <title>{title}</title>
      <meta name='description' content={title}/>
    </Head>
    <PostDetail title={title} slug={slug} image={image} content={content} />
  </Fragment>

}

export async function getStaticProps(context){
  const { params } = context;
  const slug = params.slug; 
  const {content, image, title} = getFileData(slug); 
  return {
    props: {
      post: {
        content,
        slug,
        image,
        title
      }
    },
    revalidate: 250
  }
}

export async function getStaticPaths(){
  const files = getFileList();
  return {
    paths: files.map(file => {
      return { params: {
        slug: file.replace(/\.md$/, '')
      } }
    }),
    fallback: false
  }
}

export default DetailPostPage;