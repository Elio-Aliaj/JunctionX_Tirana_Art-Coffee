import type { Product, Order, User, GiftCard, Reward, LoyaltyLevel } from "./types"

export const products: Product[] = [
  {
    id: "coffee-1",
    name: "Espresso",
    description: "Strong and concentrated coffee served in a small cup",
    price: 3.5,
    category: "coffee",
    image: "/esspreso.jpg",
    available: true,
    popular: true,
    customizable: true,
    options: [
      {
        name: "Size",
        choices: [
          { id: "size-1", name: "Small", price: 0 },
          { id: "size-2", name: "Medium", price: 0.75 },
          { id: "size-3", name: "Large", price: 1.5 },
        ],
      },
      {
        name: "Milk",
        choices: [
          { id: "milk-1", name: "None", price: 0 },
          { id: "milk-2", name: "Whole Milk", price: 0 },
          { id: "milk-3", name: "Oat Milk", price: 0.5 },
          { id: "milk-4", name: "Almond Milk", price: 0.5 },
        ],
      },
      {
        name: "Syrup",
        choices: [
          { id: "syrup-1", name: "None", price: 0 },
          { id: "syrup-2", name: "Vanilla", price: 0.5 },
          { id: "syrup-3", name: "Caramel", price: 0.5 },
          { id: "syrup-4", name: "Hazelnut", price: 0.5 },
        ],
      },
    ],
  },
  {
    id: "coffee-2",
    name: "Cappuccino",
    description: "Espresso with steamed milk and foam",
    price: 4.5,
    category: "coffee",
    image: "/Cappuccino.jpg",
    available: true,
    popular: true,
    customizable: true,
    options: [
      {
        name: "Size",
        choices: [
          { id: "size-1", name: "Small", price: 0 },
          { id: "size-2", name: "Medium", price: 0.75 },
          { id: "size-3", name: "Large", price: 1.5 },
        ],
      },
      {
        name: "Milk",
        choices: [
          { id: "milk-2", name: "Whole Milk", price: 0 },
          { id: "milk-3", name: "Oat Milk", price: 0.5 },
          { id: "milk-4", name: "Almond Milk", price: 0.5 },
        ],
      },
      {
        name: "Syrup",
        choices: [
          { id: "syrup-1", name: "None", price: 0 },
          { id: "syrup-2", name: "Vanilla", price: 0.5 },
          { id: "syrup-3", name: "Caramel", price: 0.5 },
          { id: "syrup-4", name: "Hazelnut", price: 0.5 },
        ],
      },
    ],
  },
  {
    id: "coffee-3",
    name: "Latte",
    description: "Espresso with a lot of steamed milk and a light layer of foam",
    price: 4.75,
    category: "coffee",
    image: "/latte.jpg",
    available: true,
    popular: true,
    customizable: true,
    options: [
      {
        name: "Size",
        choices: [
          { id: "size-1", name: "Small", price: 0 },
          { id: "size-2", name: "Medium", price: 0.75 },
          { id: "size-3", name: "Large", price: 1.5 },
        ],
      },
      {
        name: "Milk",
        choices: [
          { id: "milk-2", name: "Whole Milk", price: 0 },
          { id: "milk-3", name: "Oat Milk", price: 0.5 },
          { id: "milk-4", name: "Almond Milk", price: 0.5 },
        ],
      },
      {
        name: "Syrup",
        choices: [
          { id: "syrup-1", name: "None", price: 0 },
          { id: "syrup-2", name: "Vanilla", price: 0.5 },
          { id: "syrup-3", name: "Caramel", price: 0.5 },
          { id: "syrup-4", name: "Hazelnut", price: 0.5 },
        ],
      },
    ],
  },
  {
    id: "pastry-1",
    name: "Croissant",
    description: "Buttery, flaky pastry",
    price: 3.25,
    category: "pastry",
    image: "/croissant.jpg",
    available: true,
    popular: true,
    customizable: false,
  },
  {
    id: "pastry-2",
    name: "Chocolate Muffin",
    description: "Rich chocolate muffin with chocolate chips",
    price: 3.75,
    category: "pastry",
    image: "/muffin.jpg",
    available: true,
    popular: false,
    customizable: false,
  },
  {
    id: "cold-drink-1",
    name: "Iced Coffee",
    description: "Chilled coffee served with ice",
    price: 4.25,
    category: "cold-drink",
    image: "/icedcoffe.jpg",
    available: true,
    popular: true,
    customizable: true,
    options: [
      {
        name: "Size",
        choices: [
          { id: "size-1", name: "Small", price: 0 },
          { id: "size-2", name: "Medium", price: 0.75 },
          { id: "size-3", name: "Large", price: 1.5 },
        ],
      },
      {
        name: "Milk",
        choices: [
          { id: "milk-1", name: "None", price: 0 },
          { id: "milk-2", name: "Whole Milk", price: 0 },
          { id: "milk-3", name: "Oat Milk", price: 0.5 },
          { id: "milk-4", name: "Almond Milk", price: 0.5 },
        ],
      },
      {
        name: "Syrup",
        choices: [
          { id: "syrup-1", name: "None", price: 0 },
          { id: "syrup-2", name: "Vanilla", price: 0.5 },
          { id: "syrup-3", name: "Caramel", price: 0.5 },
          { id: "syrup-4", name: "Hazelnut", price: 0.5 },
        ],
      },
    ],
  },
  {
    id: "tea-1",
    name: "Green Tea",
    description: "Delicate green tea with antioxidants",
    price: 3.75,
    category: "tea",
    image: "/tea.jpg",
    available: true,
    popular: false,
    customizable: true,
    options: [
      {
        name: "Size",
        choices: [
          { id: "size-1", name: "Small", price: 0 },
          { id: "size-2", name: "Medium", price: 0.75 },
          { id: "size-3", name: "Large", price: 1.5 },
        ],
      },
      {
        name: "Honey",
        choices: [
          { id: "honey-1", name: "None", price: 0 },
          { id: "honey-2", name: "Add Honey", price: 0.5 },
        ],
      },
    ],
  },
]

