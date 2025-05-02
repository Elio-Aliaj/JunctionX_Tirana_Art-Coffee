"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/providers/cart-provider"
import { products } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"

export default function ProductPage({ params }: { params: { productId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCart()

  const product = products.find((p) => p.id === params.productId)

  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, { choice: string; price: number }>>({})

  if (!product) {
    return (
      <div className="container px-4 py-8 md:py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist.</p>
        <Button onClick={() => router.push("/menu")}>Back to Menu</Button>
      </div>
    )
  }

  // Calculate total price based on base price, quantity, and selected options
  const calculateTotalPrice = () => {
    let optionsPrice = 0
    Object.values(selectedOptions).forEach((option) => {
      optionsPrice += option.price
    })

    return (product.price + optionsPrice) * quantity
  }

  const handleOptionChange = (optionName: string, choiceName: string, choicePrice: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: { choice: choiceName, price: choicePrice },
    }))
  }

  const handleAddToCart = () => {
    const options = product.options
      ? product.options.map((option) => {
          const selected = selectedOptions[option.name]
          return {
            name: option.name,
            choice: selected?.choice || option.choices[0].name,
            price: selected?.price || option.choices[0].price,
          }
        })
      : undefined

    addItem({
      productId: product.id,
      name: product.name,
      price: calculateTotalPrice() / quantity,
      quantity,
      options,
      image: product.image,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart.`,
    })
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <Button variant="ghost" className="mb-6 pl-0 flex items-center" onClick={() => router.push("/menu")}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Menu
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground mt-2 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-6">{formatCurrency(product.price)}</p>

          <Separator className="my-6" />

          {product.customizable && product.options && (
            <div className="space-y-6">
              {product.options.map((option) => (
                <div key={option.name}>
                  <h3 className="font-semibold mb-3">{option.name}</h3>
                  <RadioGroup
                    defaultValue={option.choices[0].id}
                    onValueChange={(value) => {
                      const choice = option.choices.find((c) => c.id === value)
                      if (choice) {
                        handleOptionChange(option.name, choice.name, choice.price)
                      }
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {option.choices.map((choice) => (
                        <div key={choice.id} className="flex items-center space-x-2">
                          <RadioGroupItem id={choice.id} value={choice.id} />
                          <Label htmlFor={choice.id} className="flex justify-between w-full">
                            <span>{choice.name}</span>
                            {choice.price > 0 && (
                              <span className="text-muted-foreground">+{formatCurrency(choice.price)}</span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </div>
          )}

          <Separator className="my-6" />

          <div className="flex items-center mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-4 font-medium text-lg">{quantity}</span>
            <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between mb-2">
                <span>Price</span>
                <span>{formatCurrency(calculateTotalPrice())}</span>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" size="lg" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
