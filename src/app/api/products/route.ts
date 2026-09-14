import { NextResponse } from "next/server";

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

export async function GET() {
  try {
    const response = await fetch(PRODUCTS_API_URL, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: response.status },
      );
    }

    const products = await response.json();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Products are temporarily unavailable" },
      { status: 502 },
    );
  }
}
