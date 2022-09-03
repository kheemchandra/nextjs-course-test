import PostsGrid from "./posts-grid";

import classes from './post-list.module.css';

function PostList(props) {
  return <section className={classes.posts}>
    <h1>{props.title}</h1>
    <PostsGrid posts={props.posts}/>
  </section>
}

export default PostList;