import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { AdminRoute } from './AdminRoute';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';

// ============================================================
// Lazy loading de páginas
// ============================================================

// Públicas
const HomePage         = lazy(() => import('@/pages/Home'));
const CatalogPage      = lazy(() => import('@/pages/catalog/CatalogPage'));
const FlashDetailPage  = lazy(() => import('@/pages/catalog/FlashDetailPage'));

// Auth
const LoginPage        = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage     = lazy(() => import('@/pages/auth/RegisterPage'));

// Cliente
const ClientDashboard  = lazy(() => import('@/pages/client/DashboardPage'));
const ClientBookings   = lazy(() => import('@/pages/client/BookingsPage'));
const ClientOrders     = lazy(() => import('@/pages/client/OrdersPage'));

// Checkout
const CheckoutPage     = lazy(() => import('@/pages/checkout/CheckoutPage'));

// Admin
const AdminDashboard   = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminProducts    = lazy(() => import('@/pages/admin/ProductsPage'));
const AdminOrders      = lazy(() => import('@/pages/admin/OrdersPage'));
const AdminBookings    = lazy(() => import('@/pages/admin/BookingsPage'));

// ─── Spinner de carregamento ──────────────────────────────────
function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
    </div>
  );
}

// ─── Wrappers com layout ─────────────────────────────────────
function PublicLayoutWrapper() {
  return (
    <PublicLayout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </PublicLayout>
  );
}

function ClientLayoutWrapper() {
  return (
    <ClientLayout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </ClientLayout>
  );
}

function AdminLayoutWrapper() {
  return (
    <AdminLayout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </AdminLayout>
  );
}

// ============================================================
// Router
// ============================================================
const router = createBrowserRouter([

  // ─── Rotas Públicas (com Header + Footer) ─────────────────
  {
    element: <PublicLayoutWrapper />,
    children: [
      { path: '/',               element: <HomePage /> },
      { path: '/catalogo',       element: <CatalogPage /> },
      { path: '/catalogo/:id',   element: <FlashDetailPage /> },
    ],
  },

  // ─── Auth (sem layout externo, visual próprio) ─────────────
  { path: '/login',    element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense> },
  { path: '/cadastro', element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense> },

  // ─── Área do Cliente ──────────────────────────────────────
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <ClientLayoutWrapper />,
        children: [
          { path: '/dashboard',          element: <ClientDashboard /> },
          { path: '/meus-agendamentos',  element: <ClientBookings /> },
          { path: '/meus-pedidos',       element: <ClientOrders /> },
        ],
      },
      // Checkout sem a sidebar
      {
        path: '/checkout',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CheckoutPage />
          </Suspense>
        ),
      },
    ],
  },

  // ─── Painel Admin ─────────────────────────────────────────
  {
    path: '/admin',
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayoutWrapper />,
        children: [
          { index: true,              element: <AdminDashboard /> },
          { path: 'produtos',         element: <AdminProducts /> },
          { path: 'pedidos',          element: <AdminOrders /> },
          { path: 'agendamentos',     element: <AdminBookings /> },
        ],
      },
    ],
  },

  // ─── Fallback ─────────────────────────────────────────────
  { path: '*', element: <Navigate to="/" replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

