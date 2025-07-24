
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/actions/contact";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères." }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    const result = await submitContactForm(data);
    setIsSubmitting(false);
    
    if (result.success) {
        setIsSubmitted(true);
    } else {
        toast({
            title: "Erreur",
            description: result.message,
            variant: "destructive",
        });
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          Contactez-nous
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Nous sommes là pour répondre à vos questions. N'hésitez pas à nous contacter.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mt-16">
        <div className="space-y-8">
            <Card className="flex items-start p-6 gap-6">
                <Mail className="h-8 w-8 text-primary mt-1 shrink-0"/>
                <div>
                    <CardTitle className="font-headline text-xl mb-1">Par e-mail</CardTitle>
                    <CardDescription>Pour toute demande générale ou question sur votre commande.</CardDescription>
                    <a href="mailto:contact.essaouira0artisanat@gmail.com" className="font-semibold text-primary hover:underline mt-2 inline-block">
                        contact.essaouira0artisanat@gmail.com
                    </a>
                </div>
            </Card>
            <Card className="flex items-start p-6 gap-6">
                 <Phone className="h-8 w-8 text-primary mt-1 shrink-0" />
                 <div>
                    <CardTitle className="font-headline text-xl mb-1">Par téléphone</CardTitle>
                    <CardDescription>Nous sommes disponibles du Lundi au Vendredi, de 9h à 18h.</CardDescription>
                     <p className="font-semibold text-foreground mt-2">
                        +212 (0)6 57 20 64 99
                    </p>
                </div>
            </Card>
            <Card className="flex items-start p-6 gap-6">
                <MapPin className="h-8 w-8 text-primary mt-1 shrink-0" />
                <div>
                    <CardTitle className="font-headline text-xl mb-1">Notre boutique</CardTitle>
                    <CardDescription>Venez nous rencontrer et découvrir nos produits en personne.</CardDescription>
                    <p className="font-semibold text-foreground mt-2">
                        Essaouira, Maroc
                    </p>
                </div>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Envoyez-nous un message</CardTitle>
                </CardHeader>
                <CardContent>
                    {isSubmitted ? (
                        <div className="text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                            <h3 className="font-headline text-2xl font-semibold mb-2">Message Envoyé !</h3>
                            <p className="text-muted-foreground">Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
                        </div>
                    ) : (
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Votre nom" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Votre email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </div>
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Sujet</FormLabel>
                                <FormControl>
                                    <Input placeholder="Sujet de votre message" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Tapez votre message ici." className="min-h-[120px]" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  <span className="ml-2">Envoi en cours...</span>
                                </>
                            ) : (
                               <>
                                <Send className="mr-2 h-4 w-4" />
                                <span>Envoyer le message</span>
                               </>
                            )}
                        </Button>
                    </form>
                    </Form>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
