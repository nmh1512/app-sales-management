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
  ImportTable,
  DebtTable,
} from "./components/SupplierTables";
import type { SupplierReportData } from "@/types/reports";

const mockSuppliers: SupplierReportData[] = [
  {
    id: "NCC1754741685APMH9D",
    name: "AL",
    qtyImport: 186.0,
    valImport: 32483000,
    qtyReturn: 0.0,
    valReturn: 0,
    qtyRemain: 186.0,
    valNet: 32483000,
    debtStart: 5803431812.27,
    debtIncrease: 32483000.00,
    debtPaid: 2809000.00,
    debtEnd: 5833105812.27,
  },
  {
    id: "NCC1756089742",
    name: "IMAX",
    qtyImport: 627.0,
    valImport: 40099423.4,
    qtyReturn: 50.0,
    valReturn: 9740492.59,
    qtyRemain: 577.0,
    valNet: 30358930.81,
    debtStart: 3679249311.81,
    debtIncrease: 30358930.81,
    debtPaid: 20600706.80,
    debtEnd: 3689007535.82,
  },
  {
    id: "NCC1756046282UMAIP0",
    name: "CN- Vỏ đỏ",
    qtyImport: 0.0,
    valImport: 0,
    qtyReturn: 0.0,
    valReturn: 0,
    qtyRemain: 0.0,
    valNet: 0,
    debtStart: 3125468896.15,
    debtIncrease: 0,
    debtPaid: 0,
    debtEnd: 3125468896.15,
  },
  {
    id: "NCC1756048068VN0DN3",
    name: "CN- Pin",
    qtyImport: 0.0,
    valImport: 0,
    qtyReturn: 0.0,
    valReturn: 0,
    qtyRemain: 0.0,
    valNet: 0,
    debtStart: 2314053386.96,
    debtIncrease: 0,
    debtPaid: 0,
    debtEnd: 2314053386.96,
  },
  {
    id: "NCC1756036076QMMHHM",
    name: "HK",
    qtyImport: 31.0,
    valImport: 3706000,
    qtyReturn: 0.0,
    valReturn: 0,
    qtyRemain: 31.0,
    valNet: 3706000,
    debtStart: 1023509596.44,
    debtIncrease: 6336000.00,
    debtPaid: 5356000.00,
    debtEnd: 1024489596.44,
  },
  {
    id: "NCC1756033373EGZOWU",
    name: "AC",
    qtyImport: 65.0,
    valImport: 9985000,
    qtyReturn: 0.0,
    valReturn: 0,
    qtyRemain: 65.0,
    valNet: 9985000,
    debtStart: 1012238192.65,
    debtIncrease: 9985000.00,
    debtPaid: 9985000.00,
    debtEnd: 1012238192.65,
  },
  {
    id: "NCC17560519979N8WG5",
    name: "ANG",
    qtyImport: 0.0,
    valImport: 0,
    qtyReturn: 0.0,
    valReturn: 0,
    qtyRemain: 0.0,
    valNet: 0,
    debtStart: 980705000.00,
    debtIncrease: 0,
    debtPaid: 0,
    debtEnd: 980705000.00,
  },
  {
    id: "NCC1756047914IVGL0X",
    name: "HP",
    qtyImport: 100.0,
    valImport: 8500000,
    qtyReturn: 0.0,
    valReturn: 0,
    qtyRemain: 100.0,
    valNet: 8500000,
    debtStart: 604770727.00,
    debtIncrease: 8500000.00,
    debtPaid: 8500000.00,
    debtEnd: 604770727.00,
  },
  {
    id: "NCC1756089743",
    name: "Trung",
    qtyImport: 0.0,
    valImport: 0,
    qtyReturn: 0.0,
    valReturn: 0,
    qtyRemain: 0.0,
    valNet: 0,
    debtStart: 529854000.00,
    debtIncrease: 0,
    debtPaid: 0,
    debtEnd: 529854000.00,
  },
  {
    id: "NCC1756089741WT9GI4",
    name: "TL",
    qtyImport: 0.0,
    valImport: 0,
    qtyReturn: 0.0,
    valReturn: 0,
    qtyRemain: 0.0,
    valNet: 0,
    debtStart: 350690000.00,
    debtIncrease: 0,
    debtPaid: 0,
    debtEnd: 350690000.00,
  },
  {
    id: "NCC1756089748",
    name: "cz",
    qtyImport: 0.0,
    valImport: 0,
    qtyReturn: 0.0,
    valReturn: 0,
    qtyRemain: 0.0,
    valNet: 0,
    debtStart: 47895000.00,
    debtIncrease: 0,
    debtPaid: 0,
    debtEnd: 47895000.00,
  },
];

export default function SupplierReportPage() {
  const [viewMode, setViewMode] = useState<"chart" | "report">("report");
  const [interest, setInterest] = useState<"import" | "debt">("debt");

  const totals = useMemo(() => {
    return mockSuppliers.reduce(
      (acc, s) => ({
        qtyImport: acc.qtyImport + s.qtyImport,
        valImport: acc.valImport + s.valImport,
        qtyReturn: acc.qtyReturn + s.qtyReturn,
        valReturn: acc.valReturn + s.valReturn,
        qtyRemain: acc.qtyRemain + s.qtyRemain,
        valNet: acc.valNet + s.valNet,
        debtStart: acc.debtStart + s.debtStart,
        debtIncrease: acc.debtIncrease + s.debtIncrease,
        debtPaid: acc.debtPaid + s.debtPaid,
        debtEnd: acc.debtEnd + s.debtEnd,
      }),
      {
        qtyImport: 0,
        valImport: 0,
        qtyReturn: 0,
        valReturn: 0,
        qtyRemain: 0,
        valNet: 0,
        debtStart: 0,
        debtIncrease: 0,
        debtPaid: 0,
        debtEnd: 0,
      },
    );
  }, []);

  const chartData = useMemo(() => {
    const getValue = (s: SupplierReportData) => {
      switch (interest) {
        case "import": return s.valNet;
        case "debt": return s.debtEnd;
        default: return 0;
      }
    };

    return [...mockSuppliers]
      .filter((s) => getValue(s) > 0)
      .sort((a, b) => getValue(b) - getValue(a))
      .slice(0, 10)
      .map((s) => ({ label: s.name, value: getValue(s) }));
  }, [interest]);

  const seriesNameMap = {
    import: "Giá trị nhập thuần",
    debt: "Công nợ",
  };

  const { chartOptions, series: chartSeries } = useChart({
    data: chartData,
    seriesName: seriesNameMap[interest],
    horizontal: true,
  });

  const titlePrefix = viewMode === "chart" ? "Biểu đồ top 10 nhà cung cấp" : "Báo cáo";
  const interestLabel = {
    import: "có giá trị nhập thuần cao nhất",
    debt: "có công nợ lớn nhất",
  };
  const title = viewMode === "chart" 
    ? `${titlePrefix} ${interestLabel[interest]}` 
    : `${titlePrefix} ${interest === 'import' ? 'nhập hàng' : 'công nợ'} nhà cung cấp`;

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
              <SelectItem value="import">Nhập hàng</SelectItem>
              <SelectItem value="debt">Công nợ</SelectItem>
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
              {interest === "import" && <ImportTable data={mockSuppliers} totals={totals} />}
              {interest === "debt" && <DebtTable data={mockSuppliers} totals={totals} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
