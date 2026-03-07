import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ChevronRight,
  ChevronDown,
  FolderOpen,
  Folder,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category } from "@/types";
import { categoryService } from "@/services/categoryService";
import { cn } from "@/lib/utils";

export default function CategoryListPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    parent_id: "" as string | number,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await categoryService.getAll();
    setCategories(data);
  };

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        code: category.code || "",
        description: category.description || "",
        parent_id: category.parent_id || "none",
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: "",
        code: "",
        description: "",
        parent_id: "none",
      });
    }
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      parent_id:
        formData.parent_id === "none" ? undefined : Number(formData.parent_id),
    };

    if (editingCategory) {
      await categoryService.update(editingCategory.id, submitData);
    } else {
      await categoryService.create(submitData);
    }
    setIsOpen(false);
    fetchCategories();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      await categoryService.delete(id);
      fetchCategories();
    }
  };

  // Helper to build hierarchy
  const buildTree = (
    items: Category[],
    parentId?: number,
    level = 0,
  ): any[] => {
    return items
      .filter((item) => item.parent_id === parentId)
      .map((item) => ({
        ...item,
        level,
        hasChildren: items.some((i) => i.parent_id === item.id),
        children: buildTree(items, item.id, level + 1),
      }));
  };

  const flattenTree = (tree: any[], isSearching: boolean): any[] => {
    const result: any[] = [];
    tree.forEach((item) => {
      result.push(item);
      if (
        (expandedIds.includes(item.id) || isSearching) &&
        item.children.length > 0
      ) {
        result.push(...flattenTree(item.children, isSearching));
      }
    });
    return result;
  };

  const isSearching = search.length > 0;
  const categoryTree = buildTree(categories);
  const displayCategories = isSearching
    ? categories.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.code?.toLowerCase().includes(search.toLowerCase()),
      )
    : flattenTree(categoryTree, false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Danh mục sản phẩm</h1>
        <Button
          onClick={() => handleOpenModal()}
          className="gap-2 rounded-lg h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95"
        >
          <Plus className="h-4 w-4" /> Thêm danh mục
        </Button>
      </div>

      <div className="bg-card rounded-2xl border p-4 space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm danh mục..."
            className="pl-10 h-10 rounded-lg border-muted-foreground/20 focus:border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50 text-xs text-muted-foreground uppercase font-bold">
              <TableRow>
                <TableHead className="w-[350px] text-xs font-bold uppercase">
                  Tên danh mục
                </TableHead>
                <TableHead className="text-xs font-bold uppercase">
                  Mã
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
              {displayCategories.map((category) => {
                const level = category.level || 0;
                const isExpanded = expandedIds.includes(category.id);
                const showExpander = category.hasChildren && !isSearching;

                return (
                  <TableRow
                    key={category.id}
                    onClick={() => showExpander && toggleExpand(category.id)}
                    className={cn(
                      "hover:bg-muted/30 transition-colors group",
                      showExpander && "cursor-pointer",
                      level > 0 && "bg-muted/5",
                    )}
                  >
                    <TableCell className="font-semibold">
                      <div
                        className="flex items-center gap-2"
                        style={{ paddingLeft: `${level * 24}px` }}
                      >
                        {showExpander ? (
                          <div className="p-1">
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4 text-primary" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        ) : (
                          <div className="w-6" />
                        )}
                        <div
                          className={cn(
                            "p-1.5 rounded-lg",
                            level === 0
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {level === 0 ? (
                            <FolderOpen className="h-4 w-4" />
                          ) : (
                            <Folder className="h-3.5 w-3.5" />
                          )}
                        </div>
                        <span>{category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-primary/80">
                      {category.code || "---"}
                    </TableCell>
                    <TableCell className="text-muted-foreground italic text-sm">
                      {category.description || "---"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {category.products_count}
                    </TableCell>
                    <TableCell className="text-right">
                      <div
                        className="flex justify-end gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                          onClick={() => handleOpenModal(category)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[450px] rounded-2xl p-0 overflow-hidden">
          <div className="bg-primary/5 p-6 border-b">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <div className="p-2 bg-primary rounded-lg text-primary-foreground">
                  <Plus className="h-5 w-5" />
                </div>
                {editingCategory ? "Cập nhật danh mục" : "Thêm danh mục mới"}
              </DialogTitle>
            </DialogHeader>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold">
                Tên danh mục <span className="text-destructive">*</span>
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="VD: Điện thoại, Laptop..."
                className="rounded-xl h-11 border-muted-foreground/20 focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">Mã danh mục</label>
                <Input
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  placeholder="VD: DT, LT..."
                  className="rounded-xl h-11 border-muted-foreground/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Danh mục cha</label>
                <Select
                  value={String(formData.parent_id)}
                  onValueChange={(v) =>
                    setFormData({ ...formData, parent_id: v })
                  }
                >
                  <SelectTrigger className="rounded-xl h-11 border-muted-foreground/20">
                    <SelectValue placeholder="Chọn danh mục cha" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="none">--- Không có ---</SelectItem>
                    {categories
                      .filter((c) => c.id !== editingCategory?.id) // Prevent circular ref
                      .map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Mô tả</label>
              <Input
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Nhập mô tả ngắn..."
                className="rounded-xl h-11 border-muted-foreground/20 focus:border-primary"
              />
            </div>

            <DialogFooter className="pt-4 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="rounded-xl h-11 px-8"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="rounded-xl h-11 px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                {editingCategory ? "Cập nhật" : "Lưu lại"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
