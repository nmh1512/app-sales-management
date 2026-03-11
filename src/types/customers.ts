import type { Gender } from "./index";

export type CustomerCategory = "Cá nhân" | "Doanh nghiệp";

export interface Customer {
  id: number;
  code: string;
  name: string;
  gender: Gender;
  category: CustomerCategory;
  phone: string;
  email: string;
  address: string;
  total_sales: number;
  debt: number;
  note: string;
  created_at: string;
}

export interface CustomerForm {
  name: string;
  gender: Gender;
  category: CustomerCategory;
  phone: string;
  email: string;
  address: string;
  note: string;
}
