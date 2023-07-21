import BigUseClient from "@/components/BigUseClient";
// import getTourDates from "@/lib/getTourDates";
import { fazTudo } from "@/lib/setlist";
import Head from "next/head";

console.log("msg especifica")


export default function Page({ data }) {

  const kofi =
    `<script>
    kofiWidgetOverlay.draw('pixelbakery', {
    'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Support me',
    'floating-chat.donateButton.background-color': '#ff38b8',
    'floating-chat.donateButton.text-color': '#fff'
    });
  </script>`

  return (

    <>
      <Head>
        <title>The Eras Tour</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Taylor Swift - The Eras Tour Surprise Songs Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://eras-tour.brenda.fyi" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Eras Tour" />
        <meta property="og:description" content="The Eras Tour - Surprise songs tracker" />
        <meta property="og:image"
          content="https://res.cloudinary.com/dkminbfry/image/upload/v1688043299/Group_1_4_nzic5f.png" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="eras-tour.brenda.fyi" />
        <meta property="twitter:url" content="https://eras-tour.brenda.fyi" />
        <meta name="twitter:title" content="Eras Tour" />
        <meta name="twitter:description" content="The Eras Tour - Surprise songs tracker" />
        <meta name="twitter:image" content="https://res.cloudinary.com/dkminbfry/image/upload/v1688041171/Group_2_ald1rg.png" />

        {/* Kofi */}
        <script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js' />
      </Head>
      <BigUseClient data={data} />
      <div dangerouslySetInnerHTML={{ __html: kofi }}></div>
    </>
  );
}

export const getServerSideProps = async () => {
  const data = await fazTudo()
  // const tourDates = await getTourDates("tourDatesInternational.html")
  // console.log(tourDates)
  return { props: { data } }
}
