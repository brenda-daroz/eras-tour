import BigUseClient from "@/pages/components/BigUseClient";
import { fazTudo } from "@/pages/api/setlist";

export default function Page({ data }) {

  console.log("PAGEJS", data)

  return (
    <>
      <BigUseClient data={data} />
    </>
  );
}

export const getServerSideProps = async () => {
  const data = await fazTudo()
  console.log("SERVERSIDE", data)
  return { props: { data } }
}
