import { getProductsCount } from "@/services/productService";
import { getCooperativesCount } from "@/services/cooperativeService";
import AdminDashboardClientPage from "./page-client";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function AdminDashboardPage() {
  const [productsCount, cooperativesCount] = await Promise.all([
    getProductsCount(),
    getCooperativesCount(),
  ]);

  return (
    <>
      <header className="flex items-center gap-4 mb-6 md:hidden">
        <SidebarTrigger />
        <h1 className="font-headline text-2xl font-bold">Admin Panel</h1>
      </header>
      <AdminDashboardClientPage
        productsCount={productsCount}
        cooperativesCount={cooperativesCount}
      />
    </>
  );
}
