import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileDown } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import Chart from "react-apexcharts";
import { useChart } from "@/hooks/useChart";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import {
  SalesTable,
  ProfitTable,
  DebtTable,
} from "./components/EmployeeTables";
import type { EmployeeReportData } from "@/types/reports";

const mockEmployees: EmployeeReportData[] = [
  {
    id: "AD000001",
    name: "Admin",
    orderCount: 67,
    revenue: 269252700,
    discount: 0,
    returnAmount: 23631000,
    cost: 218596532.82,
    profit: 50656167.18,
    customerCount: 117,
    debt: 3662820550,
  },
  {
    id: "NV000001",
    name: "Hà Táo LK",
    orderCount: 13,
    revenue: 14322000,
    discount: 0,
    returnAmount: 7938000,
    cost: 10668934.96,
    profit: 3653065.04,
    customerCount: 8,
    debt: 17509000,
  },
];

export default function EmployeeReportPage() {
  const [viewMode, setViewMode] = useState<"chart" | "report">("report");
  const [interest, setInterest] = useState<"sales" | "profit" | "debt">("profit");

  // rerender-derived-state-no-effect: Calculate totals directly
  const totals = useMemo(() => {
    return mockEmployees.reduce(
      (acc, s) => ({
        orderCount: acc.orderCount + s.orderCount,
        revenue: acc.revenue + s.revenue,
        discount: acc.discount + s.discount,
        returnAmount: acc.returnAmount + s.returnAmount,
        cost: acc.cost + s.cost,
        profit: acc.profit + s.profit,
        customerCount: acc.customerCount + s.customerCount,
        debt: acc.debt + s.debt,
      }),
      {
        orderCount: 0,
        revenue: 0,
        discount: 0,
        returnAmount: 0,
        cost: 0,
        profit: 0,
        customerCount: 0,
        debt: 0,
      },
    );
  }, []);

  const titlePrefix = viewMode === "chart" ? "Biểu đồ top 10 nhân viên" : "Báo cáo chi tiết nhân viên";
  const interestLabel = {
    sales: "bán hàng tốt nhất",
    profit: "có lợi nhuận cao nhất",
    debt: "có công nợ cao nhất",
  };
  const title = viewMode === "chart" ? `${titlePrefix} ${interestLabel[interest]}` : titlePrefix;

  // Prepare chart data based on selected interest
  const chartData = useMemo(() => {
    const getValue = (e: EmployeeReportData) => {
      switch (interest) {
        case "sales": return e.revenue;
        case "profit": return e.profit;
        case "debt": return e.debt;
        default: return 0;
      }
    };

    return [...mockEmployees]
      .filter((e) => getValue(e) > 0)
      .sort((a, b) => getValue(b) - getValue(a))
      .slice(0, 10)
      .map((e) => ({ label: e.name, value: getValue(e) }));
  }, [interest]);

  const seriesNameMap = {
    sales: "Doanh thu",
    profit: "Lợi nhuận",
    debt: "Công nợ",
  };

  const { chartOptions, series: chartSeries } = useChart({
    data: chartData,
    seriesName: seriesNameMap[interest],
    horizontal: true,
  });

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Top Filter Section */}
      <div className="flex flex-wrap items-end gap-6 text-sm">
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
            Kiểu hiển thị
          </label>
          <div className="flex bg-muted p-1 rounded-lg">
            <button
              onClick={() => setViewMode("chart")}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-semibold transition-all",
                viewMode === "chart"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Biểu đồ
            </button>
            <button
              onClick={() => setViewMode("report")}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-semibold transition-all",
                viewMode === "report"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Báo cáo
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
            Mối quan tâm
          </label>
          <Select value={interest} onValueChange={(val: any) => setInterest(val)}>
            <SelectTrigger className="w-48 h-9 border-border shadow-none text-sm focus:ring-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Bán hàng</SelectItem>
              <SelectItem value="profit">Lợi nhuận</SelectItem>
              <SelectItem value="debt">Công nợ khách hàng</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
            Thời gian
          </label>
          <div className="flex gap-2">
            <Select defaultValue="quick">
              <SelectTrigger className="w-36 h-9 border-border shadow-none text-sm focus:ring-1">
                <SelectValue placeholder="Chọn nhanh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quick">Chọn nhanh</SelectItem>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="yesterday">Hôm qua</SelectItem>
                <SelectItem value="this-week">Tuần này</SelectItem>
                <SelectItem value="this-month">Tháng này</SelectItem>
              </SelectContent>
            </Select>
            <DateRangePicker />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-none overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b">
          <h2 className="text-lg font-bold">
            {title}
          </h2>
          <Button className="h-9 gap-2 bg-[#00b85c] hover:bg-[#009b4d] text-white font-semibold">
            <FileDown className="h-4 w-4" /> Xuất PDF
          </Button>
        </div>

        <div className="p-6">
          {viewMode === "chart" ? (
            <div className="w-full min-h-[400px]">
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={400}
              />
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6">
              {interest === "sales" && <SalesTable data={mockEmployees} totals={totals} />}
              {interest === "profit" && <ProfitTable data={mockEmployees} totals={totals} />}
              {interest === "debt" && <DebtTable data={mockEmployees} totals={totals} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
