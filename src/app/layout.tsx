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
  title: {
    template: "%s | Food Recommendation",
    default: "Food Recommendation",
  },
  description:
    "Food Recommendation is a platform for discovering and exploring delicious food.",
  keywords: [
    "Food Recommendation",
    "food",
    "restaurants",
    "dishes",
    "food discovery",
  ],
  openGraph: {
    title: "Food Recommendation",
    description:
      "Food Recommendation is a platform for discovering and exploring delicious food.",
    images: ["/A1_Thumbnail_project.png"],
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
