"use client";

import { use } from "react";
import ProductsCartComponent, { ProductType } from "./ProductsCartComponent";

export default function ProductsCartListComponent({
  productFromApi,
  products,
}: {
  productFromApi?: Promise<ProductType[]>;
  products?: ProductType[];
}) {
  const resolvedProducts = productFromApi
    ? use(productFromApi)
    : products || [];
  if (!resolvedProducts || resolvedProducts.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">No products found</p>
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
          {resolvedProducts.map((product) => (
            <ProductsCartComponent key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
