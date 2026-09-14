"use client";

import { use } from "react";
import FoodCardComponent from "./FoodCardComponent";
import type { FoodItem } from "@/lib/food-api";

interface FoodListProps {
  foodPromise: Promise<FoodItem[]>;
}

export default function FoodCardListComponent({ foodPromise }: FoodListProps) {
  const foods = use(foodPromise);

  if (!foods.length) {
    return (
      <div className="container py-20 text-center text-muted-foreground">
        No food items found.
      </div>
    );
  }

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-16">
      {foods.map((food) => (
        <FoodCardComponent key={food.id} food={food} />
      ))}
    </div>
  );
}
