
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Votre Panier
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <Card className="text-center p-8 sm:p-12">
           <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-6" strokeWidth={1}/>
          <p className="text-xl text-muted-foreground mb-6">Votre panier est actuellement vide.</p>
          <Button asChild size="lg">
            <Link href="/products">Commencer vos achats</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-4 overflow-hidden">
                  <div className="grid grid-cols-[auto,1fr,auto] items-center gap-4">
                    
                    <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted">
                        <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                            data-ai-hint={item.imageHint}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1 self-start">
                      <Link
                        href={`/products/${item.id}`}
                        className="font-headline font-semibold text-lg hover:text-primary leading-tight"
                      >
                        {item.name}
                      </Link>
                       <p className="text-sm text-muted-foreground">
                        Prix unitaire: ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center border rounded-md w-fit mt-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value) || 1)
                          }
                          className="h-8 text-center border-0 focus-visible:ring-0"
                          aria-label={`Quantité pour ${item.name}`}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end justify-between h-full self-start">
                         <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Supprimer ${item.name} du panier`}
                            className="text-muted-foreground hover:text-destructive h-8 w-8"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                        <p className="font-semibold text-lg text-right mt-auto">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>

                  </div>
                </Card>
              ))}
            </div>
             
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="font-headline text-2xl font-bold mb-6">
                Résumé de la commande
              </h2>
              <div className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Sous-total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Livraison</span>
                    <span>Calculée à la caisse</span>
                  </div>
                  <div className="border-t pt-4 mt-4 flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
              </div>
              <Button size="lg" className="w-full mt-6">
                Passer à la caisse
              </Button>
               {cartItems.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                    >
                      Vider le panier
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action est irréversible et videra complètement votre panier.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={clearCart}>
                        Confirmer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
