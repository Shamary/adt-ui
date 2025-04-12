import { Rate } from "../types";

export async function getRates(): Promise<Rate[]> {
    try {
        // const response = await fetch("https://example.com/api/rates");
        // if (!response.ok) throw new Error("Failed to fetch rates");

        // return await response.json();

        const rates: Rate[] = [
            { weight: "1", price: "5.50", priceLocal: "880.00" },
            { weight: "2", price: "8.50", priceLocal: "1,360.00" },
            { weight: "3", price: "11.50", priceLocal: "1,840.00" },
            { weight: "4", price: "14.00", priceLocal: "2,240.00" },
            { weight: "5", price: "16.00", priceLocal: "2,560.00" },
            { weight: "6", price: "18.50", priceLocal: "2,960.00" },
            { weight: "7", price: "21.00", priceLocal: "3,360.00" },
            { weight: "8", price: "23.50", priceLocal: "3,760.00" },
            { weight: "9", price: "26.00", priceLocal: "4,160.00" },
            { weight: "10", price: "28.50", priceLocal: "4,560.00" },
            { weight: "11", price: "28.50", priceLocal: "4,560.00" },
            { weight: "12", price: "31.00", priceLocal: "4,960.00" },
            { weight: "13", price: "33.50", priceLocal: "5,360.00" },
            { weight: "14", price: "36.00", priceLocal: "5,760.00" },
            { weight: "15", price: "38.50", priceLocal: "6,160.00" },
            { weight: "16", price: "41.00", priceLocal: "6,560.00" },
            { weight: "17", price: "43.50", priceLocal: "6,960.00" },
            { weight: "18", price: "46.00", priceLocal: "7,360.00" },
            { weight: "19", price: "48.50", priceLocal: "7,760.00" },
            { weight: "20", price: "55.00", priceLocal: "8,800.00" },
            { weight: "21", price: "58.00", priceLocal: "9,280.00" },
            { weight: "22", price: "60.50", priceLocal: "9,680.00" },
            { weight: "23", price: "63.00", priceLocal: "10,080.00" },
            { weight: "24", price: "65.50", priceLocal: "10,480.00" },
            { weight: "25", price: "68.00", priceLocal: "10,880.00" }
        ];

        return rates;
    } catch (error) {
        console.error("Error fetching rates:", error);
        return [];
    }
}
