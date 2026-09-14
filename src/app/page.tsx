import { HeroSectionComponent } from "@/components/HeroSectionComponent";
import ProductsCartListComponent from "@/components/products/ProductsCartListComponent";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSectionComponent />
      <ProductsCartListComponent apiUrl="https://dummyjson.com/products?limit=20" />
    </main>
  );
}
