// ============================================================
// TIPOS: Order (Pedidos & Pagamentos)
// ============================================================

import type { User } from './user';
import type { Product } from './product';

export type OrderStatus =
  | 'pending'        // aguardando pagamento
  | 'processing'     // pagamento em análise
  | 'confirmed'      // pago e confirmado
  | 'completed'      // tatuagem realizada
  | 'cancelled'      // cancelado
  | 'refunded';      // reembolsado

export type PaymentMethod = 'pix' | 'credit_card' | 'debit_card';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  product: Product;
  productId: string;
  quantity: number;
  unitPrice: number;   // em centavos (snapshot do preço no momento da compra)
  totalPrice: number;  // em centavos
}

export interface Payment {
  id: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;       // em centavos
  gatewayOrderId?: string;  // ID no Pagar.me
  pixQrCode?: string;
  pixExpiration?: string;
  paidAt?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  user: User;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  payment?: Payment;
  subtotal: number;     // em centavos
  discount: number;     // em centavos
  total: number;        // em centavos
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Payload para criar pedido
export interface CreateOrderPayload {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  paymentMethod: PaymentMethod;
  card?: {
    number: string;
    holderName: string;
    expMonth: string;
    expYear: string;
    cvv: string;
  };
  promotionCode?: string;
}
