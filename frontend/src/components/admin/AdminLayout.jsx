import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <aside className="bg-[#273043] text-white w-full lg:w-64 p-6 space-y-6">
        <h2 className="text-2xl font-bold text-[#EFA00B] mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <NavLink to="pedidos" className="block hover:text-[#EFA00B]">Pedidos</NavLink>
          <NavLink to="productos" className="block hover:text-[#EFA00B]">Productos</NavLink>
          <NavLink to="usuarios" className="block hover:text-[#EFA00B]">Usuarios</NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