export const mockOrders: Order[] = [
  {
    id: "order-1",
    items: [
      {
        id: "item-1",
        productId: "coffee-1",
        name: "Espresso",
        price: 3.5,
        quantity: 1,
        options: [
          { name: "Size", choice: "Small", price: 0 },
          { name: "Milk", choice: "None", price: 0 },
          { name: "Syrup", choice: "None", price: 0 },
        ],
        image: "/images/coffee-1.png",
      },
      {
        id: "item-2",
        productId: "pastry-1",
        name: "Croissant",
        price: 3.25,
        quantity: 1,
        image: "/images/pastry-1.png",
      },
    ],
    total: 6.75,
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    customer: {
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
    },
  },
  {
    id: "order-2",
    items: [
      {
        id: "item-3",
        productId: "coffee-2",
        name: "Cappuccino",
        price: 5.25,
        quantity: 1,
        options: [
          { name: "Size", choice: "Medium", price: 0.75 },
          { name: "Milk", choice: "Whole Milk", price: 0 },
          { name: "Syrup", choice: "Vanilla", price: 0.5 },
        ],
        image: "/images/coffee-2.png",
      },
    ],
    total: 5.25,
    status: "preparing",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    tableNumber: "5",
    customer: {
      id: "user-2",
      name: "Jane Smith",
      email: "jane@example.com",
    },
  },
  {
    id: "order-3",
    items: [
      {
        id: "item-4",
        productId: "coffee-3",
        name: "Latte",
        price: 6.25,
        quantity: 1,
        options: [
          { name: "Size", choice: "Large", price: 1.5 },
          { name: "Milk", choice: "Oat Milk", price: 0.5 },
          { name: "Syrup", choice: "Caramel", price: 0.5 },
        ],
        image: "/images/coffee-3.png",
      },
      {
        id: "item-5",
        productId: "pastry-2",
        name: "Chocolate Muffin",
        price: 3.75,
        quantity: 2,
        image: "/images/pastry-2.png",
      },
    ],
    total: 13.75,
    status: "ready",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    customer: {
      id: "user-3",
      name: "Bob Johnson",
      email: "bob@example.com",
    },
  },
]

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    points: 120,
    level: "bronze",
    orders: ["order-1"],
    favoriteOrders: [],
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    points: 450,
    level: "silver",
    orders: ["order-2"],
    favoriteOrders: [],
  },
  {
    id: "user-3",
    name: "Bob Johnson",
    email: "bob@example.com",
    points: 950,
    level: "gold",
    orders: ["order-3"],
    favoriteOrders: [],
  },
  {
    id: "admin",
    name: "Admin User",
    email: "admin@cafe.com",
    points: 0,
    level: "gold",
    orders: [],
    favoriteOrders: [],
  },
]

export const mockGiftCards: GiftCard[] = [
  {
    id: "gift-1",
    code: "GIFT123",
    amount: 25,
    balance: 25,
    sender: {
      name: "John Doe",
      email: "john@example.com",
    },
    recipient: {
      name: "Jane Smith",
      email: "jane@example.com",
    },
    message: "Happy Birthday!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(), // 1 year from now
    isRedeemed: false,
  },
  {
    id: "gift-2",
    code: "GIFT456",
    amount: 50,
    balance: 35.75,
    sender: {
      name: "Bob Johnson",
      email: "bob@example.com",
    },
    recipient: {
      name: "Alice Williams",
      email: "alice@example.com",
    },
    message: "Enjoy your coffee!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(), // 1 year from now
    isRedeemed: true,
  },
]

export const mockRewards: Reward[] = [
  {
    id: "reward-1",
    name: "Free Coffee",
    description: "Any small coffee of your choice",
    pointsCost: 100,
    image: "/images/coffee-1.png",
  },
  {
    id: "reward-2",
    name: "Free Pastry",
    description: "Any pastry of your choice",
    pointsCost: 150,
    image: "/images/pastry-1.png",
  },
  {
    id: "reward-3",
    name: "10% Off Order",
    description: "10% discount on your next order",
    pointsCost: 200,
    image: "/images/cafe-interior.png",
  },
  {
    id: "reward-4",
    name: "Free Large Specialty Drink",
    description: "Any large specialty drink of your choice",
    pointsCost: 300,
    image: "/images/coffee-3.png",
  },
]

export const loyaltyLevels: LoyaltyLevel[] = [
  {
    name: "bronze",
    threshold: 0,
    benefits: ["Earn 1 point per $1 spent", "Birthday reward"],
    color: "#CD7F32",
  },
  {
    name: "silver",
    threshold: 300,
    benefits: ["Earn 1.5 points per $1 spent", "Birthday reward", "Free size upgrade once a month"],
    color: "#C0C0C0",
  },
  {
    name: "gold",
    threshold: 750,
    benefits: ["Earn 2 points per $1 spent", "Birthday reward", "Free size upgrade once a week", "Priority ordering"],
    color: "#FFD700",
  },
]
