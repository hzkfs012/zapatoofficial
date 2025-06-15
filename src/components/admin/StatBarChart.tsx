
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";

type DailyStat = {
    day: string;
    [key: string]: any;
};

interface StatBarChartProps {
    title: string;
    description: string;
    data: DailyStat[];
    dataKey: string;
    color: string;
    tickFormatter?: (value: number) => string;
}

export const StatBarChart = ({ title, description, data, dataKey, color, tickFormatter }: StatBarChartProps) => {
    const formattedData = data.map(item => ({
        ...item,
        day: format(parseISO(item.day), "MMM d"),
    }));

    const chartConfig = {
        [dataKey]: {
            label: title,
            color: color,
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart data={formattedData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis tickFormatter={tickFormatter} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent
                                labelClassName="text-sm"
                                indicator="dot"
                            />}
                        />
                        <Bar dataKey={dataKey} fill={`var(--color-${dataKey})`} radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
