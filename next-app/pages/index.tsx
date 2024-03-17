import React from "react";
import { UIDataOutput } from "@/lib/logic";
import { fazTudo } from "@/lib/setlist";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Script from "next/script";
import IndexPage from "@/components/IndexPage";

export default function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const kofi = `<Script>
    kofiWidgetOverlay.draw('brendadaroz', {
    'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Support me',
    'floating-chat.donateButton.background-color': '#ff38b8',
    'floating-chat.donateButton.text-color': '#fff'
    });
  </script>`;

  return (
    <>
      <Head>
        {/* HTML Meta Tags */}
        <title>The Eras Tour - Surprise Songs Tracker</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Taylor Swift - The Eras Tour Surprise Songs Tracker"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://erastour.live" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Eras Tour" />
        <meta
          property="og:description"
          content="The Eras Tour - Surprise songs tracker"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dkminbfry/image/upload/v1688043299/Group_1_4_nzic5f.png"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="erastour.live" />
        <meta property="twitter:url" content="https://erastour.live" />
        <meta name="twitter:title" content="Eras Tour" />
        <meta
          name="twitter:description"
          content="The Eras Tour - Surprise songs tracker"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dkminbfry/image/upload/v1688041171/Group_2_ald1rg.png"
        />

        <meta
          name="google-site-verification"
          content="1xvZejr7rmGf8emfOH2FHoj74Ps2xx359lbkUzU7W5g"
        />
      </Head>

      {/* Kofi */}
      <Script src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js" />

      {/* Plausible */}
      <Script
        defer
        data-domain="erastour.live"
        src="https://plausible.io/js/script.js"
      />

      {/* Google tag (gtag.js) */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-93V6BZEDW5" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());

          gtag('config', 'G-93V6BZEDW5');
        `}
      </Script>

      <div dangerouslySetInnerHTML={{ __html: kofi }}></div>
      <IndexPage data={data} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: { data2023: UIDataOutput; data2024: UIDataOutput; data: UIDataOutput };
}> = async () => {
  const data2023 = await fazTudo(2023);
  const data2024 = await fazTudo(2024);
  const data = await fazTudo();

  return { props: { data: { data2023, data2024, data } } };
};
