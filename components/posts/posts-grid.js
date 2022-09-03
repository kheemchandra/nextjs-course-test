import PostItem from "./post-item";

import classes from "./posts-grid.module.css";

function PostsGrid(props) {
  const { posts } = props;
  return (
    <ul className={classes.posts}>
      {posts.map((post) => (
        <PostItem
          key={post.slug}
          title={post.title} 
          date={post.date}
          excerpt={post.excerpt} 
          image={post.image} 
          slug={post.slug}
        />
      ))}
    </ul>
  );
}

export default PostsGrid;
