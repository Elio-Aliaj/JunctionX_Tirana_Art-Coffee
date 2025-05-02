import Link from "next/link"
import Image from "next/image"
import { Coffee, Gift, QrCode, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { products } from "@/lib/data"

export default function Home() {
  const popularProducts = products.filter((product) => product.popular).slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
          <Image
            src="/placeholder.svg?height=500&width=1200"
            alt="Coffee shop"
            fill
            className="object-cover"
            priority
          />
          <div className="container relative z-20 px-4 md:px-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Brew Haven</h1>
              <p className="text-xl text-white/90 mb-8">
                Experience the perfect blend of flavor and atmosphere at our digital café.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="font-medium">
                  <Link href="/menu">Order Now</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-medium"
                >
                  <Link href="/loyalty">Join Loyalty Program</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 bg-card">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-muted/50">
                <CardHeader className="pb-2">
                  <Coffee className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Custom Ordering</CardTitle>
                  <CardDescription>Customize your coffee just the way you like it</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Choose your size, milk type, syrups, and more to create your perfect drink.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardHeader className="pb-2">
                  <Star className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Loyalty Program</CardTitle>
                  <CardDescription>Earn points with every purchase</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Join our loyalty program to earn points and unlock exclusive rewards.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardHeader className="pb-2">
                  <QrCode className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Table Ordering</CardTitle>
                  <CardDescription>Scan QR code to order from your table</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Simply scan the QR code on your table to place an order without waiting in line.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Products Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {popularProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                    <Button asChild>
                      <Link href={`/menu/${product.id}`}>Order Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/menu">View Full Menu</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Gift Card Section */}
        <section className="py-12 md:py-16 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Give the Gift of Coffee</h2>
                <p className="text-muted-foreground mb-6">
                  Send a digital gift card to a friend or loved one. Perfect for birthdays, thank yous, or just because.
                </p>
                <Button asChild size="lg" className="font-medium">
                  <Link href="/gift-cards">
                    <Gift className="mr-2 h-5 w-5" />
                    Send a Gift Card
                  </Link>
                </Button>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=300&width=500" alt="Gift Card" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Brew Haven</h3>
              <p className="text-muted-foreground">
                A modern digital café experience with custom ordering, loyalty rewards, and more.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/loyalty" className="text-muted-foreground hover:text-primary transition-colors">
                    Loyalty Program
                  </Link>
                </li>
                <li>
                  <Link href="/gift-cards" className="text-muted-foreground hover:text-primary transition-colors">
                    Gift Cards
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="text-muted-foreground hover:text-primary transition-colors">
                    Account
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <address className="not-italic text-muted-foreground">
                <p>123 Coffee Street</p>
                <p>Brew City, BC 12345</p>
                <p className="mt-2">Email: info@brewhaven.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Brew Haven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
