import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import Rates from "@/components/Rates";
import { getRates } from "@/lib/api/rates";

export default async function Home() { // Make the component async
  const rates = await getRates(); // Fetch data inside the component

  return (
    <>
      <ScrollUp />
      <Hero />
      <Rates rates={rates} /> {/* Pass rates to the Rates component */}
      {/* <Features /> */}
    </>
  );
}
