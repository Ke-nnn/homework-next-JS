import type { Metadata } from "next";
import productThumbnail from "../products/1.png";

export default function DashBoardLayoutConponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
// static metadata
export const metadata: Metadata = {
  title: {
    template: "%s | BlockComerce",
    default: "BlockComerce",
  },

  description:
    "BlockComerce is a platform for discovering and exploring delicious food.",
  keywords:
    "Product, Clothes for men , Clothes for women, Shoes, Accessories, Bags, Watches, Jewelry, Electronics, Home and Kitchen, Beauty and Personal Care, Sports and Outdoors, Toys and Games, Books, Music, Movies and TV Shows, Video Games, Software, Mobile Apps, Web Development Tools, Graphic Design Resources, Photography Equipment, Travel Accessories, Fitness Equipment, Health Supplements",
  openGraph: {
    title: "BlockComerce",
    description:
      "BlockComerce is a platform for discovering and exploring delicious food.",
    images: [productThumbnail.src],
    type: "website",
  },
};
