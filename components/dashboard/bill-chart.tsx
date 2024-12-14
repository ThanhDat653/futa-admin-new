"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {useEffect, useState} from "react";
import {ChartData} from "@/models/dashboard";
import {getChartData, RequestBody} from "@/service/dashboard";
import {Loader, SlidersHorizontal} from "lucide-react";
import {formatVND} from "@/lib/utils";


const chartConfig = {
    revenue: {
        label: "Doanh thu",
        color: "hsl(var(--chart-1))",
    },
    bills: {
        label: "Số  bán được",
        color: "hsl(var(--chart-2))",

    }
} satisfies ChartConfig

function formatMonth(monthNumber: number): string {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[monthNumber - 1] || "Invalid Month";
}


export function BillChart() {

    const [data, setData] = useState<ChartData | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const requestBody: RequestBody = {
                year: 2024,
                time: 2024,
                type: "YEAR",
                typeChart: "MONTH",
            };
            try {
                const data = await getChartData(requestBody);
                setData(data)
            } catch (error) {
                console.error("Error:", error);
            }
        }
        fetchData()
    }, []);


    return (
        data ?
        <div className="space-y-5">
            <Card>
                <CardHeader>
                    <div className="flex justify-between">
                        <div>
                            <CardTitle className="text-lg">Tổng doanh thu: {formatVND(data?.revenue)}</CardTitle>
                            <CardDescription>Revenue in {data?.time}</CardDescription>
                        </div>
                        <SlidersHorizontal className="mt-1 cursor-pointer"/>
                    </div>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <LineChart
                            accessibilityLayer
                            data={data?.billChart.map(item => ({ month: formatMonth(item.time), revenue: item.revenue, bills: item.numberOfBill }))}
                            margin={{
                                top: 20,
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Line
                                dataKey="revenue"
                                type="bump"
                                stroke="var(--color-revenue)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-revenue)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Line>

                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex justify-between">
                        <div>
                            <CardTitle className="text-lg">Tổng hóa đơn</CardTitle>
                            <CardDescription>Sum of bills in {data?.time}</CardDescription>
                        </div>
                        <SlidersHorizontal className="mt-1 cursor-pointer"/>
                    </div>

                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <LineChart
                            accessibilityLayer
                            data={data?.billChart.map(item => ({
                                month: formatMonth(item.time),
                                revenue: item.revenue,
                                bills: item.numberOfBill
                            }))}
                            margin={{
                                top: 20,
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Line
                                dataKey="bills"
                                type="bump"
                                stroke="var(--color-bills)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-bills)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Line>
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div> : <Loader className="w-full" />
    )
}
