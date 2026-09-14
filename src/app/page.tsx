import { HeroSectionComponent } from "@/components/HeroSectionComponent";
import ProductsCartListComponent from "@/components/products/ProductsCartListComponent";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSectionComponent />
      <ProductsCartListComponent apiUrl="/api/products" />
    </main>
  );
}
