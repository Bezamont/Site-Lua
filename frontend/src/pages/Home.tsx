import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Clock, Tag } from 'lucide-react';

// ============================================================
// Home — Landing page principal
// ============================================================

const SERVICES = [
  {
    icon: Sparkles,
    title: 'Flashes',
    description: 'Desenhos prontos com preço fixo. Exclusivos — cada flash é tatuado uma única vez.',
    cta: 'Ver catálogo',
    to: '/catalogo?tipo=flash',
    accent: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: Clock,
    title: 'Por Hora / Sessão',
    description: 'Projetos personalizados com orçamento baseado no tempo de sessão.',
    cta: 'Solicitar orçamento',
    to: '/agendar',
    accent: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    icon: Tag,
    title: 'Promoções',
    description: 'Rodízios e campanhas especiais com preços exclusivos por tempo limitado.',
    cta: 'Ver promoções',
    to: '/catalogo?tipo=promotion',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
];

export default function HomePage() {
  return (
    <div className="bg-zinc-950 text-white">

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        {/* Glow decorativo */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-500">
            Estúdio de Tatuagem
          </p>
          <h1 className="font-serif text-5xl font-bold leading-tight text-white sm:text-7xl">
            Lua Ink
          </h1>
          <p className="mt-2 font-serif text-2xl italic text-amber-400/70 sm:text-3xl">
            Arte na pele
          </p>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-zinc-400">
            Especializada em fine line, blackwork e traços delicados.
            Cada tatuagem é criada com intenção — permanente como uma memória,
            única como você.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/catalogo"
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-7 py-3 font-medium text-zinc-950 transition hover:bg-amber-400"
            >
              Ver catálogo <ArrowRight size={16} />
            </Link>
            <Link
              to="/agendar"
              className="flex items-center gap-2 rounded-xl border border-zinc-700 px-7 py-3 font-medium text-zinc-300 transition hover:border-amber-500/50 hover:text-white"
            >
              Agendar sessão
            </Link>
          </div>
        </div>

        {/* Seta scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-zinc-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ─── Serviços ─────────────────────────────────────── */}
      <section className="border-t border-zinc-800 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">O que faço</h2>
            <p className="mt-3 text-zinc-400">Escolha o serviço que melhor se encaixa na sua ideia</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, description, cta, to, accent, bg, border }) => (
              <div
                key={title}
                className={`rounded-2xl border ${border} ${bg} p-8 transition hover:scale-[1.02]`}
              >
                <div className={`mb-4 w-fit rounded-xl p-3 ${bg}`}>
                  <Icon size={24} className={accent} />
                </div>
                <h3 className={`font-serif text-xl font-bold ${accent}`}>{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
                <Link
                  to={to}
                  className={`mt-6 inline-flex items-center gap-1 text-sm font-medium ${accent} hover:underline`}
                >
                  {cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sobre ────────────────────────────────────────── */}
      <section id="sobre" className="border-t border-zinc-800 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">Sobre</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
            Sou tatuadora apaixonada por linhas delicadas e traços intencionais.
            Trabalho de forma personalizada, do esboço à execução, garantindo
            que cada tatuagem conte uma história que vai durar a vida toda.
          </p>
          <div className="mt-8 flex justify-center gap-8 text-center">
            {[
              { value: '500+', label: 'Tatuagens realizadas' },
              { value: '5 anos', label: 'De experiência' },
              { value: '100%', label: 'Personalizado' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-3xl font-bold text-amber-400">{value}</p>
                <p className="mt-1 text-sm text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Final ────────────────────────────────────── */}
      <section
        id="contato"
        className="border-t border-zinc-800 px-4 py-20"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.04))',
        }}
      >
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-3xl font-bold">Pronto para tatuar?</h2>
          <p className="mt-3 text-zinc-400">
            Escolha um flash do catálogo ou solicite um orçamento para sua ideia.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/cadastro"
              className="rounded-xl bg-amber-500 px-7 py-3 font-medium text-zinc-950 transition hover:bg-amber-400"
            >
              Criar conta grátis
            </Link>
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-zinc-700 px-7 py-3 font-medium text-zinc-300 transition hover:border-zinc-500"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

