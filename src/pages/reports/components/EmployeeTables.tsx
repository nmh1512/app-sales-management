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
import type { EmployeeReportData } from "@/types/reports";

export type { EmployeeReportData };

export const SortIcon = () => (
  <div className="inline-flex flex-col ml-1 items-center justify-center translate-y-0.5">
    <ChevronUp className="h-2.5 w-2.5 text-muted-foreground/40 -mb-[3px]" />
    <ChevronDown className="h-2.5 w-2.5 text-muted-foreground/40" />
  </div>
);

export const SalesTable = ({ data, totals }: { data: EmployeeReportData[]; totals: any }) => (
  <Table>
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 w-[200px]">MÃ NV</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4">TÊN NHÂN VIÊN</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">SỐ ĐƠN HÀNG <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 text-right cursor-pointer group">TỔNG DOANH THU <SortIcon /></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="bg-[#fff9e6] dark:bg-amber-900/10 hover:bg-[#fff9e6] dark:hover:bg-amber-900/10 border-b font-bold">
        <TableCell className="py-4 px-6 text-sm">SL nhân viên: {data.length}</TableCell>
        <TableCell className="py-4 px-4"></TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatNumber(totals.orderCount)}</TableCell>
        <TableCell className="py-4 px-6 text-right tabular-nums">{formatCurrency(totals.revenue)}</TableCell>
      </TableRow>
      {data.map((row) => (
        <TableRow key={row.id} className="hover:bg-muted/30 border-b cursor-pointer transition-colors">
          <TableCell className="text-sm font-medium text-blue-500 py-3 px-6">{row.id}</TableCell>
          <TableCell className="text-sm font-medium py-3 px-4">{row.name}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatNumber(row.orderCount)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-6 font-semibold tabular-nums">{formatCurrency(row.revenue)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const ProfitTable = ({ data, totals }: { data: EmployeeReportData[]; totals: any }) => (
  <Table>
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 w-[150px]">MÃ NV</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4">TÊN NHÂN VIÊN</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">TỔNG TIỀN HÀNG <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">TỔNG GIẢM GIÁ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">TỔNG ĐÃ TRẢ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">TỔNG CHI PHÍ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 text-right cursor-pointer group">LỢI NHUẬN <SortIcon /></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="bg-[#fff9e6] dark:bg-amber-900/10 hover:bg-[#fff9e6] dark:hover:bg-amber-900/10 border-b font-bold">
        <TableCell className="py-4 px-6 text-sm">SL nhân viên: {data.length}</TableCell>
        <TableCell className="py-4 px-4"></TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.revenue)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.discount)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.returnAmount)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.cost)}</TableCell>
        <TableCell className="py-4 px-6 text-right font-bold tabular-nums text-[#00b85c]">{formatCurrency(totals.profit)}</TableCell>
      </TableRow>
      {data.map((row) => (
        <TableRow key={row.id} className="hover:bg-muted/30 border-b cursor-pointer transition-colors">
          <TableCell className="text-sm font-medium text-blue-500 py-3 px-6">{row.id}</TableCell>
          <TableCell className="text-sm font-medium py-3 px-4">{row.name}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.revenue)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.discount)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.returnAmount)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.cost)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-6 font-semibold tabular-nums text-[#00b85c]">{formatCurrency(row.profit)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const DebtTable = ({ data, totals }: { data: EmployeeReportData[]; totals: any }) => (
  <Table>
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 w-[150px]">MÃ NV</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4">TÊN NHÂN VIÊN</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">TỔNG KHÁCH HÀNG <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 text-right cursor-pointer group">TỔNG NỢ <SortIcon /></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="bg-[#fff9e6] dark:bg-amber-900/10 hover:bg-[#fff9e6] dark:hover:bg-amber-900/10 border-b font-bold">
        <TableCell className="py-4 px-6 text-sm">SL nhân viên: {data.length}</TableCell>
        <TableCell className="py-4 px-4"></TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums"></TableCell>
        <TableCell className="py-4 px-6 text-right font-bold tabular-nums">{formatCurrency(totals.debt)}</TableCell>
      </TableRow>
      {data.map((row) => (
        <TableRow key={row.id} className="hover:bg-muted/30 border-b cursor-pointer transition-colors">
          <TableCell className="text-sm font-medium text-blue-500 py-3 px-6">{row.id}</TableCell>
          <TableCell className="text-sm font-medium py-3 px-4">{row.name}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatNumber(row.customerCount)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-6 font-semibold tabular-nums">{formatCurrency(row.debt)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
