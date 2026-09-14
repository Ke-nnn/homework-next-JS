import { Suspense } from "react";
import { HeroSectionComponent } from "@/components/HeroSectionComponent";
import ProductsCartListComponent from "@/components/products/ProductsCartListComponent";
import { ProductType } from "@/components/products/ProductsCartComponent";

async function fetchProducts(): Promise<ProductType[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch {
    return [];
  }
}

export const dynamic = "force-dynamic";

export default function Home() {
  const productPromise = fetchProducts();

  return (
    <main className="min-h-screen bg-background">
      <HeroSectionComponent />

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
