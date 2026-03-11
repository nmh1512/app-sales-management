import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { SearchInput } from "@/components/ui/search-input";
import {
  Plus,
  Download,
  Filter,
  Edit2,
  Trash2,
  Eye,
  X,
  Save,
  Building2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import type { Branch, BranchForm } from "@/types";


const mockData: Branch[] = [
  {
    id: 3,
    name: "Kho K",
    phone1: "789",
    phone2: "",
    email: "",
    address: "",
    ward: "",
    active: true,
    created_at: "15/11/2025 17:29",
  },
  {
    id: 2,
    name: "Kho Bảo Hành",
    phone1: "888",
    phone2: "999",
    email: "",
    address: "",
    ward: "",
    active: true,
    created_at: "15/11/2025 17:27",
  },
  {
    id: 1,
    name: "Chi nhánh trung tâm 3/2",
    phone1: "0909090906",
    phone2: "0900090909",
    email: "Branch1@example.com",
    address: "Quận Ba Đình, Phường Phúc Xá",
    ward: "",
    active: true,
    created_at: "05/08/2025 14:28",
  },
];

const defaultForm: BranchForm = {
  name: "",
  phone1: "",
  phone2: "",
  email: "",
  address: "",
  ward: "",
  active: true,
};

export default function BranchListPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Branch | null>(null);
  const [form, setForm] = useState<BranchForm>({ ...defaultForm });

  const filtered = mockData.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone1.includes(search) ||
      r.email.toLowerCase().includes(search.toLowerCase()),
  );

  const openCreate = () => {
    setEditingItem(null);
    setForm({ ...defaultForm });
    setIsModalOpen(true);
  };

  const openEdit = (item: Branch) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      phone1: item.phone1,
      phone2: item.phone2,
      email: item.email,
      address: item.address,
      ward: item.ward,
      active: item.active,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-2 rounded-xl">
            <Building2 className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Chi nhánh</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2 px-6">
            <Download className="h-4 w-4" /> Xuất file
          </Button>
          <Button
            className="gap-2 bg-primary hover:bg-primary/90 px-6 font-medium"
            onClick={openCreate}
          >
            <Plus className="h-4 w-4" /> Thêm chi nhánh
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-none flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            placeholder="Theo tên, số điện thoại, email..."
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
                <TableHead className="text-xs font-bold uppercase">
                  TÊN CHI NHÁNH
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[200px]">
                  LIÊN HỆ
                </TableHead>
                <TableHead className="text-xs font-bold uppercase">
                  ĐỊA CHỈ
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[130px]">
                  TRẠNG THÁI
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[160px]">
                  NGÀY TẠO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-center w-[120px]">
                  THAO TÁC
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
                    className="cursor-pointer hover:bg-muted/30 transition-colors border-b"
                    onClick={() => openEdit(row)}
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">
                            {row.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ID: {row.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        {row.phone1 && (
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3 shrink-0" />
                            {row.phone1}
                          </div>
                        )}
                        {row.phone2 && (
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3 shrink-0" />
                            {row.phone2}
                          </div>
                        )}
                        {row.email && (
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3 shrink-0" />
                            {row.email}
                          </div>
                        )}
                        {!row.phone1 && !row.phone2 && !row.email && (
                          <span className="text-xs text-muted-foreground italic">
                            Chưa có thông tin
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      {row.address ? (
                        <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>{row.address}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground italic">
                          Chưa có địa chỉ
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-2 h-2 rounded-full ${row.active ? "bg-green-500" : "bg-muted-foreground"}`}
                        />
                        <span
                          className={`text-sm font-semibold ${row.active ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
                        >
                          {row.active ? "Hoạt động" : "Tạm dừng"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground py-4">
                      {row.created_at}
                    </TableCell>
                    <TableCell
                      className="text-center py-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="text-primary hover:text-primary/80"
                          title="Xem"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openEdit(row)}
                          className="text-blue-500 hover:text-blue-600"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-600"
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

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-0 gap-0 border-border rounded-lg overflow-hidden">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-lg font-bold">
              {editingItem
                ? `Chỉnh sửa chi nhánh: ${editingItem.name}`
                : "Thêm chi nhánh mới"}
            </DialogTitle>
          </DialogHeader>

          <div className="p-6 space-y-5">
            {/* Tên chi nhánh */}
            <div>
              <label className="text-sm font-bold text-foreground mb-2 block">
                Tên chi nhánh <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full h-10 border border-border rounded-lg px-3 text-sm bg-background text-foreground shadow-none focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Nhập tên chi nhánh..."
              />
            </div>

            {/* Phone 1 + Phone 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Điện thoại 1
                </label>
                <input
                  type="text"
                  value={form.phone1}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone1: e.target.value }))
                  }
                  className="w-full h-10 border border-border rounded-lg px-3 text-sm bg-background text-foreground shadow-none focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Nhập số điện thoại 1..."
                />
              </div>
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Điện thoại 2
                </label>
                <input
                  type="text"
                  value={form.phone2}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone2: e.target.value }))
                  }
                  className="w-full h-10 border border-border rounded-lg px-3 text-sm bg-background text-foreground shadow-none focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Nhập số điện thoại 2..."
                />
              </div>
            </div>

            {/* Email */}
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
                placeholder="Nhập địa chỉ chi nhánh..."
              />
            </div>

            {/* Trạng thái */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-foreground">
                Trạng thái hoạt động
              </label>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.active ? "bg-primary" : "bg-muted-foreground/30"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.active ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>

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
