import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  LayoutDashboard,
  Settings,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Package,
  Layers,
  Award,
  ShoppingCart,
  FileText,
  RotateCcw,
  Archive,
  Undo2,
  Trash2,
  ArrowLeftRight,
  ClipboardCheck,
  Wallet,
  Users,
  UserCog,
  Building2,
  BarChart2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  icon: any;
  label: string;
  path?: string;
  subItems?: { label: string; path: string; icon: any }[];
}

export function MainLayout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["Sản phẩm"]);
  const location = useLocation();

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label],
    );
  };

  const menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    {
      icon: ShoppingBag,
      label: "Sản phẩm",
      subItems: [
        { label: "Sản phẩm", path: "/products", icon: Package },
        { label: "Danh mục", path: "/categories", icon: Layers },
        { label: "Thương hiệu", path: "/brands", icon: Award },
      ],
    },
    {
      icon: ShoppingCart,
      label: "Đơn hàng",
      subItems: [
        { label: "Đơn hàng", path: "/orders", icon: FileText },
        { label: "Trả hàng", path: "/returns", icon: RotateCcw },
      ],
    },
    {
      icon: Archive,
      label: "Kho",
      subItems: [
        { label: "Nhập hàng", path: "/purchase-orders", icon: Archive },
        { label: "Trả hàng nhập", path: "/supplier-returns", icon: Undo2 },
        { label: "Xuất hủy", path: "/inventory-disposals", icon: Trash2 },
        {
          label: "Chuyển kho",
          path: "/inventory-transfers",
          icon: ArrowLeftRight,
        },
        { label: "Kiểm kho", path: "/inventory-audits", icon: ClipboardCheck },
      ],
    },
    { icon: Wallet, label: "Tài chính", path: "/finance" },
    { icon: Users, label: "Khách hàng", path: "/customers" },
    { icon: UserCog, label: "Nhân viên", path: "/employees" },
    { icon: Building2, label: "Chi nhánh", path: "/branches" },
    {
      icon: BarChart2,
      label: "Báo cáo",
      subItems: [
        { label: "Báo cáo ngày", path: "/reports/daily", icon: BarChart2 },
        {
          label: "Báo cáo tổng hợp",
          path: "/reports/summary",
          icon: BarChart2,
        },
        {
          label: "Báo cáo KH.",
          path: "/reports/customers",
          icon: Users,
        },
      ],
    },

    { icon: Settings, label: "Cài đặt", path: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-card border-r transition-all duration-300 hidden md:flex flex-col relative z-20",
          isSidebarOpen ? "w-64" : "w-20",
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <ShoppingBag className="text-primary-foreground h-5 w-5" />
          </div>
          {isSidebarOpen && (
            <span className="font-bold text-xl truncate tracking-tight text-foreground">
              SalesPro
            </span>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => {
            const isExpanded = expandedMenus.includes(item.label);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isAnySubItemActive =
              hasSubItems &&
              item.subItems?.some((si) => location.pathname === si.path);
            const isActive =
              item.path === location.pathname || isAnySubItemActive;

            if (hasSubItems) {
              return (
                <div key={item.label} className="space-y-1">
                  <button
                    onClick={() => isSidebarOpen && toggleMenu(item.label)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl transition-all group",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 shrink-0",
                        isActive && "text-primary",
                      )}
                    />
                    {isSidebarOpen && (
                      <>
                        <span className="font-semibold flex-1 text-left text-sm">
                          {item.label}
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        ) : (
                          <ChevronRight className="h-4 w-4 opacity-50" />
                        )}
                      </>
                    )}
                  </button>

                  {isSidebarOpen && isExpanded && (
                    <div className="ml-4 pl-4 border-l-2 border-muted space-y-1 mt-1 pb-2">
                      {item.subItems?.map((subItem) => {
                        const isSubActive = location.pathname === subItem.path;
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={cn(
                              "flex items-center gap-3 p-2.5 rounded-lg transition-all text-sm",
                              isSubActive
                                ? "bg-primary text-primary-foreground font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted",
                            )}
                          >
                            <subItem.icon className="h-4 w-4 shrink-0" />
                            <span>{subItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path!}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isSidebarOpen && (
                  <span className="text-sm font-semibold">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-3 w-full p-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            {isSidebarOpen && (
              <span className="text-sm font-semibold">Thu nhỏ</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b bg-card px-6 flex items-center justify-between z-10">
          <div className="md:hidden">
            <ShoppingBag className="text-primary h-6 w-6" />
          </div>

          <div className="flex-1 flex justify-end items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-xs font-semibold">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse border-2 border-background"></div>
              <span>Chi nhánh Quận 1</span>
            </div>

            <div className="flex items-center gap-3 border-l border-border pl-4">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-foreground">
                  Admin User
                </div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                  Chủ sở hữu
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-all">
                <User className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-hide bg-background/50">
          {children}
        </main>
      </div>
    </div>
  );
}
