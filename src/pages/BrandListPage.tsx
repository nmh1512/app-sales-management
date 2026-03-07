import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Brand } from "@/types";
import { brandService } from "@/services/brandService";

export default function BrandListPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const data = await brandService.getAll();
    setBrands(data);
  };

  const handleOpenModal = (brand?: Brand) => {
    if (brand) {
      setEditingBrand(brand);
      setFormData({
        name: brand.name,
        description: brand.description || "",
      });
    } else {
      setEditingBrand(null);
      setFormData({ name: "", description: "" });
    }
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBrand) {
      await brandService.update(editingBrand.id, formData);
    } else {
      await brandService.create(formData);
    }
    setIsOpen(false);
    fetchBrands();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
      await brandService.delete(id);
      fetchBrands();
    }
  };

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Thương hiệu</h1>
        <Button
          onClick={() => handleOpenModal()}
          className="gap-2 rounded-lg h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Thêm thương hiệu
        </Button>
      </div>

      <div className="bg-card rounded-2xl border p-4 space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm thương hiệu..."
            className="pl-10 h-10 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50 text-xs font-bold uppercase text-muted-foreground">
              <TableRow>
                <TableHead className="text-xs font-bold uppercase">
                  Tên thương hiệu
                </TableHead>
                <TableHead className="text-xs font-bold uppercase">
                  Mô tả
                </TableHead>
                <TableHead className="text-center text-xs font-bold uppercase">
                  Số SP
                </TableHead>
                <TableHead className="text-right text-xs font-bold uppercase">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBrands.map((brand) => (
                <TableRow
                  key={brand.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-semibold">{brand.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {brand.description || "---"}
                  </TableCell>
                  <TableCell className="text-center">
                    {brand.products_count}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                        onClick={() => handleOpenModal(brand)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
                        onClick={() => handleDelete(brand.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingBrand ? "Cập nhật thương hiệu" : "Thêm thương hiệu mới"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Tên thương hiệu <span className="text-destructive">*</span>
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="VD: Apple, Samsung, Xiaomi..."
                className="rounded-lg h-10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Mô tả</label>
              <Input
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Nhập mô tả ngắn..."
                className="rounded-lg h-10"
              />
            </div>
            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="rounded-lg h-10"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="rounded-lg h-10 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {editingBrand ? "Cập nhật" : "Lưu lại"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
