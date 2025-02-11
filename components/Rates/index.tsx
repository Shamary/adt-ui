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
            <h2 className="text-2xl font-semibold text-center mb-20">Rates</h2>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-blue-800 text-white text-left">
                        <th className="px-4 py-2">Packages</th>
                        <th className="px-4 py-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map((rate, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-100 text-white" : "bg-white text-black"}>
                            <td className="px-4 py-2 border">{rate.weight}</td>
                            <td className="px-4 py-2 border">${rate.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Rates;
