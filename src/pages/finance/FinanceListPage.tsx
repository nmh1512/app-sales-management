import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchInput } from "@/components/ui/search-input";
import {
  Plus,
  Download,
  Filter,
  Calendar,
  X,
  Save,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import type { FinanceTransaction, FinanceForm, TransactionType } from "@/types/finance";

/* ───────── Mock data ───────── */
const mockData = [
  {
    id: 1,
    code: "PT005118",
    type: "receipt",
    amount: 220000,
    status: "Đã thanh toán",
    creator: "Hà Tảo LK",
    created_at: "10/03/2026 18:19",
    updated_by: "Hà Tảo LK",
    updated_at: "10/03/2026 18:19",
    subject: "Khách hàng",
    customer: "Nguyễn Văn A",
    note: "",
  },
  {
    id: 2,
    code: "PT005117",
    type: "receipt",
    amount: 21200000,
    status: "Đã thanh toán",
    creator: "Admin",
    created_at: "10/03/2026 11:33",
    updated_by: "N/A",
    updated_at: "10/03/2026 11:33",
    subject: "Khách hàng",
    customer: "",
    note: "",
  },
  {
    id: 3,
    code: "PT005116",
    type: "receipt",
    amount: 7608000,
    status: "Đã thanh toán",
    creator: "Admin",
    created_at: "10/03/2026 11:32",
    updated_by: "N/A",
    updated_at: "10/03/2026 11:32",
    subject: "Khách hàng",
    customer: "",
    note: "",
  },
  {
    id: 4,
    code: "PT005115",
    type: "receipt",
    amount: 572500,
    status: "Đã thanh toán",
    creator: "Admin",
    created_at: "10/03/2026 11:32",
    updated_by: "N/A",
    updated_at: "10/03/2026 11:32",
    subject: "Khách hàng",
    customer: "",
    note: "",
  },
  {
    id: 5,
    code: "PT005114",
    type: "receipt",
    amount: 24755000,
    status: "Đã thanh toán",
    creator: "Admin",
    created_at: "10/03/2026 11:31",
    updated_by: "N/A",
    updated_at: "10/03/2026 11:31",
    subject: "Khách hàng",
    customer: "",
    note: "",
  },
  {
    id: 6,
    code: "PC000321",
    type: "payment",
    amount: 50000,
    status: "Đã thanh toán",
    creator: "Admin",
    created_at: "09/03/2026 20:24",
    updated_by: "N/A",
    updated_at: "09/03/2026 20:24",
    subject: "Nhà cung cấp",
    customer: "",
    note: "",
  },
  {
    id: 7,
    code: "PC000320",
    type: "payment",
    amount: 2600000,
    status: "Đã thanh toán",
    creator: "Admin",
    created_at: "09/03/2026 19:36",
    updated_by: "N/A",
    updated_at: "09/03/2026 19:36",
    subject: "Nhà cung cấp",
    customer: "",
    note: "",
  },
];

const SUBJECTS = ["Khách hàng", "Nhà cung cấp", "Nhân viên", "Khác"];

const defaultForm: FinanceForm = {
  type: "receipt",
  subject: "",
  customer: "",
  date: new Date().toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
  amount: "0.00",
  note: "",
};

export default function FinanceListPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FinanceTransaction | null>(null);
  const [form, setForm] = useState<FinanceForm>({ ...defaultForm });

  const filtered = mockData.filter((r) => {
    const matchSearch =
      r.code.toLowerCase().includes(search.toLowerCase()) ||
      r.creator.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || r.type === filterType;
    return matchSearch && matchType;
  });

  const openCreate = () => {
    setEditingItem(null);
    setForm({ ...defaultForm });
    setIsModalOpen(true);
  };

  const openEdit = (item: any) => {
    setEditingItem(item);
    setForm({
      type: item.type,
      subject: item.subject,
      customer: item.customer,
      date: item.created_at,
      amount: item.amount.toLocaleString("vi-VN"),
      note: item.note,
    });
    setIsModalOpen(true);
  };

  const totalReceipt = mockData
    .filter((r) => r.type === "receipt")
    .reduce((s, r) => s + r.amount, 0);
  const totalPayment = mockData
    .filter((r) => r.type === "payment")
    .reduce((s, r) => s + r.amount, 0);

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Tài chính</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2 px-6">
            <Download className="h-4 w-4" /> Xuất file
          </Button>
          <Button
            className="gap-2 bg-primary hover:bg-primary/90 px-6 font-medium"
            onClick={openCreate}
          >
            <Plus className="h-4 w-4" /> Tạo phiếu
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="bg-green-500/10 text-green-500 p-3 rounded-xl">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Tổng tiền thu
            </p>
            <p className="text-xl font-bold text-green-500">
              {formatCurrency(totalReceipt)}
            </p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="bg-red-500/10 text-red-500 p-3 rounded-xl">
            <TrendingDown className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Tổng tiền chi
            </p>
            <p className="text-xl font-bold text-red-500">
              {formatCurrency(totalPayment)}
            </p>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-none flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            placeholder="Theo mã phiếu, người tạo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            wrapperClassName="max-w-sm flex-1"
          />
          <div className="flex items-center gap-2">
            {(["all", "receipt", "payment"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                  filterType === t
                    ? t === "receipt"
                      ? "bg-green-500 text-white border-green-500"
                      : t === "payment"
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t === "all"
                  ? "Tất cả"
                  : t === "receipt"
                    ? "Phiếu thu"
                    : "Phiếu chi"}
              </button>
            ))}
          </div>
          <Button variant="outline" className="gap-2 ml-auto">
            <Calendar className="h-4 w-4" /> Ngày
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Lọc
          </Button>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3">
                  MÃ PHIẾU
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3">
                  LOẠI
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3 text-right">
                  SỐ TIỀN
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3 text-center">
                  TRẠNG THÁI
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3 w-40">
                  NGƯỜI TẠO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3 w-40">
                  NGƯỜI CẬP NHẬT
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-16 text-sm"
                  >
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((row) => (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => openEdit(row)}
                  >
                    <TableCell className="font-bold text-primary text-sm py-3">
                      {row.code}
                    </TableCell>
                    <TableCell className="py-3">
                      {row.type === "receipt" ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-semibold rounded text-xs">
                          Phiếu thu
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-600 hover:bg-red-100 border-none font-semibold rounded text-xs">
                          Phiếu chi
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-sm py-3">
                      {formatCurrency(row.amount)}
                    </TableCell>
                    <TableCell className="text-center py-3">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-semibold rounded text-xs">
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="text-sm font-medium">{row.creator}</div>
                      <div className="text-xs text-muted-foreground">
                        {row.created_at}
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="text-sm font-medium">
                        {row.updated_by}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {row.updated_at}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-0 gap-0 border-border rounded-lg overflow-hidden">
          <DialogHeader className="p-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-bold">
                {editingItem
                  ? `Chỉnh sửa phiếu ${editingItem.type === "receipt" ? "thu" : "chi"} #${editingItem.code}`
                  : "Tạo phiếu thu / chi"}
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="p-6 space-y-5">
            {/* Loại phiếu */}
            <div>
              <label className="text-sm font-bold text-foreground mb-2 block">
                Loại phiếu <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, type: "receipt" }))}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${
                    form.type === "receipt"
                      ? "border-green-500 bg-green-50 dark:bg-green-500/10 text-green-600"
                      : "border-border text-muted-foreground hover:border-green-400 hover:text-green-600"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  Phiếu thu
                </button>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, type: "payment" }))}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${
                    form.type === "payment"
                      ? "border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600"
                      : "border-border text-muted-foreground hover:border-red-400 hover:text-red-600"
                  }`}
                >
                  <TrendingDown className="h-4 w-4" />
                  Phiếu chi
                </button>
              </div>
            </div>

            {/* Row: Đối tượng + Khách hàng */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Đối tượng nộp <span className="text-red-500">*</span>
                </label>
                <Select
                  value={form.subject}
                  onValueChange={(v) => setForm((f) => ({ ...f, subject: v }))}
                >
                  <SelectTrigger className="h-10 border-border shadow-none focus:ring-1 text-sm">
                    <SelectValue placeholder="Chọn đối tượng nộp" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Khách hàng
                </label>
                <Select
                  value={form.customer}
                  onValueChange={(v) => setForm((f) => ({ ...f, customer: v }))}
                >
                  <SelectTrigger className="h-10 border-border shadow-none focus:ring-1 text-sm">
                    <SelectValue placeholder="Chọn khách hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nguyen-van-a">Nguyễn Văn A</SelectItem>
                    <SelectItem value="tran-thi-b">Trần Thị B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row: Ngày + Giá trị */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Ngày {form.type === "receipt" ? "thu" : "chi"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={form.date}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date: e.target.value }))
                    }
                    className="w-full h-10 border border-border rounded-lg px-3 pr-10 text-sm bg-background text-foreground shadow-none focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Giá trị <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, amount: e.target.value }))
                  }
                  className="w-full h-10 border border-border rounded-lg px-3 text-sm bg-background text-foreground shadow-none focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Ghi chú */}
            <div>
              <label className="text-sm font-bold text-foreground mb-2 block">
                Ghi chú
              </label>
              <textarea
                rows={3}
                value={form.note}
                onChange={(e) =>
                  setForm((f) => ({ ...f, note: e.target.value }))
                }
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-background text-foreground shadow-none focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                placeholder="Nhập ghi chú..."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t bg-muted/20 flex justify-end gap-3">
            <Button
              variant="outline"
              className="gap-2 px-6"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" /> Hủy
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90 px-6 font-semibold">
              <Save className="h-4 w-4" /> Lưu
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
