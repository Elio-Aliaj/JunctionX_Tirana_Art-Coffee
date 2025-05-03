"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, CreditCard, Gift, Minus, Plus, ShoppingBag, Trash2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/providers/cart-provider"
import { useUser } from "@/components/providers/user-provider"
import { useAuth } from "@/components/providers/auth-provider"
import { formatCurrency, generateOrderId } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { mockGiftCards } from "@/lib/data"

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, removeItem, updateItemQuantity, clearCart, subtotal } = useCart()
  const { user, addPoints } = useUser()
  const { user: authUser, isLoading: isAuthLoading } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isGuestCheckout, setIsGuestCheckout] = useState(false)

  // Gift card states
  const [useGiftCard, setUseGiftCard] = useState(false)
  const [giftCardCode, setGiftCardCode] = useState("")
  const [giftCardApplied, setGiftCardApplied] = useState(false)
  const [appliedGiftCard, setAppliedGiftCard] = useState<{ code: string; balance: number } | null>(null)
  const [giftCardAmount, setGiftCardAmount] = useState(0)

  // Tax calculation
  const taxRate = 0.08
  const taxAmount = subtotal * taxRate
  const totalBeforeGiftCard = subtotal + taxAmount
  const totalAfterGiftCard = Math.max(0, totalBeforeGiftCard - giftCardAmount)

  const handleApplyGiftCard = () => {
    // Find gift card in mock data
    const giftCard = mockGiftCards.find((card) => card.code === giftCardCode)

    if (giftCard) {
      // Calculate how much of the gift card to use
      const amountToUse = Math.min(giftCard.balance, totalBeforeGiftCard)

      setAppliedGiftCard({
        code: giftCard.code,
        balance: giftCard.balance,
      })
      setGiftCardAmount(amountToUse)
      setGiftCardApplied(true)

      toast({
        title: "Gift Card Applied",
        description: `Applied ${formatCurrency(amountToUse)} from gift card ${giftCard.code}.`,
      })
    } else {
      toast({
        title: "Invalid Gift Card",
        description: "The gift card code you entered is invalid. Try GIFT123 or GIFT456.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveGiftCard = () => {
    setGiftCardApplied(false)
    setAppliedGiftCard(null)
    setGiftCardAmount(0)
    setGiftCardCode("")
  }

  const handleCheckout = () => {
    if (items.length === 0) return

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      // Calculate points (1 point per dollar spent) - only for logged in users
      const pointsEarned = Math.floor(totalAfterGiftCard)

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

      router.push(`/order-confirmation?orderId=${orderId}&points=${user ? pointsEarned : 0}`)
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
                  <span>{formatCurrency(taxAmount)}</span>
                </div>

                {/* Gift Card Section */}
                {authUser && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Gift className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="use-gift-card" className="text-sm font-medium">
                          Use Gift Card
                        </Label>
                      </div>
                      <Switch id="use-gift-card" checked={useGiftCard} onCheckedChange={setUseGiftCard} />
                    </div>

                    {useGiftCard && !giftCardApplied && (
                      <div className="mt-2 space-y-2">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Gift card code"
                            value={giftCardCode}
                            onChange={(e) => setGiftCardCode(e.target.value.toUpperCase())}
                            className="flex-1"
                          />
                          <Button onClick={handleApplyGiftCard} size="sm">
                            Apply
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">For demo, try: GIFT123 or GIFT456</p>
                      </div>
                    )}

                    {giftCardApplied && appliedGiftCard && (
                      <div className="mt-2 p-2 bg-muted/50 rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">{appliedGiftCard.code}</p>
                            <p className="text-xs text-muted-foreground">
                              Balance: {formatCurrency(appliedGiftCard.balance - giftCardAmount)} remaining
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">-{formatCurrency(giftCardAmount)}</span>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleRemoveGiftCard}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between pt-4">
              <span className="font-bold">Total</span>
              <div className="text-right">
                {giftCardApplied && giftCardAmount > 0 && (
                  <p className="text-sm text-muted-foreground line-through mb-1">
                    {formatCurrency(totalBeforeGiftCard)}
                  </p>
                )}
                <span className="font-bold">{formatCurrency(totalAfterGiftCard)}</span>
              </div>
            </CardFooter>
          </Card>

          {!isAuthLoading && (
            <>
              {!authUser && !isGuestCheckout ? (
                <div className="mt-4 space-y-4">
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/auth/login">
                      <User className="mr-2 h-4 w-4" />
                      Login to Checkout
                    </Link>
                  </Button>
                  <Button className="w-full" onClick={() => setIsGuestCheckout(true)}>
                    Continue as Guest
                  </Button>
                </div>
              ) : (
                <Button className="w-full mt-4" size="lg" onClick={handleCheckout} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Checkout"}
                </Button>
              )}
            </>
          )}

          {authUser && (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              You'll earn approximately {Math.floor(totalAfterGiftCard)} points with this order.
            </p>
          )}

          {isGuestCheckout && (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Checking out as guest.{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Login
              </Link>{" "}
              to earn loyalty points.
            </p>
          )}

          <div className="mt-4 flex items-center justify-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Secure payment processing</p>
          </div>
        </div>
      </div>
    </div>
  )
}
