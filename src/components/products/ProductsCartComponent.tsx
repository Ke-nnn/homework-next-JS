export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductsCartComponent({
  product,
}: {
  product: ProductType;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          {product.rating && (
            <span className="text-sm font-medium">
              ⭐ {product.rating.rate} ({product.rating.count})
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button className="flex-1">View Details</Button>
          <Button variant="outline" className="flex-1">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
