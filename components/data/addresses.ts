import type { Address } from "@/types/customer";

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
