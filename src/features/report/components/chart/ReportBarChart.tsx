import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx";
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts";
import {ReportBarChartType} from "@/features/report/reportTypes.ts";

type Props = {
  element: ReportBarChartType,
}

export function ReportBarChart({element}: Props) {
  return (
    <ChartContainer config={element.chartConfig} className="min-h-[200px] max-w-[50%]">
      <BarChart accessibilityLayer data={element.chartData}>
        <CartesianGrid vertical={element.verticalGrid} horizontal={element.verticalGrid} spacing={element.gridSpacing}/>
        <XAxis
          dataKey={element.xAxis.dataKey}
          tickLine={element.xAxis.tickLine}
          tickMargin={element.xAxis.tickMargin}
          axisLine={element.xAxis.axisLine}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        {
          Object.keys(element.chartConfig).map((key: string) => {
            return (<Bar dataKey={key} fill={`var(--color-${key})`} radius={4} />)
          })
        }
      </BarChart>
    </ChartContainer>
  );
}