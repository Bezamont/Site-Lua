// ============================================================
// TIPOS: Booking (Agendamentos)
// ============================================================

import type { User } from './user';
import type { Product } from './product';

export type BookingStatus =
  | 'requested'   // cliente solicitou
  | 'confirmed'   // admin confirmou
  | 'in_progress' // sessão em andamento
  | 'completed'   // sessão finalizada
  | 'cancelled'   // cancelado
  | 'no_show';    // cliente não compareceu

export type BookingType = 'flash' | 'hourly' | 'session' | 'quote';

export interface TimeSlot {
  id: string;
  date: string;           // ISO date string
  startTime: string;      // "HH:mm"
  endTime: string;        // "HH:mm"
  isAvailable: boolean;
  bookingId?: string;
}

export interface BookingQuote {
  id: string;
  bookingId: string;
  estimatedHours: number;
  estimatedPrice: number;   // em centavos
  description: string;
  imageUrl?: string;        // referência de arte enviada pelo cliente
  isApproved?: boolean;
  adminNotes?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  user: User;
  userId: string;
  type: BookingType;
  status: BookingStatus;
  product?: Product;
  productId?: string;
  timeSlot?: TimeSlot;
  timeSlotId?: string;
  quote?: BookingQuote;
  referenceImageUrls?: string[];  // imagens de referência do cliente
  bodyPart?: string;
  size?: string;
  clientNotes?: string;
  adminNotes?: string;
  depositPaid?: boolean;
  depositAmount?: number;         // em centavos
  createdAt: string;
  updatedAt: string;
}

// Payload para criar agendamento
export interface CreateBookingPayload {
  type: BookingType;
  productId?: string;
  timeSlotId?: string;
  preferredDate?: string;   // quando não há slot fixo
  preferredTime?: string;
  bodyPart?: string;
  size?: string;
  referenceImageUrls?: string[];
  clientNotes?: string;
}
