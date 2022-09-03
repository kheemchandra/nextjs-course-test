import Image from "next/image";
import Link from "next/link";

import classes from "./post-item.module.css";

function PostItem(props) {
  const { title, date, excerpt, image, slug } = props;

  const imagePath = `/images/posts/${slug}/${image}`;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <li className={classes.post}>
      <Link href={`/posts/${slug}`}>
        <a>
          <div className={classes.image}>
            <Image
              src={imagePath}
              alt={title}
              width={300}
              height={200}
              layout="responsive"
            />
          </div>
          <div className={classes.summary}>
            <h3 className={classes.title}>{title}</h3>
            <div>
              <time className={classes.time}>{formattedDate}</time>
            </div>
            <p className={classes.excerpt}>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default PostItem;
