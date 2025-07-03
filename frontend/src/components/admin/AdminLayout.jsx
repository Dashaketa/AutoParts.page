"use client"

import { Outlet, NavLink } from "react-router-dom"
import { Package, Users, ShoppingCart, BarChart3, Menu, X } from "lucide-react"
import { useState } from "react"

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { to: "pedidos", label: "Pedidos", icon: ShoppingCart },
    { to: "productos", label: "Productos", icon: Package },
    { to: "usuarios", label: "Usuarios", icon: Users },
    { to: "dashboardAdmin", label: "Dashboard", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        bg-gradient-to-b from-slate-900 to-slate-800 
        text-white w-72 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        shadow-2xl lg:shadow-xl
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Admin Panel
            </h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center space-x-3 px-4 py-3 rounded-xl
                transition-all duration-200 group relative overflow-hidden
                ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }
              `}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
              <span className="font-medium">{item.label}</span>

              {/* Active indicator */}
              <div className="absolute right-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700">
          <div className="flex items-center space-x-3 text-slate-400 text-sm">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-slate-300">Administrador</p>
              <p className="text-xs">Panel de Control</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden bg-white shadow-sm border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-lg font-semibold text-slate-800">Admin Panel</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
