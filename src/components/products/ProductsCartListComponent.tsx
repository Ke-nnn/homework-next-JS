"use client";

import { use } from "react";
import ProductsCartComponent, { ProductType } from "./ProductsCartComponent";
import productThumbnail from "@/app/products/1.png";

const fallbackProducts: ProductType[] = [
  {
    id: 1001,
    title: "Everyday Essentials",
    price: 29.99,
    description: "Reliable everyday products selected for your routine.",
    category: "Featured",
    image: productThumbnail.src,
    rating: { rate: 4.5, count: 24 },
  },
  {
    id: 1002,
    title: "Modern Collection",
    price: 49.99,
    description: "Practical products with a clean, modern design.",
    category: "Featured",
    image: productThumbnail.src,
    rating: { rate: 4.3, count: 18 },
  },
  {
    id: 1003,
    title: "Daily Comfort",
    price: 39.99,
    description: "Comfortable choices made for everyday use.",
    category: "Featured",
    image: productThumbnail.src,
    rating: { rate: 4.6, count: 31 },
  },
  {
    id: 1004,
    title: "Customer Favorite",
    price: 59.99,
    description: "A popular pick from our featured collection.",
    category: "Featured",
    image: productThumbnail.src,
    rating: { rate: 4.8, count: 42 },
  },
];

export default function ProductsCartListComponent({
  productFromApi,
  products,
}: {
  productFromApi?: Promise<ProductType[]>;
  products?: ProductType[];
}) {
  const fetchedProducts = productFromApi ? use(productFromApi) : products || [];
  const resolvedProducts = fetchedProducts.length
    ? fetchedProducts
    : fallbackProducts;

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
