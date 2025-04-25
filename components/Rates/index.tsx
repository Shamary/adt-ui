import { Rate } from "@/lib/types";
import React from "react";

interface RatesProps {
    rates: Rate[];
}

const Rates: React.FC<RatesProps> = ({ rates }) => {
    console.log("Rates received:", rates); // Debugging log

    if (!rates || rates.length === 0) {
        return <p className="text-red-500 text-center">No rates available</p>;
    }

    return (
        <div className="overflow-x-auto">
  {/* Title centered above the table */}
  
  <h2 className="text-4xl font-semibold text-center mb-2">
  Rates
  <span className="ml-3 bg-green-500 text-white text-xl px-3 py-1 rounded-md align-middle">
    Delivery Included
  </span>
</h2>
  
  <div className="w-full max-w-[85%] mx-auto">
  <table className="w-full border-none">
      <thead>
        <tr className="bg-blue-800 text-white text-left">
          <th className="px-4 py-2">Packages (lb)</th>
          <th className="px-4 py-2">Price (USD)</th>
          <th className="px-4 py-2">Price (JMD)</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rate, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-100 text-black" : "bg-white text-black"}>
            <td className="px-4 py-2 border">{rate.weight}</td>
            <td className="px-4 py-2 border">${rate.price}</td>
            <td className="px-4 py-2 border">${rate.priceLocal} JMD</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <p className="text-center text-white text-xl mb-2">
  <small className="text-center text-sm text-gray-400 italic">
  *Delivery included for Kingston, St. Andrew, Portmore & Spanish Town
</small>
</p>
</div>

    );
};

export default Rates;
