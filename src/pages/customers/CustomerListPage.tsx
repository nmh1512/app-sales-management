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
  Edit2,
  Trash2,
  X,
  Save,
  Users,
} from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import type { Customer, CustomerForm, CustomerCategory } from "@/types/customers";
import type { Gender } from "@/types/index";


/* ───────── Mock data ───────── */
const mockData: Customer[] = [
  {
    id: 1,
    code: "KH1756014552",
    name: "Cao Minh Đạt- C Mơ",
    gender: "Nam",
    category: "Cá nhân",
    phone: "15616516",
    email: "",
    address: "",
    total_sales: 0,
    debt: 105000000,
    note: "Không có",
    created_at: "09/03/2026 19:35",
  },
  {
    id: 2,
    code: "KH1756014551",
    name: "Duy Trần SG",
    gender: "Nam",
    category: "Cá nhân",
    phone: "12345153",
    email: "",
    address: "",
    total_sales: 572500,
    debt: 0,
    note: "Không có",
    created_at: "06/03/2026 01:30",
  },
  {
    id: 3,
    code: "KH1756014550",
    name: "A Đức 3/2 (H)",
    gender: "Nam",
    category: "Cá nhân",
    phone: "465546",
    email: "",
    address: "",
    total_sales: 465000,
    debt: 0,
    note: "Không có",
    created_at: "28/02/2026 15:29",
  },
  {
    id: 4,
    code: "KH1756014549",
    name: "Thoa- C Mơ",
    gender: "Nữ",
    category: "Cá nhân",
    phone: "56498721321",
    email: "",
    address: "",
    total_sales: 0,
    debt: 0,
    note: "Không có",
    created_at: "26/02/2026 09:55",
  },
  {
    id: 5,
    code: "KH1756014548",
    name: "Thái Linh - C Mơ",
    gender: "Khác",
    category: "Cá nhân",
    phone: "156615165",
    email: "",
    address: "",
    total_sales: 0,
    debt: 0,
    note: "Không có",
    created_at: "22/02/2026 11:03",
  },
  {
    id: 6,
    code: "KH1756014547",
    name: "Minh Hoàng SG",
    gender: "Nữ",
    category: "Cá nhân",
    phone: "156156156",
    email: "",
    address: "",
    total_sales: 1350000,
    debt: 0,
    note: "Không có",
    created_at: "03/02/2026 12:31",
  },
  {
    id: 7,
    code: "KH1756014546",
    name: "Quang Công - C Mơ",
    gender: "Nam",
    category: "Cá nhân",
    phone: "151513127",
    email: "",
    address: "",
    total_sales: 0,
    debt: 0,
    note: "Không có",
    created_at: "30/01/2026 07:41",
  },
  {
    id: 8,
    code: "KH1756014545",
    name: "Thủy (MR Dee)",
    gender: "Nữ",
    category: "Cá nhân",
    phone: "2135156",
    email: "",
    address: "",
    total_sales: 60000,
    debt: 0,
    note: "Không có",
    created_at: "29/01/2026 12:42",
  },
  {
    id: 9,
    code: "KH1756014544",
    name: "Tý Gold SG",
    gender: "Nam",
    category: "Cá nhân",
    phone: "1566516551",
    email: "",
    address: "",
    total_sales: 1770000,
    debt: 590000,
    note: "Không có",
    created_at: "26/01/2026 17:01",
  },
  {
    id: 10,
    code: "KH1756014543",
    name: "A Bảo SG (H)",
    gender: "Nam",
    category: "Cá nhân",
    phone: "9999594",
    email: "",
    address: "",
    total_sales: 190000,
    debt: 0,
    note: "Không có",
    created_at: "23/01/2026 10:26",
  },
];

const genderBadge: Record<Gender, string> = {
  Nam: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  Nữ: "bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400",
  Khác: "bg-muted text-muted-foreground",
};

const defaultForm: CustomerForm = {
  name: "",
  gender: "Nam",
  category: "Cá nhân",
  phone: "",
  email: "",
  address: "",
  note: "",
};

