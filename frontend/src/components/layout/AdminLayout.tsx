import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Calendar,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

// ============================================================
// AdminLayout — Painel administrativo
// ============================================================

const ADMIN_NAV = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/admin' },
  { icon: Package, label: 'Produtos', to: '/admin/produtos' },
  { icon: ShoppingBag, label: 'Pedidos', to: '/admin/pedidos' },
  { icon: Calendar, label: 'Agendamentos', to: '/admin/agendamentos' },
  { icon: Settings, label: 'Configurações', to: '/admin/config' },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-zinc-800 bg-zinc-900 md:flex">
        {/* Brand Admin */}
        <Link
          to="/admin"
          className="flex h-16 items-center gap-2 border-b border-zinc-800 px-4"
        >
          <span className="text-xl">🌙</span>
          <div>
            <span className="block font-serif text-base font-bold text-amber-400">
              Lua Ink
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-zinc-500">
              Admin
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {ADMIN_NAV.map(({ icon: Icon, label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/admin'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition',
                      isActive
                        ? 'bg-amber-500/10 font-medium text-amber-400'
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    )
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Divider + link site público */}
          <div className="mt-4 border-t border-zinc-800 pt-4">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-600 transition hover:text-zinc-400"
            >
              <ChevronRight size={14} />
              Ver site público
            </Link>
          </div>
        </nav>

        {/* User */}
        <div className="border-t border-zinc-800 p-3">
          <div className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-zinc-950">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white">{user?.name}</p>
              <span className="rounded bg-amber-500/20 px-1 py-0.5 text-[10px] font-semibold text-amber-400">
                Admin
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-500 transition hover:bg-zinc-800 hover:text-red-400"
          >
            <LogOut size={16} /> Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar admin */}
        <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-6">
          <h1 className="text-sm font-medium text-zinc-300">Painel Administrativo</h1>
          <span className="text-xs text-zinc-600">{user?.email}</span>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

