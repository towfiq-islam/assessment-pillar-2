export type OrderStatus = "Delivered" | "Processing" | "Shipped" | "Cancelled";

export interface CustomerOrder {
  id: string;
  date: string;
  itemsCount: number;
  total: number;
  status: OrderStatus;
}

export interface CustomerProfile {
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  defaultAddress: string;
}

export interface Address {
  id: string;
  label: string;
  recipient: string;
  line: string;
  isDefault: boolean;
}

