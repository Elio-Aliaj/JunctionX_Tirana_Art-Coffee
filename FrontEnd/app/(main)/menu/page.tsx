"use client"

import Link from "next/link"
import Image from "next/image"
import { Coffee, CupSoda, Dessert, Leaf, QrCode, ScanLine } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { products } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import { useTable } from "@/components/providers/table-provider"

export default function MenuPage() {
  const { hasScannedTable, tableNumber } = useTable()

  const coffeeProducts = products.filter((product) => product.category === "coffee")
  const teaProducts = products.filter((product) => product.category === "tea")
  const pastryProducts = products.filter((product) => product.category === "pastry")
  const coldDrinkProducts = products.filter((product) => product.category === "cold-drink")

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Menu</h1>
          <p className="text-muted-foreground">Browse our selection of handcrafted beverages and delicious pastries.</p>
        </div>
      </div>

      {/* Table Status */}
      {hasScannedTable ? (
        <Alert className="mt-6 bg-success/10 border-success/30">
          <QrCode className="h-4 w-4 text-success" />
          <AlertTitle>Table {tableNumber} Selected</AlertTitle>
          <AlertDescription>
            Your order will be delivered to Table {tableNumber}. You can now place your order.
          </AlertDescription>
        </Alert>
      ) : (
        <Card className="mt-6 mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <ScanLine className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-bold mb-2">Dining In? Scan Your Table's QR Code</h2>
                <p className="text-muted-foreground mb-4">
                  You need to scan your table's QR code before placing an order. This helps us deliver your order to the
                  right table.
                </p>
                <Button asChild>
                  <Link href="/qr-scanner">
                    <QrCode className="mr-2 h-4 w-4" />
                    Scan QR Code
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
                  <Button asChild disabled={!hasScannedTable}>
                    <Link href={hasScannedTable ? `/menu/${product.id}` : "#"}>
                      {hasScannedTable ? "Order" : "Scan QR First"}
                    </Link>
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
                  <Button asChild disabled={!hasScannedTable}>
                    <Link href={hasScannedTable ? `/menu/${product.id}` : "#"}>
                      {hasScannedTable ? "Order" : "Scan QR First"}
                    </Link>
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
                  <Button asChild disabled={!hasScannedTable}>
                    <Link href={hasScannedTable ? `/menu/${product.id}` : "#"}>
                      {hasScannedTable ? "Order" : "Scan QR First"}
                    </Link>
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
                  <Button asChild disabled={!hasScannedTable}>
                    <Link href={hasScannedTable ? `/menu/${product.id}` : "#"}>
                      {hasScannedTable ? "Order" : "Scan QR First"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
