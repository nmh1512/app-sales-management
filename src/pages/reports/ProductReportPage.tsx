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
  StockTable,
  StockValueTable,
} from "./components/ProductTables";
import type { ProductReportData } from "@/types/reports";

// --- Mock Data ---

const mockProducts: ProductReportData[] = [
  {
    id: "cap20wlknewa3",
    name: "Cáp 20W linh kiện (YA3- n2)",
    qtySold: 300,
    revenue: 2700000,
    totalCost: 2160000,
    profit: 540000,
    stockStart: 0,
    stockIn: 500,
    stockOut: 300,
    stockEnd: 500, // Based on mock image
    costPrice: 7200,
    sellPrice: 13000,
    sellValue: 6500000,
    stockValue: 3600000,
  },
  {
    id: "cu20wlkk22",
    name: "Củ 20W Linh Kiện (K22)",
    qtySold: 150,
    revenue: 3225000,
    totalCost: 2700000,
    profit: 525000,
    stockStart: 146,
    stockIn: 200,
    stockOut: 150,
    stockEnd: 196,
    costPrice: 18000,
    sellPrice: 21500,
    sellValue: 4214000,
    stockValue: 3528000,
  },
  {
    id: "khanl",
    name: "Khăn lau xịn, bịch lớn",
    qtySold: 119,
    revenue: 6545000,
    totalCost: 5734925.35,
    profit: 810074.65,
    stockStart: 112,
    stockIn: 105,
    stockOut: 0,
    stockEnd: 217,
    costPrice: 48192,
    sellPrice: 55000,
    sellValue: 11935000,
    stockValue: 10457664,
  },
  {
    id: "scn12pm",
    name: "Seal chống nước 12promax",
    qtySold: 102,
    revenue: 969000,
    totalCost: 878857.5,
    profit: 90142.5,
    stockStart: 24,
    stockIn: 100,
    stockOut: 0,
    stockEnd: 73, // From image
    costPrice: 8616.25,
    sellPrice: 14000,
    sellValue: 1022000,
    stockValue: 628986.25,
  },
];


// --- Main Page Component ---
export default function ProductReportPage() {
  const [viewMode, setViewMode] = useState<"chart" | "report">("report");
  const [interest, setInterest] = useState<"sales" | "profit" | "stock" | "stock_value">("profit");

  const titlePrefix = viewMode === "chart" ? "Biểu đồ top 10 sản phẩm" : "Báo cáo";
  const interestLabel = {
    sales: "bán chạy nhất",
    profit: "có lợi nhuận cao nhất",
    stock: "tồn kho nhiều nhất",
    stock_value: "có giá trị kho cao nhất",
  };
  const title = viewMode === "chart" 
    ? `${titlePrefix} ${interestLabel[interest]}` 
    : `${titlePrefix} ${interest === 'sales' ? 'bán hàng' : interest === 'profit' ? 'lợi nhuận' : interest === 'stock' ? 'tồn kho' : 'giá trị kho'} theo sản phẩm`;

  // calculate totals directly instead of using effects
  const totals = useMemo(() => {
    return mockProducts.reduce(
      (acc, p) => ({
        qtySold: acc.qtySold + p.qtySold,
        revenue: acc.revenue + p.revenue,
        totalCost: acc.totalCost + p.totalCost,
        profit: acc.profit + p.profit,
        stockStart: acc.stockStart + p.stockStart,
        stockIn: acc.stockIn + p.stockIn,
        stockOut: acc.stockOut + p.stockOut,
        stockEnd: acc.stockEnd + p.stockEnd,
        sellValue: acc.sellValue + p.sellValue,
        stockValue: acc.stockValue + p.stockValue,
      }),
      { 
        qtySold: 0, revenue: 0, totalCost: 0, profit: 0, 
        stockStart: 0, stockIn: 0, stockOut: 0, stockEnd: 0, sellValue: 0, stockValue: 0 
      },
    );
  }, []);

  // prepare chart data based on selected interest
  const chartData = useMemo(() => {
    const getValue = (p: ProductReportData) => {
      switch (interest) {
        case "sales": return p.revenue;
        case "profit": return p.profit;
        case "stock": return p.stockEnd;
        case "stock_value": return p.stockValue;
        default: return 0;
      }
    };

    return [...mockProducts]
      .filter((p) => getValue(p) > 0)
      .sort((a, b) => getValue(b) - getValue(a))
      .slice(0, 10)
      .map((p) => ({ label: p.name, value: getValue(p) }));
  }, [interest]);

  const seriesNameMap = {
    sales: "Doanh thu",
    profit: "Lợi nhuận",
    stock: "Số lượng tồn",
    stock_value: "Giá trị kho",
  };

  const { chartOptions, series } = useChart({
    data: chartData,
    seriesName: seriesNameMap[interest],
    horizontal: true,
    valueFormatter: (val) => interest === "stock" ? formatNumber(val) : formatCurrency(val)
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
              <SelectItem value="stock">Tồn kho</SelectItem>
              <SelectItem value="stock_value">Giá trị kho</SelectItem>
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
          <h2 className="text-lg font-bold">{title}</h2>
          <Button className="h-9 gap-2 bg-[#00b85c] hover:bg-[#009b4d] text-white font-semibold">
            <FileDown className="h-4 w-4" /> Xuất PDF
          </Button>
        </div>

        <div className="p-6">
          {viewMode === "chart" ? (
            <div className="w-full min-h-[450px]">
              <Chart options={chartOptions} series={series} type="bar" height={450} />
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6">
              {interest === "sales" && <SalesTable data={mockProducts} totals={totals} />}
              {interest === "profit" && <ProfitTable data={mockProducts} totals={totals} />}
              {interest === "stock" && <StockTable data={mockProducts} totals={totals} />}
              {interest === "stock_value" && <StockValueTable data={mockProducts} totals={totals} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
