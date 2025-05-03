import Link from "next/link"
import Image from "next/image"
import { Coffee, Gift, QrCode, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { products } from "@/lib/data"

export default function Home() {
  const popularProducts = products.filter((product) => product.popular).slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
          <Image src="/hero1.png" alt="Coffee shop" fill className="object-cover" priority />
          <div className="container relative z-20 px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Art Coffee</h1>
                <p className="text-xl text-white/90 mb-8">
                  Experience the perfect blend of flavor and artistry at our digital café.
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
              <div className="hidden md:block">
                <Card className="bg-card/95 backdrop-blur">
                  <CardHeader>
                    <CardTitle>Quick Login</CardTitle>
                    <CardDescription>Access your account to view orders and earn rewards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                          Email
                        </Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-foreground">
                          Password
                        </Label>
                        <Input id="password" type="password" />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button asChild>
                          <Link href="/menu">Login</Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link href="/auth/register">Create Account</Link>
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
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

        {/* Mobile Login Section (only visible on mobile) */}
        <section className="py-8 md:hidden">
          <div className="container px-4">
            <Card>
              <CardHeader>
                <CardTitle>Login to Your Account</CardTitle>
                <CardDescription>Access your orders and earn rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-3">
                  <Button asChild size="lg">
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/auth/register">Create Account</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
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
                <Image src="/images/gift-card.png" alt="Gift Card" fill className="object-cover" />
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
              <h3 className="font-bold text-lg mb-4">Art Coffee</h3>
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
                <p>123 Art Street</p>
                <p>Coffee City, AC 12345</p>
                <p className="mt-2">Email: info@artcoffee.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Art Coffee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
