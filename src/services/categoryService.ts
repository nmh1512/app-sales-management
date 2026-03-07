import type { Category } from "@/types";

const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Điện thoại", code: "DT", created_at: "2024-01-01", products_count: 15 },
  { id: 11, name: "iPhone", code: "IPHONE", parent_id: 1, created_at: "2024-01-01", products_count: 10 },
  { id: 12, name: "Samsung Galaxy", code: "SSG", parent_id: 1, created_at: "2024-01-01", products_count: 5 },
  { id: 2, name: "Laptop", code: "LT", created_at: "2024-01-02", products_count: 8 },
  { id: 21, name: "MacBook", code: "MAC", parent_id: 2, created_at: "2024-01-02", products_count: 5 },
  { id: 22, name: "Dell", code: "DELL", parent_id: 2, created_at: "2024-01-02", products_count: 3 },
  { id: 3, name: "Phụ kiện", code: "PK", created_at: "2024-01-03", products_count: 42 },
  { id: 31, name: "Sạc & Cáp", code: "CHGCBL", parent_id: 3, created_at: "2024-01-03", products_count: 20 },
  { id: 32, name: "Tai nghe", code: "EAR", parent_id: 3, created_at: "2024-01-03", products_count: 22 },
  { id: 4, name: "Máy tính bảng", code: "MTB", created_at: "2024-01-04", products_count: 5 },
];

export const categoryService = {
  getAll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_CATEGORIES;
  },
  create: async (data: Omit<Category, "id" | "created_at" | "products_count">) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { 
      ...data, 
      id: Math.floor(Math.random() * 1000), 
      created_at: new Date().toISOString(), 
      products_count: 0 
    };
  },
  update: async (id: number, data: Partial<Category>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id, ...data };
  },
  delete: async (_id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  }
};
