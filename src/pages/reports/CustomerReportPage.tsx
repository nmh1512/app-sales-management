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
import {
  ProfitTable,
  DebtTable,
} from "./components/CustomerTables";
import type { CustomerReportData } from "@/types/reports";

const mockCustomers: CustomerReportData[] = [
  {
    id: "KH1756014389",
    name: "C Nga - C Mơ",
    revenue: 0,
    discount: 0,
    paid: 0,
    cost: 0,
    profit: 0,
    debtStart: 450000000,
    debtIncrease: 0,
    debtPaid: 0,
    debtEnd: 450000000,
  },
  {
    id: "KH17560141445HM6F6",
    name: "A Định PVT",
    revenue: 18400000,
    discount: 0,
    paid: 0,
    cost: 14882963.88,
    profit: 3517036.12,
    debtStart: 407630000,
    debtIncrease: 18400000,
    debtPaid: 0,
    debtEnd: 426030000,
  },
  {
    id: "KH1756014210EIVOCI",
    name: "A Hùng Cường",
    revenue: 80660000,
    discount: 0,
    paid: 0,
    cost: 69657575.82,
    profit: 11002424.18,
    debtStart: 216517000,
    debtIncrease: 80660000,
    debtPaid: 0,
    debtEnd: 297177000,
  },
  {
    id: "KH1756014392",
    name: "Rượu Hội Xuân",
    revenue: 0,
    discount: 0,
    paid: 0,
    cost: 0,
    profit: 0,
    debtStart: 205000000,
    debtIncrease: 0,
    debtPaid: 0,
    debtEnd: 205000000,
  },
  {
    id: "KH1756014420",
    name: "Oai Lương",
    revenue: 0,
    discount: 0,
    paid: 0,
    cost: 0,
    profit: 0,
    debtStart: 197555000,
    debtIncrease: 0,
    debtPaid: 0,
    debtEnd: 197555000,
  },
  {
    id: "KH1756014475",
    name: "Hà Táo LK",
    revenue: 0,
    discount: 0,
    paid: 0,
    cost: 0,
    profit: 0,
    debtStart: 195594000,
    debtIncrease: 0,
    debtPaid: 0,
    debtEnd: 195594000,
  },
  {
    id: "KH1756014264",
    name: "C Hậu - MK",
    revenue: 14120000,
    discount: 0,
    paid: 0,
    cost: 10450058.45,
    profit: 3669941.55,
    debtStart: 139721700,
    debtIncrease: 14120000,
    debtPaid: -50000,
    debtEnd: 153891700,
  },
  {
    id: "KH1756014260SUQWAT",
    name: "Trần Shoppe",
    revenue: 4903500,
    discount: 0,
    paid: 0,
    cost: 4505303.15,
    profit: 398196.85,
    debtStart: 105294400,
    debtIncrease: 4903500,
    debtPaid: 0,
    debtEnd: 110197900,
  },
  {
    id: "KH1756014552",
    name: "Cao Minh Đạt- C Mơ",
    revenue: 0,
    discount: 0,
    paid: 0,
    cost: 0,
    profit: 0,
    debtStart: 0,
    debtIncrease: 0,
    debtPaid: -105000000,
    debtEnd: 105000000,
  },
  {
    id: "KH1756014463",
    name: "Nghĩa 93",
    revenue: 0,
    discount: 0,
    paid: 0,
    cost: 0,
    profit: 0,
    debtStart: 100000000,
    debtIncrease: 0,
    debtPaid: 0,
    debtEnd: 100000000,
  },
  {
    id: "",
    name: "Khách lẻ",
    revenue: 570000,
    discount: 0,
    paid: 570000,
    cost: 361991.19,
    profit: 208008.81,
    debtStart: 0,
    debtIncrease: 0,
    debtPaid: 570000,
    debtEnd: 0,
  },
  {
    id: "KH175601371581LLAV",
    name: "Khắc Phương -(3)",
    revenue: 4631000,
    discount: 0,
    paid: 0,
    cost: 4135826.48,
    profit: 495173.52,
    debtStart: 0,
    debtIncrease: 4631000,
    debtPaid: 0,
    debtEnd: 4631000,
  },
  {
    id: "KH1756014261",
    name: "Ngân Ellen-Mobile Pro",
    revenue: 910000,
    discount: 0,
    paid: 0,
    cost: 648734.75,
    profit: 261265.25,
    debtStart: 0,
    debtIncrease: 910000,
    debtPaid: 0,
    debtEnd: 910000,
  },
];

export default function CustomerReportPage() {
  const [viewMode, setViewMode] = useState<"chart" | "report">("report");
  const [interest, setInterest] = useState<"profit" | "debt">("debt");

  const totals = useMemo(() => {
    return mockCustomers.reduce(
      (acc, c) => ({
        revenue: acc.revenue + c.revenue,
        discount: acc.discount + c.discount,
        paid: acc.paid + c.paid,
        cost: acc.cost + c.cost,
        profit: acc.profit + c.profit,
        debtStart: acc.debtStart + c.debtStart,
        debtIncrease: acc.debtIncrease + c.debtIncrease,
        debtPaid: acc.debtPaid + c.debtPaid,
        debtEnd: acc.debtEnd + c.debtEnd,
      }),
      {
        revenue: 0,
        discount: 0,
        paid: 0,
        cost: 0,
        profit: 0,
        debtStart: 0,
        debtIncrease: 0,
        debtPaid: 0,
        debtEnd: 0,
      },
    );
  }, []);

  const chartData = useMemo(() => {
    const getValue = (c: CustomerReportData) => {
      switch (interest) {
        case "profit": return c.profit;
        case "debt": return c.debtEnd;
        default: return 0;
      }
    };

    return [...mockCustomers]
      .filter((c) => getValue(c) > 0)
      .sort((a, b) => getValue(b) - getValue(a))
      .slice(0, 10)
      .map((c) => ({ label: c.name, value: getValue(c) }));
  }, [interest]);

  const seriesNameMap = {
    profit: "Lợi nhuận",
    debt: "Công nợ",
  };

  const { chartOptions, series: chartSeries } = useChart({
    data: chartData,
    seriesName: seriesNameMap[interest],
    horizontal: true,
  });

  const titlePrefix = viewMode === "chart" ? "Biểu đồ top 10 khách hàng" : "Báo cáo";
  const interestLabel = {
    profit: "đem lại lợi nhuận cao nhất",
    debt: "có công nợ lớn nhất",
  };
  const title = viewMode === "chart" 
    ? `${titlePrefix} ${interestLabel[interest]}` 
    : `${titlePrefix} ${interest === 'profit' ? 'lợi nhuận theo' : 'công nợ'} khách hàng`;

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
              <SelectItem value="profit">Lợi nhuận</SelectItem>
              <SelectItem value="debt">Công nợ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
            Thời gian
          </label>
          <div className="flex gap-2">
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
              {interest === "profit" && <ProfitTable data={mockCustomers} totals={totals} />}
              {interest === "debt" && <DebtTable data={mockCustomers} totals={totals} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
