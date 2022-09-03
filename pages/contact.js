import Head from "next/head";
import { Fragment } from "react";

import NewMessage from "../components/new-message/new-message";

function ContactPage() { 
  return <Fragment>
    <Head>
      <title>Contact Page</title>
      <meta name='description' content='Contact me here!' />
    </Head>
    <NewMessage />
  </Fragment>;
}

export default ContactPage;
