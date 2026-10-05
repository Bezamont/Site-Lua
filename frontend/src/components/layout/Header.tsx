import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

// ============================================================
// Header — Navegação pública principal
// ============================================================

const NAV_LINKS = [
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Agendamento', to: '/agendar' },
  { label: 'Sobre', to: '/#sobre' },
  { label: 'Contato', to: '/#contato' },
];

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount, openCart } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌙</span>
          <span className="font-serif text-xl font-bold text-amber-400 tracking-wide">
            Lua Ink
          </span>
        </Link>

        {/* Nav — desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-zinc-400 transition hover:text-amber-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Ações direita */}
        <div className="flex items-center gap-3">
          {/* Carrinho */}
          <button
            onClick={openCart}
            className="relative rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-zinc-950">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-zinc-950 transition hover:bg-amber-400"
              >
                {user?.name?.[0]?.toUpperCase() ?? 'U'}
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 top-10 z-50 w-48 rounded-xl border border-zinc-800 bg-zinc-900 py-1 shadow-xl">
                  <p className="truncate px-4 py-2 text-xs text-zinc-500">
                    {user?.email}
                  </p>
                  <hr className="border-zinc-800" />
                  <Link
                    to="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                  >
                    <LayoutDashboard size={14} /> Minha área
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-amber-400 transition hover:bg-zinc-800"
                    >
                      <User size={14} /> Painel Admin
                    </Link>
                  )}
                  <hr className="border-zinc-800" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 transition hover:bg-zinc-800"
                  >
                    <LogOut size={14} /> Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-lg border border-zinc-700 px-4 py-1.5 text-sm font-medium text-zinc-300 transition hover:border-amber-500 hover:text-amber-400 sm:block"
            >
              Entrar
            </Link>
          )}

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-zinc-800 bg-zinc-900 px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-amber-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {!isAuthenticated && (
              <li>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-amber-400"
                >
                  Entrar / Criar conta
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

