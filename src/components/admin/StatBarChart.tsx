
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
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
    dataKeys: string[];
    colors: string[];
    tickFormatter?: (value: number) => string;
}

export const StatBarChart = ({ title, description, data, dataKeys, colors, tickFormatter }: StatBarChartProps) => {
    const formattedData = data.map(item => ({
        ...item,
        day: format(parseISO(item.day), "MMM d"),
    }));

    const chartConfig = dataKeys.reduce((config, key, index) => {
        config[key] = {
            label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            color: colors[index],
        };
        return config;
    }, {} as any);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={formattedData} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <YAxis tickFormatter={tickFormatter} />
                            <Tooltip
                                cursor={false}
                                content={<ChartTooltipContent
                                    labelClassName="text-sm"
                                    indicator="dot"
                                />}
                            />
                            <Legend />
                            {dataKeys.map((key, index) => (
                                <Bar key={key} dataKey={key} fill={colors[index]} radius={4} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
