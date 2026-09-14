import { Metadata } from "next";
import Image from "next/image";
import productThumbnail from "../products/1.png";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <section className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <div className="max-w-3xl space-y-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            About | BlockCommerce
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            This is about page of BlockCommerce which details how the service
            was created with mission, vision, and team.
          </p>
        </div>

        <Image
          src={productThumbnail}
          alt="BlockCommerce modern clothing collection"
          priority
          className="h-auto w-full max-w-4xl rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
        />
      </section>
    </main>
  );
}
// static metadata for about page
export const metadata: Metadata = {
  title: "About",
  description:
    "This is about page of BlockCommerce which detail about how the service was created with mission, vision, and team.",
  keywords:
    "Product, Clothes for men, Clothes for women, Clothes for kids, E-Commerce website.",
  openGraph: {
    title: "About",
    description:
      "This is about page of BlockCommerce which detail about how the service was created with mission, vision, and team.",
    images: [productThumbnail.src],
  },
};
