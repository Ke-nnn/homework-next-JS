import { Suspense } from "react";
import FoodCardListComponent from "@/components/foods/FoodCardListComponent";
import { fetchFoodItems } from "@/lib/food-api";

export const metadata = {
  title: "Foods",
  description: "Browse all food items from the Food Recommendation API",
};

export const dynamic = "force-dynamic";

export default function FoodsPage() {
  const foodPromise = fetchFoodItems(0, 100).catch(() => []);

  return (
    <main className="min-h-screen bg-background">
      <section className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight">Food Items</h1>
        <p className="text-muted-foreground mt-2 mb-8">
          Browse all available dishes from our partner restaurants.
        </p>
      </section>

      <Suspense
        fallback={
          <div className="flex justify-center items-center py-20">
            <p className="text-muted-foreground animate-pulse">
              Loading foods...
            </p>
          </div>
        }
      >
        <FoodCardListComponent foodPromise={foodPromise} />
      </Suspense>
    </main>
  );
}
