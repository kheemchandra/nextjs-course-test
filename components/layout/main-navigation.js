import Link from "next/link";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <h1 className={classes.logo}>
          <Link href="/">KHEEM'S NEXT BLOG</Link>
        </h1>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
