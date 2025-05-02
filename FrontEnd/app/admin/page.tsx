"use client"

import { useState } from "react"
import Image from "next/image"
import { BarChart3, DollarSign, ShoppingBag, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockOrders, mockUsers, products } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"

export default function AdminDashboardPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  // Calculate total revenue
  const totalRevenue = mockOrders.reduce((total, order) => total + order.total, 0)

  // Get pending orders
  const pendingOrders = mockOrders.filter((order) => order.status === "pending" || order.status === "preparing")

  // Get top products
  const topProducts = [...products].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0)).slice(0, 5)

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage orders, customers, and menu items.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOrders.length}</div>
            <p className="text-xs text-muted-foreground">{pendingOrders.length} pending orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.length}</div>
            <p className="text-xs text-muted-foreground">+2 new customers this week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Manage and update order status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <Card key={order.id} className={selectedOrder === order.id ? "border-primary" : ""}>
                    <CardHeader className="p-4">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <CardTitle className="text-lg">Order #{order.id.split("-")[1]}</CardTitle>
                          <CardDescription>{new Date(order.createdAt).toLocaleString()}</CardDescription>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                order.status === "completed"
                                  ? "bg-success"
                                  : order.status === "ready"
                                    ? "bg-primary"
                                    : "bg-muted"
                              }`}
                            />
                            <span className="text-sm capitalize">{order.status}</span>
                          </div>
                          <p className="font-bold mt-1">{formatCurrency(order.total)}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} {order.items.length === 1 ? "item" : "items"}
                            {order.tableNumber && ` • Table ${order.tableNumber}`}
                          </p>
                          <p className="text-sm">{order.customer?.name || "Guest"}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                        >
                          {selectedOrder === order.id ? "Hide Details" : "View Details"}
                        </Button>
                      </div>

                      {selectedOrder === order.id && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-medium mb-2">Order Items</h4>
                          <ul className="space-y-2">
                            {order.items.map((item) => (
                              <li key={item.id} className="flex justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="relative h-10 w-10 rounded-md overflow-hidden">
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {item.quantity} × {formatCurrency(item.price)}
                                    </p>
                                  </div>
                                </div>
                                <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-4 pt-4 border-t flex gap-2">
                            <Button
                              size="sm"
                              variant={order.status === "pending" ? "default" : "outline"}
                              className="flex-1"
                            >
                              Pending
                            </Button>
                            <Button
                              size="sm"
                              variant={order.status === "preparing" ? "default" : "outline"}
                              className="flex-1"
                            >
                              Preparing
                            </Button>
                            <Button
                              size="sm"
                              variant={order.status === "ready" ? "default" : "outline"}
                              className="flex-1"
                            >
                              Ready
                            </Button>
                            <Button
                              size="sm"
                              variant={order.status === "completed" ? "default" : "outline"}
                              className="flex-1"
                            >
                              Completed
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>View and manage customer information.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{
                                backgroundColor:
                                  user.level === "gold" ? "#FFD700" : user.level === "silver" ? "#C0C0C0" : "#CD7F32",
                              }}
                            />
                            <span className="text-xs capitalize">{user.level} Level</span>
                            <span className="text-xs text-muted-foreground">({user.points} points)</span>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 md:text-right">
                          <p className="text-sm">
                            {user.orders.length} {user.orders.length === 1 ? "order" : "orders"}
                          </p>
                          <Button variant="link" className="p-0 h-auto">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="menu" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Menu Management</CardTitle>
              <CardDescription>Add, edit, or remove menu items.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button>Add New Item</Button>
              </div>

              <div className="space-y-4">
                {topProducts.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="font-bold">{formatCurrency(product.price)}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div
                              className={`h-2 w-2 rounded-full ${product.available ? "bg-success" : "bg-destructive"}`}
                            />
                            <span className="text-xs">{product.available ? "Available" : "Unavailable"}</span>
                            {product.popular && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>View sales and customer analytics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md">
              <div className="flex flex-col items-center text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Track revenue, top products, loyalty redemption trends, and more.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
