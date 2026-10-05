import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

// ============================================================
// PublicLayout — Envolve todas as páginas públicas
// ============================================================
export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

