import type {
  Address,
  CustomerOrder,
  CustomerProfile,
  WishlistItem,
} from "@/types/customer";

export const customer: CustomerProfile = {
  name: "Jenny Wilson",
  email: "jenny.wilson@example.com",
  avatar: "/assets/images/customer-avatar.jpg",
  memberSince: "March 2023",
  defaultAddress: "123 Product Ave, San Francisco, CA 94103",
};

export const customerOrders: CustomerOrder[] = [
  {
    id: "ORD-8421",
    date: "Aug 10, 2026",
    itemsCount: 2,
    total: 2598,
    status: "Delivered",
  },
  {
    id: "ORD-8390",
    date: "Aug 2, 2026",
    itemsCount: 1,
    total: 649,
    status: "Shipped",
  },
  {
    id: "ORD-8355",
    date: "Jul 22, 2026",
    itemsCount: 3,
    total: 337,
    status: "Processing",
  },
  {
    id: "ORD-8210",
    date: "Jun 30, 2026",
    itemsCount: 1,
    total: 99,
    status: "Cancelled",
  },
  {
    id: "ORD-8144",
    date: "Jun 14, 2026",
    itemsCount: 2,
    total: 1948,
    status: "Delivered",
  },
];

export const customerAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    recipient: "Jenny Wilson",
    line: "123 Product Ave, San Francisco, CA 94103",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    recipient: "Jenny Wilson",
    line: "88 Market St, Suite 400, San Francisco, CA 94105",
    isDefault: false,
  },
];

export const wishlistItems: WishlistItem[] = [
  {
    id: 2,
    name: "Logitech MX Master 3",
    category: "Accessories",
    price: 99,
    image: "/assets/images/logitech-mx-master.jpg",
  },
  {
    id: 6,
    name: "ASUS ROG Zephyrus G14",
    category: "Laptops",
    price: 1749,
    image: "/assets/images/asus-rog-zephyrus.jpg",
  },
];
