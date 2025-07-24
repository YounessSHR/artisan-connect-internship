
"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Cooperative } from "@/lib/definitions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CooperativeForm } from "./cooperative-form";
import { deleteCooperative } from "@/actions/cooperatives";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface CooperativesTableProps {
  cooperatives: Cooperative[];
  totalPages: number;
  currentPage: number;
  totalCooperatives: number;
}

export function CooperativesTable({ cooperatives, totalPages, currentPage, totalCooperatives }: CooperativesTableProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCooperative, setSelectedCooperative] = useState<Cooperative | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [coopToDelete, setCoopToDelete] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAddClick = () => {
    setSelectedCooperative(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (cooperative: Cooperative) => {
    setSelectedCooperative(cooperative);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (coopId: string) => {
    setCoopToDelete(coopId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!coopToDelete) return;
    startTransition(async () => {
      const result = await deleteCooperative(coopToDelete);
      if (result.success) {
        toast({
          title: "Succès",
          description: result.message,
        });
      } else {
        toast({
          title: "Erreur",
          description: result.message,
          variant: "destructive",
        });
      }
      setIsDeleteDialogOpen(false);
      setCoopToDelete(null);
    });
  };

  const closeForm = () => setIsFormOpen(false);
  
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `/admin/cooperatives?${params.toString()}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Toutes les coopératives ({totalCooperatives})</CardTitle>
          <Button onClick={handleAddClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une coopérative
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="min-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Nom</TableHead>
                <TableHead className="hidden md:table-cell">Mission</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cooperatives.map((coop) => (
                <TableRow key={coop.id}>
                  <TableCell className="hidden sm:table-cell">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                      <Image
                        src={coop.imageUrl}
                        alt={coop.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                        data-ai-hint={coop.imageHint}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{coop.name}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-sm truncate">{coop.mission}</TableCell>
                  <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditClick(coop)}>Modifier</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive focus:bg-destructive/10"
                            onClick={() => handleDeleteClick(coop.id)}
                          >
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {cooperatives.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Aucune coopérative trouvée.
            </div>
          )}
        </div>
         {totalPages > 1 && (
            <div className="mt-8">
                <Pagination>
                <PaginationContent>
                    <PaginationItem>
                    <PaginationPrevious 
                        href={createPageURL(currentPage - 1)}
                        aria-disabled={currentPage <= 1}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
                    />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href={createPageURL(index + 1)} isActive={currentPage === index + 1}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                    <PaginationNext 
                        href={createPageURL(currentPage + 1)}
                        aria-disabled={currentPage >= totalPages}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined}
                    />
                    </PaginationItem>
                </PaginationContent>
                </Pagination>
            </div>
        )}
      </CardContent>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">
              {selectedCooperative ? "Modifier la coopérative" : "Ajouter une nouvelle coopérative"}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh] p-4">
            <CooperativeForm
                cooperative={selectedCooperative}
                onFormSubmit={closeForm}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous absolument sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La coopérative sera définitivement supprimée de la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              disabled={isPending}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isPending ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
