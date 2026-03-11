import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import type { CustomerReportData } from "@/types/reports";

export type { CustomerReportData };

export const SortIcon = () => (
  <div className="inline-flex flex-col ml-1 items-center justify-center translate-y-0.5">
    <ChevronUp className="h-2.5 w-2.5 text-muted-foreground/40 -mb-[3px]" />
    <ChevronDown className="h-2.5 w-2.5 text-muted-foreground/40" />
  </div>
);

export const ProfitTable = ({ data, totals }: { data: CustomerReportData[]; totals: any }) => (
  <Table>
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 w-[200px]">MÃ KH</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4">TÊN KHÁCH HÀNG</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">TỔNG TIỀN HÀNG <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">TỔNG GIẢM GIÁ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">TỔNG ĐÃ TRẢ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">TỔNG CHI PHÍ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 text-right cursor-pointer group">LỢI NHUẬN <SortIcon /></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="bg-[#fff9e6] dark:bg-amber-900/10 hover:bg-[#fff9e6] dark:hover:bg-amber-900/10 border-b font-bold font-mono">
        <TableCell className="py-4 px-6 font-sans text-sm">SL khách hàng: {data.length}</TableCell>
        <TableCell className="py-4 px-4"></TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.revenue)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.discount)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.paid)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.cost)}</TableCell>
        <TableCell className="py-4 px-6 text-right text-green-600 dark:text-green-500 font-bold tabular-nums">{formatCurrency(totals.profit)}</TableCell>
      </TableRow>
      {data.map((row) => (
        <TableRow key={row.id} className="hover:bg-muted/30 border-b cursor-pointer transition-colors">
          <TableCell className="text-sm font-medium text-blue-500 py-3 px-6">{row.id}</TableCell>
          <TableCell className="text-sm font-medium py-3 px-4">{row.name}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.revenue)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.discount)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.paid)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.cost)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-6 font-semibold text-green-600 dark:text-green-500 tabular-nums">{formatCurrency(row.profit)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const DebtTable = ({ data, totals }: { data: CustomerReportData[]; totals: any }) => (
  <Table>
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 w-[200px]">MÃ KH</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4">TÊN KHÁCH HÀNG</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">NỢ ĐẦU KỲ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">GHI NỢ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">ĐÃ TRẢ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 text-right cursor-pointer group">NỢ CUỐI KỲ <SortIcon /></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="bg-[#fff9e6] dark:bg-amber-900/10 hover:bg-[#fff9e6] dark:hover:bg-amber-900/10 border-b font-bold font-mono">
        <TableCell className="py-4 px-6 font-sans text-sm">SL khách hàng: {data.length}</TableCell>
        <TableCell className="py-4 px-4"></TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.debtStart)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.debtIncrease)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.debtPaid)}</TableCell>
        <TableCell className="py-4 px-6 text-right font-bold tabular-nums text-red-500">{formatCurrency(totals.debtEnd)}</TableCell>
      </TableRow>
      {data.map((row) => (
        <TableRow key={row.id} className="hover:bg-muted/30 border-b cursor-pointer transition-colors">
          <TableCell className="text-sm font-medium text-blue-500 py-3 px-6">{row.id}</TableCell>
          <TableCell className="text-sm font-medium py-3 px-4">{row.name}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.debtStart)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.debtIncrease)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.debtPaid)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-6 font-semibold tabular-nums text-red-500">{formatCurrency(row.debtEnd)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
