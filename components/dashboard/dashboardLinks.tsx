import type { ReactNode } from "react";
import { FiGrid, FiMapPin, FiPackage, FiSettings } from "react-icons/fi";

export interface SidebarLink {
  label: string;
  path: string;
  icon: ReactNode;
}

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: <FiGrid className="h-4 w-4" />,
  },
  {
    label: "Orders",
    path: "/dashboard/orders",
    icon: <FiPackage className="h-4 w-4" />,
  },
 
  {
    label: "Addresses",
    path: "/dashboard/addresses",
    icon: <FiMapPin className="h-4 w-4" />,
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icon: <FiSettings className="h-4 w-4" />,
  },
];
