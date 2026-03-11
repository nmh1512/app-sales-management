import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ProductListPage from "./pages/ProductListPage";
import CategoryListPage from "./pages/CategoryListPage";
import BrandListPage from "./pages/BrandListPage";
import OrderListPage from "./pages/OrderListPage";
import ReturnListPage from "./pages/ReturnListPage";
import LoginPage from "./pages/LoginPage";
import PurchaseOrderListPage from "./pages/inventory/PurchaseOrderListPage";
import SupplierReturnListPage from "./pages/inventory/SupplierReturnListPage";
import InventoryDisposalListPage from "./pages/inventory/InventoryDisposalListPage";
import InventoryTransferListPage from "./pages/inventory/InventoryTransferListPage";
import InventoryAuditListPage from "./pages/inventory/InventoryAuditListPage";
import PurchaseOrderFormPage from "./pages/inventory/PurchaseOrderFormPage";
import SupplierReturnFormPage from "./pages/inventory/SupplierReturnFormPage";
import InventoryDisposalFormPage from "./pages/inventory/InventoryDisposalFormPage";
import InventoryTransferFormPage from "./pages/inventory/InventoryTransferFormPage";
import InventoryAuditFormPage from "./pages/inventory/InventoryAuditFormPage";
import FinanceListPage from "./pages/finance/FinanceListPage";
import CustomerListPage from "./pages/customers/CustomerListPage";
import EmployeeListPage from "./pages/employees/EmployeeListPage";
import BranchListPage from "./pages/branches/BranchListPage";
import DailyReportPage from "./pages/reports/DailyReportPage";
import SummaryReportPage from "./pages/reports/SummaryReportPage";
import CustomerReportPage from "./pages/reports/CustomerReportPage";
import SupplierReportPage from "./pages/reports/SupplierReportPage";
import EmployeeReportPage from "./pages/reports/EmployeeReportPage";
import ProductReportPage from "./pages/reports/ProductReportPage";

function AppLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          {/* Pages with MainLayout */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/categories" element={<CategoryListPage />} />
            <Route
              path="/purchase-orders/new"
              element={<PurchaseOrderFormPage />}
            />
            <Route
              path="/supplier-returns/new"
              element={<SupplierReturnFormPage />}
            />
            <Route
              path="/inventory-disposals/new"
              element={<InventoryDisposalFormPage />}
            />
            <Route
              path="/inventory-transfers/new"
              element={<InventoryTransferFormPage />}
            />
            <Route
              path="/inventory-audits/new"
              element={<InventoryAuditFormPage />}
            />
            <Route path="/brands" element={<BrandListPage />} />
            <Route path="/orders" element={<OrderListPage />} />
            <Route path="/returns" element={<ReturnListPage />} />
            <Route
              path="/purchase-orders"
              element={<PurchaseOrderListPage />}
            />
            <Route
              path="/supplier-returns"
              element={<SupplierReturnListPage />}
            />
            <Route
              path="/inventory-disposals"
              element={<InventoryDisposalListPage />}
            />
            <Route
              path="/inventory-transfers"
              element={<InventoryTransferListPage />}
            />
            <Route
              path="/inventory-audits"
              element={<InventoryAuditListPage />}
            />
            <Route path="/finance" element={<FinanceListPage />} />
            <Route path="/customers" element={<CustomerListPage />} />
            <Route path="/employees" element={<EmployeeListPage />} />
            <Route path="/branches" element={<BranchListPage />} />
            <Route path="/reports/daily" element={<DailyReportPage />} />
            <Route path="/reports/summary" element={<SummaryReportPage />} />
            <Route path="/reports/customers" element={<CustomerReportPage />} />
            <Route path="/reports/suppliers" element={<SupplierReportPage />} />
            <Route path="/reports/employees" element={<EmployeeReportPage />} />
            <Route path="/reports/products" element={<ProductReportPage />} />
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-full">
                  <h1 className="text-xl text-muted-foreground">
                    Tính năng đang phát triển
                  </h1>
                </div>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
