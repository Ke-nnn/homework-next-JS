import { NextResponse } from "next/server";

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";
const FALLBACK_PRODUCTS_API_URL = "https://dummyjson.com/products?limit=20";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function fetchProducts(url: string) {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "User-Agent": "Next-JS-Product-App/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Product API returned ${response.status}`);
  }

  return response.json();
}

function normalizeProducts(payload: unknown) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (
    payload &&
    typeof payload === "object" &&
    "products" in payload &&
    Array.isArray(payload.products)
  ) {
    return payload.products.map((product) => {
      const item = product as {
        id: number;
        title: string;
        price: number;
        description: string;
        category: string;
        thumbnail: string;
        rating: number;
        reviews?: unknown[];
      };

      return {
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.thumbnail,
        rating: {
          rate: item.rating,
          count: item.reviews?.length ?? 0,
        },
      };
    });
  }

  return [];
}

export async function GET() {
  try {
    const products = normalizeProducts(await fetchProducts(PRODUCTS_API_URL));
    return NextResponse.json(products, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    try {
      const products = normalizeProducts(
        await fetchProducts(FALLBACK_PRODUCTS_API_URL),
      );
      return NextResponse.json(products, {
        headers: { "Cache-Control": "no-store" },
      });
    } catch {
      return NextResponse.json(
        { error: "Products are temporarily unavailable" },
        { status: 502 },
      );
    }
  }
}
