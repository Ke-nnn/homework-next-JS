import { Metadata } from "next";
import ProductsCartListComponent from "@/components/products/ProductsCartListComponent";

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
    images: ["/thumbnail.png"],
  },
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground mt-2 mb-8">
          Browse our featured products.
        </p>
      </section>

      <ProductsCartListComponent apiUrl="/api/products" />
    </main>
  );
}
