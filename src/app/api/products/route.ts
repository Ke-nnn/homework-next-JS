import { NextResponse } from "next/server";

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

export async function GET() {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(PRODUCTS_API_URL, {
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "User-Agent": "Next-JS-Product-App/1.0",
        },
      });

      if (response.ok) {
        const products = await response.json();
        return NextResponse.json(products, {
          headers: { "Cache-Control": "no-store" },
        });
      }
    } catch {
      // Retry once because the upstream API can intermittently fail.
    }
  }

  return NextResponse.json(
    { error: "Products are temporarily unavailable" },
    { status: 502 },
  );
}
