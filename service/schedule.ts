import {TransportData} from "@/models/schedule";
import {END_POINTS} from "@/constants/endpoint";
import {cookies} from "next/headers";

export async function fetchTransportData(): Promise<TransportData[]> {
    const url = `${process.env.NEXT_PUBLIC_FUTA_API_URL}/${END_POINTS.SCHEDULE.ALL}`;
    const token = cookies().get("access_token")?.value;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch transport data: ${response.statusText}`);
        }
        const result = await response.json()
        return result.data
    } catch (error) {
        console.error("Error fetching transport data:", error);
        throw error;
    }
}
