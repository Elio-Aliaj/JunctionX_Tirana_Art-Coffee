"use client"

import type React from "react"

import { MainNav } from "@/components/main-nav"
import { CartProvider } from "@/components/providers/cart-provider"
import { UserProvider } from "@/components/providers/user-provider"
import { AuthProvider } from "@/components/providers/auth-provider"

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <div className="relative flex min-h-screen flex-col">
            <MainNav />
            <div className="flex-1 pb-16 md:pb-0">{children}</div>
          </div>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  )
}
