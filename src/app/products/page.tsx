import { Metadata } from "next";
import { Suspense } from "react";
import ProductsCartListComponent from "@/components/products/ProductsCartListComponent";
import { ProductType } from "@/components/products/ProductsCartComponent";

async function fetchProducts(): Promise<ProductType[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

// static metadata for product page
export const metadata: Metadata = {
  title: "Products",
  description:
    "This is product page which list down many products from the website.",
  keywords:
    "Product, Clothes for men, Clothes for women, Clothes for kids, E-Commerce website.",
  openGraph: {
    title: "Products",
    description:
      "This is product page which list down many products from the website.",
    images: ["A1_Thumbnail_project.png"],
  },
};

export default function ProductsPage() {
  const productPromise = fetchProducts();

  return (
    <main className="min-h-screen bg-background">
      <section className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground mt-2 mb-8">
          Browse our featured products.
        </p>
      </section>

      <Suspense
        fallback={
          <div className="flex justify-center items-center py-20">
            <p className="text-muted-foreground animate-pulse">
              Loading products...
            </p>
          </div>
        }
      >
        <ProductsCartListComponent productFromApi={productPromise} />
      </Suspense>
    </main>
  );
}
