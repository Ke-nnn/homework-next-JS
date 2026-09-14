"use client";

import { useEffect, useState } from "react";
import ProductsCartComponent, { ProductType } from "./ProductsCartComponent";

type DummyJsonProduct = Omit<ProductType, "rating" | "image"> & {
  thumbnail: string;
  rating: number;
  reviews?: unknown[];
};

export default function ProductsCartListComponent({
  apiUrl,
  products,
}: {
  apiUrl?: string;
  products?: ProductType[];
}) {
  const [fetchedProducts, setFetchedProducts] = useState<ProductType[]>(
    products || [],
  );
  const [isLoading, setIsLoading] = useState(Boolean(apiUrl));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!apiUrl) {
      return;
    }

    let isActive = true;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json() as Promise<
          ProductType[] | { products: DummyJsonProduct[] }
        >;
      })
      .then((payload) => {
        const nextProducts = Array.isArray(payload)
          ? payload
          : payload.products.map((product) => ({
              id: product.id,
              title: product.title,
              price: product.price,
              description: product.description,
              category: product.category,
              image: product.thumbnail,
              rating: {
                rate: product.rating,
                count: product.reviews?.length ?? 0,
              },
            }));

        if (isActive) {
          setFetchedProducts(nextProducts);
        }
      })
      .catch(() => {
        if (isActive) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [apiUrl]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-muted-foreground animate-pulse">
          Loading products...
        </p>
      </div>
    );
  }

  if (hasError || fetchedProducts.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-muted-foreground">
          Products are temporarily unavailable.
        </p>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fetchedProducts.map((product) => (
            <ProductsCartComponent key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
