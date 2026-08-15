import { products } from "./products";
import type { CartItem } from "@/types/cart";

export const cartItems: CartItem[] = [
  { product: products[0], quantity: 1 }, 
  { product: products[3], quantity: 2 }, 
  { product: products[4], quantity: 1 }, 
];
