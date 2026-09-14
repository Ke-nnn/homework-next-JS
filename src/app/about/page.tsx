import { Metadata } from "next";
import productThumbnail from "../products/1.png";

export default function page() {
  return <div>About Page</div>;
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
