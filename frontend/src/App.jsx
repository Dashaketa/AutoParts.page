// src/App.jsx
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

import SingleOrder from "./components/dashboard/SingleOrder";
import PaymentSuccess from "./pages/PaymentSucces";
import PaymentFail from "./pages/PaymentFail";

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
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/catalogo" element={<Catalogo />} />

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
        </Route>

        {/** Dashboard **/}
        <Route
          path="/dashboard"
          element={
            <RutaPrivada>
              <Dashboard />
            </RutaPrivada>
          }
        />

        {/** Single Order **/}
        <Route
          path="/orders/:orderId"
          element={
            <RutaPrivada>
              <SingleOrder />
            </RutaPrivada>
          }
        />

                 {/* Páginas de resultado de pago */}
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/fail"    element={<PaymentFail   />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
