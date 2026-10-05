import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getInitials } from '@/lib/utils';

// TODO: Fase 2 — Expandir com cards de agendamentos e pedidos recentes
export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-serif text-amber-400">
          🌙 Lua Ink
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-sm font-bold text-zinc-950">
              {user ? getInitials(user.name) : '?'}
            </div>
            <span className="text-sm text-zinc-300">{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-serif text-white">
          Olá, {user?.name?.split(' ')[0]}! 👋
        </h2>
        <p className="mt-1 text-zinc-400">Bem-vindo(a) à sua área.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link
            to="/meus-agendamentos"
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-amber-500/50 transition"
          >
            <p className="text-2xl">📅</p>
            <p className="mt-2 font-medium">Agendamentos</p>
            <p className="text-sm text-zinc-400">Ver sessões agendadas</p>
          </Link>
          <Link
            to="/meus-pedidos"
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-amber-500/50 transition"
          >
            <p className="text-2xl">🛍️</p>
            <p className="mt-2 font-medium">Pedidos</p>
            <p className="text-sm text-zinc-400">Histórico de compras</p>
          </Link>
          <Link
            to="/catalogo"
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-amber-500/50 transition"
          >
            <p className="text-2xl">🖤</p>
            <p className="mt-2 font-medium">Catálogo</p>
            <p className="text-sm text-zinc-400">Ver flashes disponíveis</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
