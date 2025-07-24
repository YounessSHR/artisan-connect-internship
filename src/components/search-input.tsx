"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchInput({ onSearch }: { onSearch?: () => void }) {
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("query") as string;
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      if (onSearch) {
        onSearch();
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        name="query"
        placeholder="Rechercher des produits..."
        className="pl-12 text-lg h-12"
        autoFocus
      />
    </form>
  );
}
