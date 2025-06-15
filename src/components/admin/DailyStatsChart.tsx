
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";

type DailyStat = {
    day: string;
    total_orders: number;
    completed_orders: number;
    revenue: number;
};

interface DailyStatsChartProps {
    data: DailyStat[];
}

const chartConfig = {
  total_orders: {
    label: "Total Orders",
    color: "hsl(var(--chart-1))",
  },
  completed_orders: {
    label: "Completed Orders",
    color: "hsl(var(--chart-2))",
  },
  revenue: {
      label: "Revenue ($)",
      color: "hsl(var(--chart-3))",
  }
}

export const DailyStatsChart = ({ data }: DailyStatsChartProps) => {
    const formattedData = data.map(item => ({
        ...item,
        day: format(parseISO(item.day), "MMM d"),
        revenue: item.revenue / 100, // convert from cents
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Analytics</CardTitle>
                <CardDescription>Total orders, completed orders, and revenue over the selected period.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <LineChart data={formattedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis yAxisId="left" stroke="hsl(var(--chart-1))" />
                        <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-3))" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line yAxisId="left" dataKey="total_orders" type="monotone" stroke="var(--color-total_orders)" strokeWidth={2} dot={false} />
                        <Line yAxisId="left" dataKey="completed_orders" type="monotone" stroke="var(--color-completed_orders)" strokeWidth={2} dot={false} />
                        <Line yAxisId="right" dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
