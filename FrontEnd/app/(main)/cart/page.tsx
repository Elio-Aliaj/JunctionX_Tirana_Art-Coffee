"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/providers/cart-provider"
import { useUser } from "@/components/providers/user-provider"
import { formatCurrency, generateOrderId } from "@/lib/utils"

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, removeItem, updateItemQuantity, clearCart, subtotal } = useCart()
  const { user, addPoints } = useUser()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = () => {
    if (items.length === 0) return

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      // Calculate points (1 point per dollar spent)
      const pointsEarned = Math.floor(subtotal)

      if (user) {
        addPoints(pointsEarned)
      }

      const orderId = generateOrderId()

      clearCart()
      setIsProcessing(false)

      toast({
        title: "Order Placed!",
        description: `Your order #${orderId.split("-")[1]} has been placed successfully.`,
      })

      router.push(`/order-confirmation?orderId=${orderId}&points=${pointsEarned}`)
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="container px-4 py-8 md:py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild>
                <Link href="/menu">Browse Menu</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:py-12 max-w-4xl mx-auto">
      <Button variant="ghost" className="mb-6 pl-0 flex items-center" onClick={() => router.push("/menu")}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Continue Shopping
      </Button>

      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Items ({items.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li key={item.id} className="p-4">
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        {item.options && item.options.length > 0 && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {item.options.map((option, index) => (
                              <div key={index}>
                                {option.name}: {option.choice}
                                {option.price > 0 && ` (+${formatCurrency(option.price)})`}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 ml-auto text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatCurrency(subtotal * 0.08)}</span>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between pt-4">
              <span className="font-bold">Total</span>
              <span className="font-bold">{formatCurrency(subtotal * 1.08)}</span>
            </CardFooter>
          </Card>

          <Button className="w-full mt-4" size="lg" onClick={handleCheckout} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Checkout"}
          </Button>

          {user && (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              You'll earn approximately {Math.floor(subtotal)} points with this order.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
