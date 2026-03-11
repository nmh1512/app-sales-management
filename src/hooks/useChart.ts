import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";

export type ChartType = "bar" | "area" | "line";

interface UseChartProps {
  type?: ChartType;
  data: { label: string; value: number }[];
  seriesName: string;
  horizontal?: boolean;
  height?: number | string;
  colors?: string[];
  valueFormatter?: (val: number) => string;
}

export function useChart({
  type = "bar",
  data,
  seriesName,
  horizontal = false,
  colors,
  valueFormatter = (val) => val.toLocaleString("vi-VN") + " VNĐ",
}: UseChartProps) {
  const chartOptions: ApexOptions = useMemo(() => {
    const defaultColors = [
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#a855f7",
      "#ec4899",
      "#6366f1",
      "#14b8a6",
      "#f97316",
      "#06b6d4",
    ];

    const options: ApexOptions = {
      chart: {
        type: type,
        toolbar: { show: false },
        fontFamily: "inherit",
        background: "transparent",
      },
      colors: colors || defaultColors,
      grid: {
        borderColor: "hsl(var(--border))",
        strokeDashArray: 4,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 10,
        },
      },
      dataLabels: {
        enabled: type === "bar",
        formatter: (val: number) => valueFormatter(val),
        style: {
          fontSize: "12px",
          colors: ["#fff"],
          fontWeight: 600,
        },
      },
      stroke: {
        curve: "smooth",
        width: type === "bar" ? 0 : 2,
      },
      xaxis: {
        categories: data.map((item) => item.label),
        labels: {
          style: {
            fontSize: "10px",
            colors: "hsl(var(--muted-foreground))",
          },
          formatter: (val) => {
            const num = Number(val);
            if (num >= 1000000) return (num / 1000000).toString() + "tr";
            if (num >= 1000) return (num / 1000).toString() + "k";
            return val.toString();
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "11px",
            fontWeight: 500,
            colors: "hsl(var(--foreground))",
          },
          formatter: (val) => (type !== "bar" ? valueFormatter(val) : val.toString()),
        },
      },
      tooltip: {
        theme: "light",
        y: {
          formatter: (val) => valueFormatter(val),
        },
      },
    };

    if (type === "bar") {
      options.plotOptions = {
        bar: {
          horizontal: horizontal,
          distributed: true,
          barHeight: "60%",
          borderRadius: 4,
          dataLabels: {
            position: horizontal ? "center" : "top",
          },
        },
      };
    }

    if (type === "area") {
      options.fill = {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100],
        },
      };
    }

    return options;
  }, [type, data, horizontal, colors, valueFormatter]);

  const series = useMemo(
    () => [
      {
        name: seriesName,
        data: data.map((item) => item.value),
      },
    ],
    [data, seriesName],
  );

  return { chartOptions, series };
}
