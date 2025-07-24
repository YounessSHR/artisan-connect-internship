
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/definitions";
import { ShoppingCart, Minus, Plus } from "lucide-react";

export function ProductAddToCart({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Ajouté au panier",
      description: `${quantity} x ${product.name} a été ajouté à votre panier.`,
    });
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border rounded-md flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11"
          onClick={() => handleQuantityChange(-1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-5 w-5" />
        </Button>
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-16 h-11 text-center border-0 focus-visible:ring-0"
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11"
          onClick={() => handleQuantityChange(1)}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <Button onClick={handleAddToCart} size="lg" className="flex-grow sm:flex-grow-0">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Ajouter au panier
      </Button>
    </div>
  );
}
