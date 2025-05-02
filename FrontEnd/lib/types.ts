export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: "coffee" | "tea" | "pastry" | "cold-drink"
  image: string
  available: boolean
  popular: boolean
  customizable: boolean
  options?: ProductOption[]
}

export interface ProductOption {
  name: string
  choices: {
    id: string
    name: string
    price: number
  }[]
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  options?: {
    name: string
    choice: string
    price: number
  }[]
  image: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: "pending" | "preparing" | "ready" | "delivered" | "completed"
  createdAt: string
  tableNumber?: string
  customer?: {
    id: string
    name: string
    email: string
  }
}

export interface User {
  id: string
  name: string
  email: string
  points: number
  level: "bronze" | "silver" | "gold"
  orders: string[]
  favoriteOrders: string[]
}

export interface GiftCard {
  id: string
  code: string
  amount: number
  balance: number
  sender: {
    name: string
    email: string
  }
  recipient: {
    name: string
    email: string
  }
  message?: string
  createdAt: string
  expiresAt: string
  isRedeemed: boolean
}

export interface Reward {
  id: string
  name: string
  description: string
  pointsCost: number
  image: string
}

export interface LoyaltyLevel {
  name: "bronze" | "silver" | "gold"
  threshold: number
  benefits: string[]
  color: string
}
