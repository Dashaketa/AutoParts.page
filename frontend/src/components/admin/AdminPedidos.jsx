import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Toast from '../ui/Toast';
import { Download, Search, RefreshCw, ChevronDown, Package, TrendingUp, Clock, CheckCircle, XCircle, Eye, Filter, Calendar, DollarSign, Users, ArrowLeft, FileText, MoreHorizontal } from 'lucide-react';

export default function AdminPedidos() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  // Función para cargar pedidos
  const fetchPedidos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await api.get('pedido/pedidos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPedidos(res.data.pedidos || []);
    } catch (err) {
      setError('Error al obtener pedidos');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  // Componente de acciones para cada pedido
  const PedidoActions = ({ pedido }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleStatusChange = async (newStatus) => {
      try {
        const token = localStorage.getItem('token');
        await api.put(`pedido/pedidos/${pedido.id}`, 
          { estado: newStatus },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPedidos(pedidos.map(p => 
          p.id === pedido.id ? { ...p, estado: newStatus } : p
        ));
        showToast(`Estado cambiado a ${newStatus}`, 'success');
      } catch (error) {
        console.error('Error al cambiar estado:', error);
        showToast('Error al actualizar estado', 'error');
      } finally {
        setIsOpen(false);
      }
    };

    const getOptions = () => {
      const options = [
        { 
          value: 'pendiente', 
          label: 'Poner Pendiente', 
          color: 'text-amber-600 hover:bg-amber-50',
          icon: Clock
        },
        { 
          value: 'completado', 
          label: 'Completar', 
          color: 'text-emerald-600 hover:bg-emerald-50',
          icon: CheckCircle
        },
        { 
          value: 'cancelado', 
          label: 'Cancelar', 
          color: 'text-red-600 hover:bg-red-50',
          icon: XCircle
        }
      ];
      return options.filter(opt => opt.value !== pedido.estado);
    };

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-sm font-medium transition-all duration-200 hover:shadow-sm"
        >
          <MoreHorizontal className="w-4 h-4" />
          Acciones
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl z-20 border border-slate-200 overflow-hidden"
          >
            <div className="py-2">
              {getOptions().map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleStatusChange(option.value)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium transition-colors ${option.color}`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  // Filtrar pedidos según búsqueda y estado
  const filteredPedidos = pedidos.filter(pedido => {
    const matchesSearch = search 
      ? pedido.id.toString().includes(search) || 
        pedido.usuario?.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesStatus = statusFilter !== 'all' 
      ? pedido.estado === statusFilter 
      : true;
    return matchesSearch && matchesStatus;
  });

  // Calcular estadísticas
  const stats = {
    total: pedidos.length,
    pendientes: pedidos.filter(p => p.estado === 'pendiente').length,
    completados: pedidos.filter(p => p.estado === 'completado').length,
    cancelados: pedidos.filter(p => p.estado === 'cancelado').length,
    ingresos: pedidos
      .filter(p => p.estado === 'completado')
      .reduce((sum, p) => sum + (p.total || 0), 0)
  };

  // Opciones de filtro
  const statusOptions = [
    { value: 'all', label: 'Todos', icon: Package, count: stats.total },
    { value: 'pendiente', label: 'Pendientes', icon: Clock, count: stats.pendientes },
    { value: 'completado', label: 'Completados', icon: CheckCircle, count: stats.completados },
    { value: 'cancelado', label: 'Cancelados', icon: XCircle, count: stats.cancelados },
  ];

  // Exportar datos a JSON
  const exportToJson = () => {
    const dataStr = JSON.stringify(filteredPedidos, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pedidos-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showToast('Archivo exportado correctamente', 'success');
  };

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'completado':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (estado) => {
    switch (estado) {
      case 'pendiente':
        return <Clock className="w-3 h-3" />;
      case 'completado':
        return <CheckCircle className="w-3 h-3" />;
      case 'cancelado':
        return <XCircle className="w-3 h-3" />;
      default:
        return <Package className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Navegación superior */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-xl text-slate-600 hover:text-slate-800 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border border-white/20"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al Panel
              </button>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium shadow-lg">
                <Package className="w-4 h-4" />
                Gestión de Pedidos
              </div>
            </div>

            {/* Título principal */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3">
                Administración de Pedidos
              </h1>
              <p className="text-slate-600 text-lg">
                Gestiona y supervisa todos los pedidos de tu tienda
              </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-slate-800">{stats.total}</span>
                </div>
                <h3 className="text-slate-600 font-medium">Total Pedidos</h3>
                <p className="text-sm text-slate-500 mt-1">Todos los pedidos registrados</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-slate-800">{stats.pendientes}</span>
                </div>
                <h3 className="text-slate-600 font-medium">Pendientes</h3>
                <p className="text-sm text-slate-500 mt-1">Esperando procesamiento</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-slate-800">{stats.completados}</span>
                </div>
                <h3 className="text-slate-600 font-medium">Completados</h3>
                <p className="text-sm text-slate-500 mt-1">Pedidos finalizados</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-slate-800">
                    ${stats.ingresos.toLocaleString()}
                  </span>
                </div>
                <h3 className="text-slate-600 font-medium">Ingresos</h3>
                <p className="text-sm text-slate-500 mt-1">De pedidos completados</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Herramientas y filtros */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Búsqueda */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar por ID de pedido o nombre de cliente..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Filtros de estado */}
              <div className="flex flex-wrap gap-2">
                {statusOptions.map(option => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setStatusFilter(option.value)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                        statusFilter === option.value
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {option.label}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        statusFilter === option.value
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {option.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Acciones */}
              <div className="flex gap-2">
                <button
                  onClick={fetchPedidos}
                  className="flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 text-sm font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  Actualizar
                </button>
                <button
                  onClick={exportToJson}
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4" />
                  Exportar
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contenido principal */}
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-indigo-600 rounded-full animate-spin animate-reverse"></div>
              </div>
              <p className="mt-4 text-slate-600 font-medium">Cargando pedidos...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-red-800 font-medium">Error al cargar pedidos</h3>
                  <p className="text-red-700 mt-1">{error}</p>
                  <button
                    onClick={fetchPedidos}
                    className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-sm font-medium transition-colors"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            </motion.div>
          ) : filteredPedidos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/20 shadow-xl"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No se encontraron pedidos</h3>
              <p className="text-slate-600 mb-6">
                {search || statusFilter !== 'all' 
                  ? 'No hay pedidos que coincidan con los filtros actuales'
                  : 'Aún no tienes pedidos registrados'
                }
              </p>
              {(search || statusFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearch('');
                    setStatusFilter('all');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  Limpiar filtros
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          ID Pedido
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Cliente
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Fecha
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Filter className="w-4 h-4" />
                          Estado
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Total
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredPedidos.map((pedido, index) => (
                      <motion.tr
                        key={pedido.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-50/50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                              <span className="text-white font-bold text-sm">#{pedido.id}</span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-800">Pedido #{pedido.id}</div>
                              <div className="text-xs text-slate-500">ID: {pedido.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-800">
                                {pedido.usuario || 'Cliente no especificado'}
                              </div>
                              <div className="text-xs text-slate-500">Cliente</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-800">
                                {new Date(pedido.fecha_pedido).toLocaleDateString('es-ES', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                })}
                              </div>
                              <div className="text-xs text-slate-500">
                                {new Date(pedido.fecha_pedido).toLocaleDateString('es-ES', {
                                  weekday: 'long'
                                })}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border ${getStatusColor(pedido.estado)}`}>
                            {getStatusIcon(pedido.estado)}
                            {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                              <DollarSign className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-800">
                                ${(pedido.total || 0).toLocaleString()}
                              </div>
                              <div className="text-xs text-slate-500">Total</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => navigate(`/orders/${pedido.id}`)}
                              className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                            >
                              <Eye className="w-4 h-4" />
                              Ver Detalle
                            </button>
                            <PedidoActions pedido={pedido} />
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Resumen en el footer */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">
                    Mostrando {filteredPedidos.length} de {pedidos.length} pedidos
                  </span>
                  <div className="flex items-center gap-4 text-slate-600">
                    <span>Total ingresos: <strong className="text-green-600">${stats.ingresos.toLocaleString()}</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <Toast show={toast.show} message={toast.message} type={toast.type} />
      </div>
    </div>
  );
}
