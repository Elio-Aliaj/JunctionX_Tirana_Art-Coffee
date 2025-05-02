"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { CheckCircle2, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function TableOrderConfirmationPage() {
  const params = useParams<{ tableId: string }>()
  const tableNumber = params.tableId

  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Order Received")

  // Simulate order progress
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(33)
      setStatus("Preparing")
    }, 3000)

    const timer2 = setTimeout(() => {
      setProgress(66)
      setStatus("Ready Soon")
    }, 6000)

    const timer3 = setTimeout(() => {
      setProgress(100)
      setStatus("Delivered to Table")
    }, 9000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <div className="container px-4 py-8 md:py-12 max-w-md mx-auto">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          <CardDescription>Your order for Table {tableNumber} has been received</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{status}</span>
              <span className="text-muted-foreground">{progress === 100 ? "Delivered!" : "In Progress"}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Estimated delivery time: 10-15 minutes</span>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild>
              <Link href={`/table-order/${tableNumber}`}>Order More</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
