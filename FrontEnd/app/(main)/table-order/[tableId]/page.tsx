"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Coffee, CupSoda, Dessert, Leaf, QrCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/providers/cart-provider"
import { products } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"

export default function TableOrderPage({ params }: { params: { tableId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { items, clearCart, subtotal } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const tableNumber = params.tableId

  const coffeeProducts = products.filter((product) => product.category === "coffee")
  const teaProducts = products.filter((product) => product.category === "tea")
  const pastryProducts = products.filter((product) => product.category === "pastry")
  const coldDrinkProducts = products.filter((product) => product.category === "cold-drink")

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      clearCart()
      setIsProcessing(false)

      toast({
        title: "Order Placed!",
        description: `Your order has been placed for Table ${tableNumber}.`,
      })

      router.push(`/table-order/${tableNumber}/confirmation`)
    }, 2000)
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <div className="flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Table {tableNumber}</h1>
          </div>
          <p className="text-muted-foreground mt-1">Order directly from your table</p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Your Order</p>
            <p className="font-bold">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/cart">View Cart</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="coffee" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="coffee" className="flex items-center gap-2">
            <Coffee className="h-4 w-4" />
            <span className="hidden sm:inline">Coffee</span>
          </TabsTrigger>
          <TabsTrigger value="tea" className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            <span className="hidden sm:inline">Tea</span>
          </TabsTrigger>
          <TabsTrigger value="cold-drinks" className="flex items-center gap-2">
            <CupSoda className="h-4 w-4" />
            <span className="hidden sm:inline">Cold Drinks</span>
          </TabsTrigger>
          <TabsTrigger value="pastries" className="flex items-center gap-2">
            <Dessert className="h-4 w-4" />
            <span className="hidden sm:inline">Pastries</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="coffee" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {coffeeProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <p className="font-semibold">{formatCurrency(product.price)}</p>
                  <Button asChild>
                    <Link href={`/menu/${product.id}?table=${tableNumber}`}>Order</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tea" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teaProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <p className="font-semibold">{formatCurrency(product.price)}</p>
                  <Button asChild>
                    <Link href={`/menu/${product.id}?table=${tableNumber}`}>Order</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cold-drinks" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {coldDrinkProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <p className="font-semibold">{formatCurrency(product.price)}</p>
                  <Button asChild>
                    <Link href={`/menu/${product.id}?table=${tableNumber}`}>Order</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pastries" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pastryProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <p className="font-semibold">{formatCurrency(product.price)}</p>
                  <Button asChild>
                    <Link href={`/menu/${product.id}?table=${tableNumber}`}>Order</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {items.length > 0 && (
        <div className="fixed bottom-16 md:bottom-4 left-0 right-0 p-4 z-50">
          <div className="container max-w-4xl mx-auto">
            <Card className="bg-card shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {items.length} {items.length === 1 ? "item" : "items"}
                    </p>
                    <p className="font-bold">{formatCurrency(subtotal)}</p>
                  </div>
                  <Button onClick={handlePlaceOrder} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
