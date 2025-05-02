"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { CartItem } from "@/lib/types"
import { generateItemId } from "@/lib/utils"

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "id">) => void
  removeItem: (id: string) => void
  updateItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  const addItem = (item: Omit<CartItem, "id">) => {
    setItems((prev) => {
      // Check if the item already exists with the same options
      const existingItemIndex = prev.findIndex((i) => {
        if (i.productId !== item.productId) return false

        // If no options, just check the product ID
        if (!i.options && !item.options) return true

        // If one has options and the other doesn't, they're different
        if (!i.options || !item.options) return false

        // Check if options match
        if (i.options.length !== item.options.length) return false

        return i.options.every((option) => {
          const matchingOption = item.options?.find((o) => o.name === option.name)
          return matchingOption && matchingOption.choice === option.choice
        })
      })

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const newItems = [...prev]
        newItems[existingItemIndex].quantity += item.quantity
        return newItems
      } else {
        // Add new item
        return [...prev, { ...item, id: generateItemId() }]
      }
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateItemQuantity = (id: string, quantity: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
