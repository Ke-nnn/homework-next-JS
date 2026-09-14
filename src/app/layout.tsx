import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarComponent } from "@/components/NavbarComponent";
import { FooterComponent } from "@/components/FooterComponent";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import StyledComponentsRegistry from "@/StyleComponentRegistry";
import NetworkStatusProvider from "@/components/NetworkStatusProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"),
  ),
  title: {
    template: "%s | blockComerce",
    default: "blockComerce",
  },
  description:
    "blockComerce is a platform for discovering and exploring delicious food.",
  keywords: ["blockComerce", "food", "restaurants", "dishes", "food discovery"],
  openGraph: {
    title: "blockComerce",
    description:
      "blockComerce is a platform for discovering and exploring delicious food.",
    images: ["/thumbnail.png"],
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <NetworkStatusProvider>
            <ErrorBoundary errorComponent={undefined}>
              <NavbarComponent />
              {children}
              <FooterComponent />
            </ErrorBoundary>
          </NetworkStatusProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
