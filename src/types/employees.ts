import type { Gender } from "./index";

export type EmployeeRole = "Quản lý" | "Nhân viên bán hàng" | "Nhân viên kho" | "Thu ngân";

export interface Employee {
  id: number;
  code: string;
  full_name: string;
  username: string;
  phone: string;
  roles: EmployeeRole[];
  dob: string;
  gender: Gender;
  active: boolean;
  email: string;
  address: string;
}

export interface EmployeeForm {
  full_name: string;
  username: string;
  password?: string;
  phone: string;
  email: string;
  dob: string;
  gender: Gender;
  roles: EmployeeRole[];
  address: string;
  active: boolean;
}
