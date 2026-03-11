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
import type { SupplierReportData } from "@/types/reports";

export type { SupplierReportData };

export const SortIcon = () => (
  <div className="inline-flex flex-col ml-1 items-center justify-center translate-y-0.5">
    <ChevronUp className="h-2.5 w-2.5 text-muted-foreground/40 -mb-[3px]" />
    <ChevronDown className="h-2.5 w-2.5 text-muted-foreground/40" />
  </div>
);

export const ImportTable = ({ data, totals }: { data: SupplierReportData[]; totals: any }) => (
  <Table>
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 w-[150px]">MÃ NCC</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4">TÊN NHÀ CUNG CẤP</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">SỐ LƯỢNG NHẬP <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">GIÁ TRỊ NHẬP <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">SỐ LƯỢNG TRẢ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">GIÁ TRỊ TRẢ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">SỐ LƯỢNG CÒN LẠI <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 text-right cursor-pointer group">GIÁ TRỊ THUẦN <SortIcon /></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="bg-[#fff9e6] dark:bg-amber-900/10 hover:bg-[#fff9e6] dark:hover:bg-amber-900/10 border-b font-bold">
        <TableCell className="py-4 px-6 text-sm">SL NCC: 28</TableCell>
        <TableCell className="py-4 px-4"></TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatNumber(totals.qtyImport)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.valImport)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatNumber(totals.qtyReturn)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.valReturn)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatNumber(totals.qtyRemain)}</TableCell>
        <TableCell className="py-4 px-6 text-right tabular-nums">{formatCurrency(totals.valNet)}</TableCell>
      </TableRow>
      {data.map((row) => (
        <TableRow key={row.id} className="hover:bg-muted/30 border-b cursor-pointer transition-colors">
          <TableCell className="text-sm font-medium text-blue-500 py-3 px-6">{row.id}</TableCell>
          <TableCell className="text-sm font-medium py-3 px-4">{row.name}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatNumber(row.qtyImport)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.valImport)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatNumber(row.qtyReturn)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.valReturn)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatNumber(row.qtyRemain)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-6 font-semibold tabular-nums">{formatCurrency(row.valNet)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const DebtTable = ({ data, totals }: { data: SupplierReportData[]; totals: any }) => (
  <Table>
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 w-[150px]">MÃ NCC</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4">TÊN NHÀ CUNG CẤP</TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">NỢ ĐẦU KỲ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">GHI NỢ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-4 text-right cursor-pointer group">ĐÃ TRẢ <SortIcon /></TableHead>
        <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 px-6 text-right cursor-pointer group">NỢ CUỐI KỲ <SortIcon /></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="bg-[#fff9e6] dark:bg-amber-900/10 hover:bg-[#fff9e6] dark:hover:bg-amber-900/10 border-b font-bold">
        <TableCell className="py-4 px-6 text-sm">SL NCC: 28</TableCell>
        <TableCell className="py-4 px-4"></TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.debtStart)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.debtIncrease)}</TableCell>
        <TableCell className="py-4 px-4 text-right tabular-nums">{formatCurrency(totals.debtPaid)}</TableCell>
        <TableCell className="py-4 px-6 text-right tabular-nums">{formatCurrency(totals.debtEnd)}</TableCell>
      </TableRow>
      {data.map((row) => (
        <TableRow key={row.id} className="hover:bg-muted/30 border-b cursor-pointer transition-colors">
          <TableCell className="text-sm font-medium text-blue-500 py-3 px-6">{row.id}</TableCell>
          <TableCell className="text-sm font-medium py-3 px-4">{row.name}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.debtStart)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.debtIncrease)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-4 tabular-nums">{formatCurrency(row.debtPaid)}</TableCell>
          <TableCell className="text-sm text-right py-3 px-6 font-semibold text-red-500 tabular-nums">{formatCurrency(row.debtEnd)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
