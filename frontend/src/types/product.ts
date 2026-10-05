// ============================================================
// TIPOS: Product (Flashes, Tatuagens, Serviços)
// ============================================================

export type ProductType = 'flash' | 'hourly' | 'session' | 'promotion';

export type ProductStatus = 'available' | 'reserved' | 'sold' | 'unavailable';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  type: ProductType;
  status: ProductStatus;
  price: number;            // em centavos
  imageUrls: string[];
  category?: Category;
  categoryId?: string;
  tags?: string[];
  size?: string;            // ex: "5x5 cm", "palm size"
  bodyPart?: string;        // ex: "antebraço", "costela"
  estimatedTime?: number;   // em minutos
  createdAt: string;
  updatedAt: string;
}

// Para produtos do tipo 'hourly' (por hora/sessão)
export interface HourlyPricing {
  id: string;
  label: string;           // ex: "Mini tattoo", "Médio", "Grande"
  minHours: number;
  maxHours?: number;
  pricePerHour: number;    // em centavos
  description?: string;
}

// Para promoções / rodízios
export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;        // percentual (0-100) ou valor fixo
  discountType: 'percent' | 'fixed';
  validFrom: string;
  validUntil: string;
  products?: Product[];
  isActive: boolean;
}
