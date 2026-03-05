import Chart from "react-apexcharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface RevenueChartProps {
  data: number[];
  labels: string[];
}

export function RevenueChart({ data, labels }: RevenueChartProps) {
  const [period, setPeriod] = useState("7");

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      background: "transparent",
    },
    theme: {
      mode: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: labels,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => val.toLocaleString() + " ₫",
      },
    },
    grid: {
      borderColor: "hsl(var(--border))",
      strokeDashArray: 4,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100],
      },
    },
    colors: ["#3B82F6"],
    tooltip: {
      theme: "dark",
    },
  };

  const series = [
    {
      name: "Doanh thu",
      data: data,
    },
  ];

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Doanh thu theo thời gian
        </CardTitle>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn khoảng thời gian" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 ngày qua</SelectItem>
            <SelectItem value="30">Tháng này</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        <Chart
          options={chartOptions}
          series={series}
          type="area"
          height={300}
        />
      </CardContent>
    </Card>
  );
}
