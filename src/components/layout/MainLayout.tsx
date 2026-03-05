import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  LayoutDashboard,
  Settings,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: ShoppingBag, label: "Sản phẩm", path: "/products" },
    { icon: Settings, label: "Cài đặt", path: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-card border-r transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} hidden md:flex flex-col`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <ShoppingBag className="text-primary-foreground h-5 w-5" />
          </div>
          {isSidebarOpen && (
            <span className="font-bold text-xl truncate">SalesPro</span>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {isSidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-3 w-full p-3 text-muted-foreground hover:text-foreground transition-all"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            {isSidebarOpen && (
              <span className="text-sm font-medium">Thu nhỏ</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
          <div className="md:hidden">
            <ShoppingBag className="text-primary h-6 w-6" />
          </div>

          <div className="flex-1 flex justify-end items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Chi nhánh Quận 1</span>
            </div>

            <div className="flex items-center gap-3 border-l pl-4">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold">Admin User</div>
                <div className="text-xs text-muted-foreground">Chủ sở hữu</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-all">
                <User className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}
