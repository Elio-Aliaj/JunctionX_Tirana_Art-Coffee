import Link from "next/link"
import Image from "next/image"
import { Coffee, CupSoda, Dessert, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"

export default function MenuPage() {
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
                    <Link href={`/menu/${product.id}`}>Order</Link>
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
                    <Link href={`/menu/${product.id}`}>Order</Link>
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
                    <Link href={`/menu/${product.id}`}>Order</Link>
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
                    <Link href={`/menu/${product.id}`}>Order</Link>
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
