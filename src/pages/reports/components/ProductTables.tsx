import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import type { ProductReportData } from "@/types/reports";

export type { ProductReportData };

export const SortIcon = () => (
  <div className="inline-flex flex-col ml-1 items-center justify-center translate-y-0.5">
    <ChevronUp className="h-2.5 w-2.5 text-muted-foreground/40 -mb-[3px]" />
    <ChevronDown className="h-2.5 w-2.5 text-muted-foreground/40" />
  </div>
);

export const SalesTable = ({ data, totals }: { data: ProductReportData[]; totals: any }) => (
  <Table>
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 w-[200px]">MÃ SẢN PHẨM</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4">TÊN SẢN PHẨM</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">SỐ LƯỢNG BÁN <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 text-right cursor-pointer group">DOANH THU <SortIcon /></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="bg-[#fff9e6] dark:bg-amber-900/10 hover:bg-[#fff9e6] dark:hover:bg-amber-900/10 border-b font-bold">
        <TableCell className="py-4 px-6 text-sm">SL sản phẩm: 337</TableCell>
        <TableCell className="py-4 px-4"></TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatNumber(totals.qtySold)}</TableCell>
        <TableCell className="py-4 px-6 text-right tabular-nums">{formatCurrency(totals.revenue)}</TableCell>
      </TableRow>
      {data.map((row) => (
        <TableRow key={row.id} className="hover:bg-muted/30 border-b cursor-pointer transition-colors">
          <TableCell className="text-sm font-medium text-blue-500 py-3 px-6">{row.id}</TableCell>
          <TableCell className="text-sm font-medium py-3 px-4">{row.name}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatNumber(row.qtySold)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-6 font-semibold tabular-nums">{formatCurrency(row.revenue)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const ProfitTable = ({ data, totals }: { data: ProductReportData[]; totals: any }) => (
  <Table>
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 w-[150px]">MÃ SẢN PHẨM</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4">TÊN SẢN PHẨM</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">SỐ LƯỢNG BÁN <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">GIÁ VỐN <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">DOANH THU <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 text-right cursor-pointer group">LỢI NHUẬN <SortIcon /></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="bg-[#fff9e6] dark:bg-amber-900/10 hover:bg-[#fff9e6] dark:hover:bg-amber-900/10 border-b font-bold">
        <TableCell className="py-4 px-6 text-sm">SL sản phẩm: 337</TableCell>
        <TableCell className="py-4 px-4"></TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatNumber(totals.qtySold)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.totalCost)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.revenue)}</TableCell>
        <TableCell className="py-4 px-6 text-right font-bold tabular-nums">{formatCurrency(totals.profit)}</TableCell>
      </TableRow>
      {data.map((row) => (
        <TableRow key={row.id} className="hover:bg-muted/30 border-b cursor-pointer transition-colors">
          <TableCell className="text-sm font-medium text-blue-500 py-3 px-6">{row.id}</TableCell>
          <TableCell className="text-sm font-medium py-3 px-4">{row.name}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatNumber(row.qtySold)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.totalCost)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.revenue)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-6 font-semibold tabular-nums">{formatCurrency(row.profit)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const StockTable = ({ data, totals }: { data: ProductReportData[]; totals: any }) => (
  <Table>
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 w-[150px]">MÃ SẢN PHẨM</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4">TÊN SẢN PHẨM</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">TỒN ĐẦU KỲ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">SL NHẬP <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">SL XUẤT <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 text-right cursor-pointer group">TỒN CUỐI KỲ <SortIcon /></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="bg-[#fff9e6] dark:bg-amber-900/10 hover:bg-[#fff9e6] dark:hover:bg-amber-900/10 border-b font-bold">
        <TableCell className="py-4 px-6 text-sm">SL sản phẩm: 3249</TableCell>
        <TableCell className="py-4 px-4"></TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatNumber(totals.stockStart)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatNumber(totals.stockIn)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatNumber(totals.stockOut)}</TableCell>
        <TableCell className="py-4 px-6 text-right font-bold tabular-nums">{formatNumber(totals.stockEnd)}</TableCell>
      </TableRow>
      {data.map((row) => (
        <TableRow key={row.id} className="hover:bg-muted/30 border-b cursor-pointer transition-colors">
          <TableCell className="text-sm font-medium text-blue-500 py-3 px-6">{row.id}</TableCell>
          <TableCell className="text-sm font-medium py-3 px-4">{row.name}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatNumber(row.stockStart)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatNumber(row.stockIn)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatNumber(row.stockOut)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-6 font-semibold tabular-nums">{formatNumber(row.stockEnd)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const StockValueTable = ({ data, totals }: { data: ProductReportData[]; totals: any }) => (
  <Table>
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 w-[150px]">MÃ SẢN PHẨM</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4">TÊN SẢN PHẨM</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">SỐ LƯỢNG TỒN <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">GIÁ VỐN <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">GIÁ BÁN <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">GIÁ TRỊ BÁN <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 text-right cursor-pointer group">GIÁ TRỊ KHO <SortIcon /></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="bg-[#fff9e6] dark:bg-amber-900/10 hover:bg-[#fff9e6] dark:hover:bg-amber-900/10 border-b font-bold">
        <TableCell className="py-4 px-6 text-sm">SL sản phẩm: 3249</TableCell>
        <TableCell className="py-4 px-4"></TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatNumber(totals.stockEnd)}</TableCell>
        <TableCell className="py-4 px-4"></TableCell>
        <TableCell className="py-4 px-4"></TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.sellValue)}</TableCell>
        <TableCell className="py-4 px-6 text-right font-bold tabular-nums">{formatCurrency(totals.stockValue)}</TableCell>
      </TableRow>
      {data.map((row) => (
        <TableRow key={row.id} className="hover:bg-muted/30 border-b cursor-pointer transition-colors">
          <TableCell className="text-sm font-medium text-blue-500 py-3 px-6">{row.id}</TableCell>
          <TableCell className="text-sm font-medium py-3 px-4">{row.name}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatNumber(row.stockEnd)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.costPrice)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.sellPrice)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.sellValue)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-6 font-semibold tabular-nums">{formatCurrency(row.stockValue)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
