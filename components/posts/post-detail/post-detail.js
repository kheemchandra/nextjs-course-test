import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import cpp from 'react-syntax-highlighter/dist/cjs/languages/prism/cpp'

import classes from "./post-detail.module.css";


SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('cpp', cpp);

function PostDetail(props) {
  const { title, slug, image, content } = props;

  const imgSrc = `/images/posts/${slug}/${image}`;

  const renderers = {
    p(paragraph) {
      const { node, children } = paragraph;
      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        const { src, alt } = image.properties;
        return (
          <div className={classes.image}>
            <Image
              src={`/images/site/${src}`}
              alt={alt} 
              width={500}
              height={300}
            />
          </div>
        );
      } else {
        return <p>{children}</p>;
      }
    },
    code(code) {
      const { className, children } = code;  
      if(className){
        const lang = className.split("-")[1];      
        return (
          <SyntaxHighlighter
            className={classes['code-block']}
            language={lang}
            style={oneDark}  
          >
            {children}
          </SyntaxHighlighter>
        );
      }

      return ( 
          <code className={classes.code}>{children}</code> 
      )
    },
  };

  return (
    <div className={classes.post}>
      <section className={classes["post-head"]}>
        <h1>{title}</h1> 
          <Image src={imgSrc} alt={title} width={200} height={150} /> 
      </section>
      <section className={classes["post-detail"]}>
        <ReactMarkdown components={renderers}>{content}</ReactMarkdown>
      </section>
    </div>
  );
}

export default PostDetail;
