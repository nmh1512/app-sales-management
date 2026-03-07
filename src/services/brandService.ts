import type { Brand } from "@/types";

const MOCK_BRANDS: Brand[] = [
  {
    id: 1,
    name: "Apple",
    description: "Apple Inc.",
    created_at: "2024-01-01",
    products_count: 25,
  },
  {
    id: 2,
    name: "Samsung",
    description: "Samsung Electronics",
    created_at: "2024-01-02",
    products_count: 20,
  },
  {
    id: 3,
    name: "Xiaomi",
    description: "Xiaomi Corporation",
    created_at: "2024-01-03",
    products_count: 15,
  },
  {
    id: 4,
    name: "Oppo",
    description: "Oppo Mobile",
    created_at: "2024-01-04",
    products_count: 10,
  },
];

export const brandService = {
  getAll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_BRANDS;
  },
  create: async (data: Omit<Brand, "id" | "created_at" | "products_count">) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      ...data,
      id: Math.floor(Math.random() * 1000),
      created_at: new Date().toISOString(),
      products_count: 0,
    };
  },
  update: async (id: number, data: Partial<Brand>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id, ...data };
  },
  delete: async (_id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  },
};
