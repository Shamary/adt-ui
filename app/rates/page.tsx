import Rates from "@/components/Rates";
import { getRates } from "@/lib/api/rates";

const RatesPage = async () => {
    const rates = await getRates(); // Fetch data inside the component
    return (
        <>
            <section id="rates" className="pt-36 md:pt-40 lg:pt-40">
                <Rates rates={rates}></Rates>
            </section>
        </>
    );
};

export default RatesPage;