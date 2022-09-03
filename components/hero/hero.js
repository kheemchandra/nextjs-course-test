import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
  return <section className={classes.hero}>
    <div className={classes.image}>
      <Image src='/images/site/kheem.png' alt="This is Kheem's photo" width={500} height={300}/>
    </div>
    <div className={classes.about}>
      <h1>Hi, I'm Kheem</h1>
      <p>I blog about web development - especially frontend frameworks like Angular or React.</p>
    </div>
  </section>
}

export default Hero;