
import type { Metadata } from "next";
import { CartProvider } from "@/contexts/cart-provider";
import { AuthProvider } from "@/contexts/auth-provider";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Literata, PT_Sans } from "next/font/google";
import "./globals.css";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/mobile-nav";

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
});

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ArtisanConnect",
  description: "Un Voyage au Cœur de l'Artisanat Marocain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn(literata.variable, ptSans.variable)} suppressHydrationWarning>
       <head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/favicon.svg" color="#a68b64" />
          <meta name="msapplication-TileColor" content="#a68b64" />
          <meta name="theme-color" content="#f5f5dc" />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <SidebarProvider>
              <Sidebar>
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <Link
                      href="/"
                      className="font-headline text-2xl font-bold text-sidebar-primary"
                    >
                      ArtisanConnect
                    </Link>
                  </div>
                  <MobileNav />
                </div>
              </Sidebar>
              <SidebarInset>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </SidebarInset>
            </SidebarProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
