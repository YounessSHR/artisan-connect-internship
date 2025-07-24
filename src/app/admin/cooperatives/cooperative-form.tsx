
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createCooperative, updateCooperative } from "@/actions/cooperatives";
import type { Cooperative, Artisan } from "@/lib/definitions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const artisanSchema = z.object({
  id: z.string().optional(), // Keep track of existing artisans
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  bio: z.string().min(10, "La bio doit contenir au moins 10 caractères."),
  imageUrl: z.string().url("URL d'image invalide.").optional().or(z.literal('')),
  imageHint: z.string().optional(),
});

const cooperativeFormSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères."),
  story: z.string().min(10, "L'histoire doit contenir au moins 10 caractères."),
  mission: z.string().min(10, "La mission doit contenir au moins 10 caractères."),
  imageUrl: z.string().url("URL invalide.").optional().or(z.literal('')),
  imageHint: z.string().optional(),
  contact: z.object({
    email: z.string().email("Email invalide."),
    phone: z.string().min(10, "Numéro de téléphone invalide."),
    address: z.string().min(5, "Adresse invalide."),
  }),
  artisans: z.array(artisanSchema).optional(),
});

type CooperativeFormValues = z.infer<typeof cooperativeFormSchema>;

interface CooperativeFormProps {
  cooperative?: Cooperative | null;
  onFormSubmit?: () => void;
}

export function CooperativeForm({ cooperative, onFormSubmit }: CooperativeFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!cooperative;

  const form = useForm<CooperativeFormValues>({
    resolver: zodResolver(cooperativeFormSchema),
    defaultValues: cooperative ? {
      name: cooperative.name || "",
      story: cooperative.story || "",
      mission: cooperative.mission || "",
      imageUrl: cooperative.imageUrl || "",
      imageHint: cooperative.imageHint || "",
      contact: {
        email: cooperative.contact?.email || "contact.essaouira0artisanat@gmail.com",
        phone: cooperative.contact?.phone || "+212 (0)6 57 20 64 99",
        address: cooperative.contact?.address || "Essaouira, Maroc",
      },
      artisans: cooperative.artisans || [],
    } : {
      name: "",
      story: "",
      mission: "",
      imageUrl: "",
      imageHint: "",
      contact: {
        email: "contact.essaouira0artisanat@gmail.com",
        phone: "+212 (0)6 57 20 64 99",
        address: "Essaouira, Maroc",
      },
      artisans: [],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "artisans",
  });

  async function onSubmit(data: CooperativeFormValues) {
    setIsLoading(true);
    const result = isEditing
      ? await updateCooperative(cooperative.id, data)
      : await createCooperative(data);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Succès",
        description: result.message,
      });
      onFormSubmit?.();
      router.refresh();
    } else {
      toast({
        title: "Erreur",
        description: result.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la coopérative</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="story"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Histoire</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mission</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de l'image (Optionnel)</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/600x400.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageHint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Indice pour l'image (Optionnel)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 'argan oil production'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Separator />
        
        <div className="space-y-2">
            <h3 className="text-lg font-medium">Informations de contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="contact.email" render={({ field }) => ( <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="contact.phone" render={({ field }) => ( <FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
            </div>
            <FormField control={form.control} name="contact.address" render={({ field }) => ( <FormItem><FormLabel>Adresse</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-2">Artisans</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-3 p-4 border rounded-md mb-4 relative">
                <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => remove(index)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
                <FormField control={form.control} name={`artisans.${index}.name`} render={({ field }) => ( <FormItem><FormLabel>Nom de l'artisan</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name={`artisans.${index}.bio`} render={({ field }) => ( <FormItem><FormLabel>Bio</FormLabel><FormControl><Textarea {...field} rows={2} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name={`artisans.${index}.imageUrl`} render={({ field }) => ( <FormItem><FormLabel>URL de l'image (Optionnel)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name={`artisans.${index}.imageHint`} render={({ field }) => ( <FormItem><FormLabel>Indice pour l'image (Optionnel)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ id: `new_${Date.now()}`, name: '', bio: '', imageUrl: '', imageHint: '' })}
          >
            Ajouter un Artisan
          </Button>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Enregistrement..." : isEditing ? "Sauvegarder les changements" : "Ajouter la coopérative"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