export default function CustomerListPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Customer | null>(null);
  const [form, setForm] = useState<CustomerForm>({ ...defaultForm });

  const filtered = mockData.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.code.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search),
  );

  const openCreate = () => {
    setEditingItem(null);
    setForm({ ...defaultForm });
    setIsModalOpen(true);
  };

  const openEdit = (item: Customer) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      gender: item.gender,
      category: item.category,
      phone: item.phone,
      email: item.email,
      address: item.address,
      note: item.note === "Không có" ? "" : item.note,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-2 rounded-xl">
            <Users className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Khách hàng</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2 px-6">
            <Download className="h-4 w-4" /> Xuất file
          </Button>
          <Button
            className="gap-2 bg-primary hover:bg-primary/90 px-6 font-medium"
            onClick={openCreate}
          >
            <Plus className="h-4 w-4" /> Thêm khách hàng
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-none flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            placeholder="Theo tên, mã KH, số điện thoại..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            wrapperClassName="max-w-sm flex-1"
          />
          <Button variant="outline" className="gap-2 ml-auto">
            <Filter className="h-4 w-4" /> Lọc thêm
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden shadow-none">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
                <TableHead className="text-xs font-bold uppercase w-[140px]">
                  MÃ
                </TableHead>
                <TableHead className="text-xs font-bold uppercase">
                  THÔNG TIN
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[120px]">
                  PHÂN LOẠI
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[130px]">
                  LIÊN HỆ
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-right w-[170px]">
                  TỔNG BÁN
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-right w-[170px]">
                  NỢ HIỆN TẠI
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[100px]">
                  GHI CHÚ
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[160px]">
                  NGÀY TẠO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-center w-[100px]">
                  THAO TÁC
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center text-muted-foreground py-16 text-sm"
                  >
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((row) => (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer hover:bg-muted/30 transition-colors border-b"
                    onClick={() => openEdit(row)}
                  >
                    <TableCell className="font-mono text-xs font-bold text-primary py-3">
                      {row.code}
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="font-semibold text-sm">{row.name}</div>
                      <span
                        className={`text-xs font-semibold px-1.5 py-0.5 rounded ${genderBadge[row.gender]}`}
                      >
                        {row.gender}
                      </span>
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-500/20 dark:text-green-400 border-none font-semibold rounded text-xs">
                        {row.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground py-3">
                      {row.phone}
                    </TableCell>
                    <TableCell className="text-right py-3">
                      <div className="text-sm font-semibold">
                        {formatCurrency(row.total_sales)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {mockData.find((r) => r.id === row.id)?.total_sales
                          ? "1 đơn hàng"
                          : "0 đơn hàng"}
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-3">
                      <span
                        className={`text-sm font-bold ${row.debt > 0 ? "text-red-500" : ""}`}
                      >
                        {formatCurrency(row.debt)}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground py-3">
                      {row.note}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground py-3">
                      {row.created_at}
                    </TableCell>
                    <TableCell
                      className="text-center py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEdit(row)}
                          className="text-blue-500 hover:text-blue-600 transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-600 transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
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
            <DialogTitle className="text-lg font-bold">
              {editingItem
                ? `Chỉnh sửa khách hàng #${editingItem.code}`
                : "Thêm khách hàng mới"}
            </DialogTitle>
          </DialogHeader>

          <div className="p-6 space-y-5">
            {/* Tên + Phân loại */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Tên khách hàng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full h-10 border border-border rounded-lg px-3 text-sm bg-background text-foreground shadow-none focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Nhập tên khách hàng..."
                />
              </div>
            </div>

            {/* Giới tính + Phân loại */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Giới tính
                </label>
                <div className="flex gap-2">
                  {(["Nam", "Nữ", "Khác"] as Gender[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, gender: g }))}
                      className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${
                        form.gender === g
                          ? g === "Nam"
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600"
                            : g === "Nữ"
                              ? "border-pink-500 bg-pink-50 dark:bg-pink-500/10 text-pink-600"
                              : "border-border bg-muted text-foreground"
                          : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Phân loại
                </label>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, category: v as CustomerCategory }))
                  }
                >
                  <SelectTrigger className="h-10 border-border shadow-none focus:ring-1 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cá nhân">Cá nhân</SelectItem>
                    <SelectItem value="Doanh nghiệp">Doanh nghiệp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Số điện thoại + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="w-full h-10 border border-border rounded-lg px-3 text-sm bg-background text-foreground shadow-none focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Nhập số điện thoại..."
                />
              </div>
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full h-10 border border-border rounded-lg px-3 text-sm bg-background text-foreground shadow-none focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Nhập email..."
                />
              </div>
            </div>

            {/* Địa chỉ */}
            <div>
              <label className="text-sm font-bold text-foreground mb-2 block">
                Địa chỉ
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                className="w-full h-10 border border-border rounded-lg px-3 text-sm bg-background text-foreground shadow-none focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Nhập địa chỉ..."
              />
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
