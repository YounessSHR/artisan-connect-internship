import { getCooperatives } from "@/services/cooperativeService";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CooperativesTable } from "./cooperatives-table";

const COOPERATIVES_PER_PAGE = 10;

export default async function AdminCooperativesPage({ searchParams }: { searchParams: { page?: string }}) {
  const currentPage = Number(searchParams?.page) || 1;

  const { cooperatives, totalCooperatives } = await getCooperatives({ page: currentPage, pageSize: COOPERATIVES_PER_PAGE });

  const totalPages = Math.ceil(totalCooperatives / COOPERATIVES_PER_PAGE);

  return (
    <div className="flex flex-col h-full w-full">
      <header className="flex items-center gap-4 mb-6 flex-shrink-0">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-headline text-2xl font-bold">Gestion des Coopératives</h1>
      </header>
      <div className="flex-grow min-h-0 overflow-auto">
        <CooperativesTable 
          cooperatives={cooperatives} 
          totalPages={totalPages}
          currentPage={currentPage}
          totalCooperatives={totalCooperatives}
        />
      </div>
    </div>
  );
}
