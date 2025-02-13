import { Rate } from "../types";

export async function getRates(): Promise<Rate[]> {
    try {
        // const response = await fetch("https://example.com/api/rates");
        // if (!response.ok) throw new Error("Failed to fetch rates");

        // return await response.json();

        const rates: Rate[] = [
            { weight: "0.5 lb", price: "5.50" },
            { weight: "1 lb", price: "8.50" },
            { weight: "2 lbs", price: "11.50" },
        ];

        return rates;
    } catch (error) {
        console.error("Error fetching rates:", error);
        return [];
    }
}
