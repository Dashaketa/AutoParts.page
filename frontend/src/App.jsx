import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Catalogo from "./components/Catalogo";
import Home from "./pages/Home";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductoDetalle from "./components/ProductoDetalle";
import ScrollToTop from "./components/ui/ScrollToTop";

import AdminLayout from "./components/admin/AdminLayout";
import AdminPedidos from "./components/admin/AdminPedidos";
import AdminProductos from "./components/admin/AdminProductos";
import AdminUsuarios from "./components/admin/AdminUsuarios";
import NuevoProducto from "./components/admin/NuevoProducto";
import EditarProducto from "./components/admin/EditarProducto";
import AdminDashboard from "./components/admin/AdminDashboard";

import SingleOrder from "./components/dashboard/SingleOrder";
import PaymentSuccess from "./pages/PaymentSucces";
import PaymentFail from "./pages/PaymentFail";
import Checkout from "./pages/CheckOut";
import FacturaView from './pages/FacturaView'; // ruta correcta al componente

const RutaPrivada = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  return usuario ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/catalogo" element={<Catalogo />} />

        {/* Ruta checkout independiente y protegida */}
        <Route
          path="/checkout"
          element={
            <RutaPrivada>
              <Checkout />
            </RutaPrivada>
          }
        />

        {/* Rutas admin protegidas */}
        <Route
          path="/admin/*"
          element={
            <RutaPrivada>
              <AdminLayout />
            </RutaPrivada>
          }
        >
          <Route path="pedidos" element={<AdminPedidos />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="productos/nuevo" element={<NuevoProducto />} />
          <Route path="productos/editar/:id" element={<EditarProducto />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="dashboardAdmin" element={<AdminDashboard />} />
        </Route>

        {/* Dashboard usuario */}
        <Route
          path="/dashboard"
          element={
            <RutaPrivada>
              <Dashboard />
            </RutaPrivada>
          }
        />

        {/* Detalle de pedido */}
        <Route
          path="/orders/:orderId"
          element={
            <RutaPrivada>
              <SingleOrder />
            </RutaPrivada>
          }
        />

        {/* Resultados de pago */}
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/fail" element={<PaymentFail />} />
        {/* Factura */}
        <Route
  path="/factura/:facturaId"
  element={
    <RutaPrivada>
      <FacturaView />
    </RutaPrivada>
  }
/>



        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
