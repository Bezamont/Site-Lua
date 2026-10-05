import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// TODO: Fase 6 — Dashboard com métricas, gráficos e KPIs
export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-serif text-amber-400">
          🌙 Lua Ink — Admin
        </Link>
        <button
          onClick={logout}
          className="text-sm text-zinc-400 hover:text-white transition"
        >
          Sair
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-serif">Painel Administrativo</h2>
        <p className="mt-1 text-zinc-400">Logado como {user?.email}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/admin/produtos"
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-amber-500/50 transition"
          >
            <p className="text-2xl">🖼️</p>
            <p className="mt-2 font-medium">Produtos & Flashes</p>
            <p className="text-sm text-zinc-400">Gerenciar catálogo</p>
          </Link>
          <Link
            to="/admin/pedidos"
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-amber-500/50 transition"
          >
            <p className="text-2xl">📦</p>
            <p className="mt-2 font-medium">Pedidos</p>
            <p className="text-sm text-zinc-400">Status e histórico</p>
          </Link>
          <Link
            to="/admin/agendamentos"
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-amber-500/50 transition"
          >
            <p className="text-2xl">📅</p>
            <p className="mt-2 font-medium">Agendamentos</p>
            <p className="text-sm text-zinc-400">Agenda e disponibilidade</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
