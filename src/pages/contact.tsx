import Head from "next/head";
import React from "react";

import Stores from "../components/stores";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contacto</title>
        <meta name="description" content="Contacto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stores />
    </>
  );
}
