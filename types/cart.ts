import { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  taxRate: number;
  discount: number;
}
