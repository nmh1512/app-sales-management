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
  X,
  Save,
  UserCog,
  Phone,
} from "lucide-react";
import type { Employee, EmployeeForm, EmployeeRole } from "@/types/employees";
import type { Gender } from "@/types/index";


const mockData: Employee[] = [
  {
    id: 1,
    code: "NV000001",
    full_name: "Hà Tảo LK",
    username: "Vuha2003",
    phone: "0825583333",
    roles: ["Quản lý", "Nhân viên bán hàng"],
    dob: "01/01/2003",
    gender: "Nam",
    active: true,
    email: "vuha2003@example.com",
    address: "",
  },
  {
    id: 2,
    code: "NV000002",
    full_name: "Nguyễn Văn B",
    username: "nguyenb",
    phone: "0912345678",
    roles: ["Nhân viên bán hàng"],
    dob: "15/06/1998",
    gender: "Nam",
    active: true,
    email: "",
    address: "",
  },
  {
    id: 3,
    code: "NV000003",
    full_name: "Trần Thị C",
    username: "tranc",
    phone: "0987654321",
    roles: ["Thu ngân"],
    dob: "20/09/2000",
    gender: "Nữ",
    active: false,
    email: "",
    address: "",
  },
];

const roleBadgeClass: Record<EmployeeRole, string> = {
  "Quản lý": "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  "Nhân viên bán hàng":
    "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  "Nhân viên kho":
    "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
  "Thu ngân":
    "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
};

const genderBadge: Record<Gender, string> = {
  Nam: "text-blue-600 dark:text-blue-400",
  Nữ: "text-pink-600 dark:text-pink-400",
  Khác: "text-muted-foreground",
};

const defaultForm: EmployeeForm = {
  full_name: "",
  username: "",
  password: "",
  phone: "",
  email: "",
  dob: "",
  gender: "Nam",
  roles: [],
  address: "",
  active: true,
};

export default function EmployeeListPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Employee | null>(null);
  const [form, setForm] = useState<EmployeeForm>({ ...defaultForm });

  const filtered = mockData.filter(
    (r) =>
      r.full_name.toLowerCase().includes(search.toLowerCase()) ||
      r.code.toLowerCase().includes(search.toLowerCase()) ||
      r.username.toLowerCase().includes(search.toLowerCase()),
  );

  const openCreate = () => {
    setEditingItem(null);
    setForm({ ...defaultForm });
    setIsModalOpen(true);
  };

  const openEdit = (item: Employee) => {
    setEditingItem(item);
    setForm({
      full_name: item.full_name,
      username: item.username,
      password: "",
      phone: item.phone,
      email: item.email,
      dob: item.dob,
      gender: item.gender,
      roles: item.roles,
      address: item.address,
      active: item.active,
    });
    setIsModalOpen(true);
  };

  const toggleRole = (role: EmployeeRole) => {
    setForm((f) => ({
      ...f,
      roles: f.roles.includes(role)
        ? f.roles.filter((r) => r !== role)
        : [...f.roles, role],
    }));
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-2 rounded-xl">
            <UserCog className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Nhân viên</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2 px-6">
            <Download className="h-4 w-4" /> Xuất file
          </Button>
          <Button
            className="gap-2 bg-primary hover:bg-primary/90 px-6 font-medium"
            onClick={openCreate}
          >
            <Plus className="h-4 w-4" /> Thêm nhân viên
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-none flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            placeholder="Theo tên, mã NV, tài khoản..."
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
                <TableHead className="text-xs font-bold uppercase w-[120px]">
                  MÃ
                </TableHead>
                <TableHead className="text-xs font-bold uppercase">
                  HỌ TÊN
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[130px]">
                  TÀI KHOẢN
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[140px]">
                  LIÊN HỆ
                </TableHead>
                <TableHead className="text-xs font-bold uppercase">
                  VAI TRÒ
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[120px]">
                  NGÀY SINH
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[90px]">
                  GIỚI TÍNH
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-center w-[110px]">
                  TRẠNG THÁI
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
                    <TableCell className="font-semibold text-sm py-3">
                      {row.full_name}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground py-3">
                      {row.username}
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3 shrink-0" />
                        {row.phone}
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.roles.map((role) => (
                          <span
                            key={role}
                            className={`text-xs font-semibold px-2 py-0.5 rounded ${roleBadgeClass[role]}`}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground py-3">
                      {row.dob}
                    </TableCell>
                    <TableCell
                      className={`text-sm font-semibold py-3 ${genderBadge[row.gender]}`}
                    >
                      {row.gender}
                    </TableCell>
                    <TableCell
                      className="text-center py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Toggle switch */}
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${row.active ? "bg-primary" : "bg-muted-foreground/30"}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${row.active ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </button>
                    </TableCell>
                    <TableCell
                      className="text-center py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEdit(row)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button className="text-red-500 hover:text-red-600">
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
                ? `Chỉnh sửa nhân viên #${editingItem.code}`
                : "Thêm nhân viên mới"}
            </DialogTitle>
          </DialogHeader>

          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto scrollbar-hide">
            {/* Họ tên + Tài khoản */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Họ tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, full_name: e.target.value }))
                  }
                  className="w-full h-10 border border-border rounded-lg px-3 text-sm bg-background text-foreground shadow-none focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Nhập họ tên..."
                />
              </div>
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Tên tài khoản <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, username: e.target.value }))
                  }
                  className="w-full h-10 border border-border rounded-lg px-3 text-sm bg-background text-foreground shadow-none focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Nhập tên đăng nhập..."
                />
              </div>
            </div>

            {/* Mật khẩu */}
            {!editingItem && (
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  className="w-full h-10 border border-border rounded-lg px-3 text-sm bg-background text-foreground shadow-none focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Nhập mật khẩu..."
                />
              </div>
            )}

            {/* SĐT + Email */}
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

            {/* Ngày sinh + Giới tính */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Ngày sinh
                </label>
                <input
                  type="text"
                  value={form.dob}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, dob: e.target.value }))
                  }
                  className="w-full h-10 border border-border rounded-lg px-3 text-sm bg-background text-foreground shadow-none focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="DD/MM/YYYY"
                />
              </div>
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
            </div>

            {/* Vai trò */}
            <div>
              <label className="text-sm font-bold text-foreground mb-2 block">
                Vai trò <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "Quản lý",
                    "Nhân viên bán hàng",
                    "Nhân viên kho",
                    "Thu ngân",
                  ] as EmployeeRole[]
                ).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className={`px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all ${
                      form.roles.includes(role)
                        ? `${roleBadgeClass[role]} border-transparent`
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Trạng thái */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-foreground">
                Kích hoạt tài khoản
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
