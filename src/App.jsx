import { Box, Center, Spinner } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";

// LAZY PAGES
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminHome = lazy(() => import("./pages/home/AdminHome"));
const AdminProducts = lazy(() => import("./pages/products/AdminProducts"));
const AdminOrders = lazy(() => import("./pages/orders/AdminOrders"));
const AdminUsers = lazy(() => import("./pages/users/AdminUsers"));
const AdminProductDetail = lazy(() =>
  import("./pages/products/AdminProductDetail")
);
const AdminStock = lazy(() => import("./pages/stocks/StockHistoryPage"));
const AdminPendingUsers = lazy(() =>
  import("./pages/pendingUsers/AdminPendingUsers")
);

const Loader = () => (
  <Center h="100vh">
    <Spinner size="xl" color="purple.400" />
  </Center>
);

export default function AdminApp() {
  const location = useLocation();

  // 🔐 TOKEN CHECK
  const token = localStorage.getItem("admin_access");

  const isLoginPage = location.pathname === "/";

  // 🔥 GLOBAL GUARD
  if (!token && !isLoginPage) {
    return <Navigate to="/" />;
  }

  if (token && isLoginPage) {
    return <Navigate to="/admin" />;
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* LOGIN */}
          <Route path="/" element={<AdminLogin />} />

          {/* PRIVATE ROUTES */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route element={<AdminDashboard />}>
              <Route index element={<AdminHome />} />
              <Route path="dashboard" element={<AdminHome />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/:id" element={<AdminProductDetail />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="stock" element={<AdminStock />} />
              <Route path="pending-users" element={<AdminPendingUsers />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Box>
  );
}
