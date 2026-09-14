"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FoodItem } from "@/lib/food-api";

export default function FoodCardComponent({ food }: { food: FoodItem }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Link href={`/foods/${food.id}`} className="block h-full">
      <Card className="rounded-2xl overflow-hidden p-0! gap-0 group/card h-full cursor-pointer hover:shadow-lg transition-shadow duration-300">
        {/* Image zone */}
        <div className="relative overflow-hidden h-52 bg-muted">
          {food.image_url ? (
            <Image
              src={food.image_url}
              alt={food.name}
              className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover/card:scale-105"
              width={500}
              height={300}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl">
              🍽️
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="text-xs font-bold uppercase bg-foreground text-background px-2 py-1 rounded-sm">
              {food.cuisine}
            </span>
            {food.preparation_time_minutes > 0 && (
              <span className="text-xs font-bold uppercase bg-black/70 text-white px-2 py-1 rounded-sm">
                ⏱ {food.preparation_time_minutes}m
              </span>
            )}
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            title="Favorite"
            className={cn(
              "absolute top-3 right-3 h-8 w-8 rounded-full border shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95",
              isFavorite
                ? "bg-rose-50 border-rose-200 dark:bg-rose-950 dark:border-rose-800"
                : "bg-background",
            )}
          >
            <Heart
              className={cn(
                "w-3.5 h-3.5 transition-colors",
                isFavorite
                  ? "fill-rose-500 text-rose-500"
                  : "text-muted-foreground",
              )}
            />
          </button>
        </div>

        {/* Info zone */}
        <CardContent className="px-4 pt-4 pb-2 space-y-1.5">
          <h3 className="text-base font-bold text-foreground truncate">
            {food.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-10">
            {food.description}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-foreground font-bold text-base">
              ${food.price.toFixed(2)}
            </span>
            {food.average_rating != null && (
              <span className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                {food.average_rating.toFixed(1)}
                <span className="text-xs">({food.rating_count})</span>
              </span>
            )}
          </div>

          <div className="text-xs text-muted-foreground font-medium">
            {food.category}
            {food.calories != null && <> · {food.calories} kcal</>}
          </div>
        </CardContent>

        <CardFooter className="px-4 pb-4 border-t-0">
          <span
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-sm",
              food.available
                ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                : "bg-muted text-muted-foreground",
            )}
          >
            {food.available ? "Available" : "Sold out"}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
