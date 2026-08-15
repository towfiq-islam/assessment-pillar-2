export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

export type ProductCategory = Product["category"];

export interface ProductsApiResponse {
  success: true;
  count: number;
  products: Product[];
}

export interface ProductsApiError {
  success: false;
  error: string;
}

export type ProductsApiResult = ProductsApiResponse | ProductsApiError;

export interface ProductsQuery {
  category?: string;
  inStock?: boolean;
}
