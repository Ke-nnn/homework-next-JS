import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchFoodItem, fetchRestaurant, API_BASE } from "@/lib/food-api";

export default async function FoodDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let food;
  try {
    food = await fetchFoodItem(id);
  } catch {
    notFound();
  }

  // The restaurant may be gone — fail soft.
  const restaurant = food.restaurant_id
    ? await fetchRestaurant(food.restaurant_id).catch(() => null)
    : null;

  return (
    <main className="min-h-screen bg-background container py-10">
      <Link
        href="/foods"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to foods
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
          {food.image_url ? (
            <Image
              src={food.image_url}
              alt={food.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl">
              🍽️
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">{food.name}</h1>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 px-2 py-1 rounded-sm">
              {food.cuisine}
            </span>
            {food.preparation_time_minutes > 0 && (
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 px-2 py-1 rounded-sm">
                ⏱ {food.preparation_time_minutes} min
              </span>
            )}
            <span className="text-xs font-semibold uppercase text-muted-foreground px-2 py-1 rounded-sm bg-muted">
              {food.category}
            </span>
          </div>

          {food.average_rating != null && (
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">
                {food.average_rating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                ({food.rating_count} reviews)
              </span>
            </div>
          )}

          <p className="text-lg font-bold">${food.price.toFixed(2)}</p>
          {food.calories != null && (
            <p className="text-sm text-muted-foreground">
              {food.calories} kcal
            </p>
          )}

          <p className="text-muted-foreground leading-relaxed">
            {food.description}
          </p>

          <span
            className={`inline-block text-sm font-semibold px-3 py-1 rounded-sm ${
              food.available
                ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {food.available ? "Available now" : "Currently sold out"}
          </span>

          {/* Restaurant info */}
          {restaurant && (
            <Card className="mt-4">
              <CardContent className="p-4 space-y-2">
                <p className="text-xs uppercase text-muted-foreground font-semibold">
                  Sold by
                </p>
                <p className="font-bold">{restaurant.name}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> {restaurant.phone}
                  </span>
                  <span>💵 {restaurant.price_range}</span>
                  <span className="capitalize">
                    {restaurant.cuisine_types.join(", ")}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3 pt-2">
            <Button size="lg" className="flex-1" disabled={!food.available}>
              Order Now
            </Button>
            <a
              href={API_BASE}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-11 rounded-md px-8"
            >
              API
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
