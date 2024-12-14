import {ChartData, IScheduleGroupByRegion} from "@/models/dashboard";
import {notFound} from "next/navigation";
import {END_POINTS} from "@/constants/endpoint";
import Cookies from 'js-cookie';


export async function getPopularTrips(): Promise<IScheduleGroupByRegion[]> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_FUTA_API_URL}/${END_POINTS.DASHBOARD.POPULAR_TRIP}`
        )
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`)
        }
        const popular: IScheduleGroupByRegion[] = await res.json()
        if (!popular || popular.length === 0) {
            notFound()
        }
        return popular
    } catch (error) {
        console.error('Failed to fetch popular trips:', error)
        throw error
    }
}

export interface RequestBody {
    year: number;
    time: number;
    type: string;
    typeChart: string;
}
export async function getChartData(body: RequestBody): Promise<ChartData> {
    const token = Cookies.get("access_token")
    const url = `${process.env.NEXT_PUBLIC_FUTA_API_URL}/${END_POINTS.DASHBOARD.CHART}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}