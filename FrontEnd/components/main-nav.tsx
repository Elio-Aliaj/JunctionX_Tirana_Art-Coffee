"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Coffee,
  Gift,
  Home,
  Menu,
  ShieldCheck,
  ShoppingBag,
  Star,
  User,
  X,
} from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/components/providers/cart-provider";
import { useAuth } from "@/components/providers/auth-provider";

export function MainNav() {
  const pathname = usePathname();
  const { items } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);

  // Base routes that are always shown
  const baseRoutes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/menu",
      label: "Menu",
      icon: Coffee,
      active: pathname === "/menu" || pathname.startsWith("/menu/"),
    },
    {
      href: "/loyalty",
      label: "Loyalty",
      icon: Star,
      active: pathname === "/loyalty",
    },
    {
      href: "/gift-cards",
      label: "Gift",
      icon: Gift,
      active: pathname === "/gift-cards",
    },
  ];

  // Account route - only shown when user is logged in
  const accountRoute = user
    ? [
        {
          href: "/account",
          label: "Account",
          icon: User,
          active: pathname === "/account",
        },
      ]
    : [];

  // Admin route - only shown when user is admin
  const adminRoute = isAdmin
    ? [
        {
          href: "/admin",
          label: "Admin",
          icon: ShieldCheck,
          active: pathname.startsWith("/admin"),
        },
      ]
    : [];

  // Combine all applicable routes
  const allRoutes = [...baseRoutes, ...accountRoute, ...adminRoute];

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-card border-t">
        <div
          className={`grid h-full ${isAdmin ? "grid-cols-5" : "grid-cols-4"}`}
          id="test"
        >
          {allRoutes.slice(0, 5).map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-muted transition-colors",
                route.active && "text-primary"
              )}
            >
              <route.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{route.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex h-16 items-center px-4 border-b bg-card">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setOpen(false)}
              >
                <Image
                  src="logoERe1.png"
                  alt="Maison De Café"
                  width={32}
                  height={32}
                  className="mr-2"
                />

                <span className="font-bold text-xl">Maison De Café</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              {allRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary",
                    route.active ? "text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center">
          <Image
            src="../logooo.png"
            alt="Maison De Café"
            width={32}
            height={32}
            className="mr-2"
          />

          <span className="font-bold text-xl">Maison De Café</span>
        </Link>
        <nav className="ml-auto flex items-center space-x-6">
          {allRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                route.active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
          <Link href="/cart" className="relative">
            <ShoppingBag className="h-6 w-6" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          {!user ? (
            <Button asChild size="sm">
              <Link href="/auth/login">Login</Link>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={logout}>
              Logout
            </Button>
          )}
        </nav>
      </div>
    </>
  );
}
