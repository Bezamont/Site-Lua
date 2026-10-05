import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ============================================================
// Utilitários Globais
// ============================================================

/**
 * Combina classes Tailwind de forma segura, resolvendo conflitos.
 * Uso: cn('px-4 py-2', isActive && 'bg-amber-500', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formata valor em centavos para string de moeda BRL.
 * Ex: 15000 → "R$ 150,00"
 */
export function formatCurrency(valueInCents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueInCents / 100);
}

/**
 * Formata data ISO para formato brasileiro legível.
 * Ex: "2024-03-15T10:00:00Z" → "15 de mar. de 2024"
 */
export function formatDate(
  isoDate: string,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  }).format(new Date(isoDate));
}

/**
 * Formata data + hora.
 * Ex: "2024-03-15T10:00:00Z" → "15/03/2024 às 10:00"
 */
export function formatDateTime(isoDate: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
    .format(new Date(isoDate))
    .replace(',', ' às');
}

/**
 * Formata CPF com máscara.
 * Ex: "12345678900" → "123.456.789-00"
 */
export function formatCpf(cpf: string): string {
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

/**
 * Formata telefone com máscara.
 * Ex: "11999998888" → "(11) 99999-8888"
 */
export function formatPhone(phone: string): string {
  return phone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

/**
 * Gera initiais do nome para avatares.
 * Ex: "Luna Ink" → "LI"
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

/**
 * Trunca string com reticências.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}…`;
}
