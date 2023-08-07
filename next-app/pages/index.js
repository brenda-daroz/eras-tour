import BigUseClient from "@/components/BigUseClient";
// import getTourDates from "@/lib/getTourDates";
import { fazTudo } from "@/lib/setlist";
import Head from "next/head";
import Script from 'next/script'

console.log("msg especifica")


export default function Page({ data }) {

  const kofi =
    `<script>
    kofiWidgetOverlay.draw('brendadaroz', {
    'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Support me',
    'floating-chat.donateButton.background-color': '#ff38b8',
    'floating-chat.donateButton.text-color': '#fff'
    });
  </script>`

  return (

    <>
      <Head>
        {/* HTML Meta Tags */}
        <title>The Eras Tour - Surprise Songs Tracker</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="description" content="Taylor Swift - The Eras Tour Surprise Songs Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://erastour.live" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Eras Tour" />
        <meta property="og:description" content="The Eras Tour - Surprise songs tracker" />
        <meta property="og:image"
          content="https://res.cloudinary.com/dkminbfry/image/upload/v1688043299/Group_1_4_nzic5f.png" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="erastour.live" />
        <meta property="twitter:url" content="https://erastour.live" />
        <meta name="twitter:title" content="Eras Tour" />
        <meta name="twitter:description" content="The Eras Tour - Surprise songs tracker" />
        <meta name="twitter:image" content="https://res.cloudinary.com/dkminbfry/image/upload/v1688041171/Group_2_ald1rg.png" />

      </Head>

      {/* Kofi */}
      <script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></script>

      {/* Plausible */}
      <Script defer data-domain="erastour.live" src="https://plausible.io/js/script.js"></Script>

      {/* Google tag (gtag.js) */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-93V6BZEDW5"/>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());

          gtag('config', 'G-93V6BZEDW5');
        `}
      </Script>

      <div dangerouslySetInnerHTML={{ __html: kofi }}></div>
      <BigUseClient data={data} />
    </>
  );
}

export const getServerSideProps = async () => {
  const data = await fazTudo()
  // const tourDates = await getTourDates("tourDatesInternational.html")
  // console.log(tourDates)
  return { props: { data } }
}
