import { NextResponse } from "next/server";
import { products } from "@/components/data/products";

export async function GET() {
  return NextResponse.json(products);
}
