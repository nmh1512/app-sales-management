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
import LoginPage from "./pages/LoginPage";

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
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products" element={<ProductListPage />} />
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
      </Routes>
    </Router>
  );
}

export default App;
