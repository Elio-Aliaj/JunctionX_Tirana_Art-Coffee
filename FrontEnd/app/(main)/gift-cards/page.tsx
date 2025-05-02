"use client"

import type React from "react"

import { useState } from "react"
import { Check, Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { mockGiftCards } from "@/lib/data"
import { formatCurrency, formatDate, generateGiftCardCode } from "@/lib/utils"

export default function GiftCardsPage() {
  const { toast } = useToast()
  const [amount, setAmount] = useState(25)
  const [recipientName, setRecipientName] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [senderName, setSenderName] = useState("")
  const [senderEmail, setSenderEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [giftCardCode, setGiftCardCode] = useState("")
  const [isCheckingCode, setIsCheckingCode] = useState(false)

  const handleSendGiftCard = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Gift Card Sent!",
        description: `A gift card for ${formatCurrency(amount)} has been sent to ${recipientEmail}.`,
      })

      // Reset form
      setAmount(25)
      setRecipientName("")
      setRecipientEmail("")
      setSenderName("")
      setSenderEmail("")
      setMessage("")
      setIsSubmitting(false)
    }, 1500)
  }

  const handleCheckGiftCard = (e: React.FormEvent) => {
    e.preventDefault()
    setIsCheckingCode(true)

    // Simulate API call
    setTimeout(() => {
      const giftCard = mockGiftCards.find((card) => card.code === giftCardCode)

      if (giftCard) {
        toast({
          title: "Gift Card Found!",
          description: `Your gift card has a balance of ${formatCurrency(giftCard.balance)}.`,
        })
      } else {
        toast({
          title: "Gift Card Not Found",
          description: "The gift card code you entered is invalid. Try GIFT123 or GIFT456.",
          variant: "destructive",
        })
      }

      setIsCheckingCode(false)
    }, 1500)
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Gift Cards</h1>

      <Tabs defaultValue="send">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="send">Send a Gift Card</TabsTrigger>
          <TabsTrigger value="check">Check Balance</TabsTrigger>
        </TabsList>

        <TabsContent value="send">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Send a Gift Card</CardTitle>
                  <CardDescription>Send a digital gift card to a friend or loved one.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSendGiftCard} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <div className="flex gap-2">
                        {[25, 50, 75, 100].map((value) => (
                          <Button
                            key={value}
                            type="button"
                            variant={amount === value ? "default" : "outline"}
                            className="flex-1"
                            onClick={() => setAmount(value)}
                          >
                            ${value}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipientName">Recipient's Name</Label>
                      <Input
                        id="recipientName"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipientEmail">Recipient's Email</Label>
                      <Input
                        id="recipientEmail"
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senderName">Your Name</Label>
                      <Input
                        id="senderName"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senderEmail">Your Email</Label>
                      <Input
                        id="senderEmail"
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Personal Message (Optional)</Label>
                      <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Gift Card"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-card overflow-hidden">
                <div className="relative h-48 bg-gradient-to-r from-primary to-secondary">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Gift className="h-16 w-16 text-white" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Brew Haven Gift Card</h3>
                    <p className="text-muted-foreground">A perfect gift for coffee lovers</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="text-2xl font-bold">${amount}.00</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Code</p>
                      <p className="text-sm font-mono">{generateGiftCardCode()}</p>
                    </div>
                  </div>
                  {recipientName && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">To: {recipientName}</p>
                      {message && <p className="mt-2 italic">"{message}"</p>}
                      {senderName && <p className="text-sm text-muted-foreground mt-2">From: {senderName}</p>}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">Delivered instantly via email</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">Valid for 12 months from purchase</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">Can be used for multiple purchases</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="check">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Check Gift Card Balance</CardTitle>
                <CardDescription>Enter your gift card code to check the remaining balance.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCheckGiftCard} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="giftCardCode">Gift Card Code</Label>
                    <Input
                      id="giftCardCode"
                      value={giftCardCode}
                      onChange={(e) => setGiftCardCode(e.target.value.toUpperCase())}
                      placeholder="e.g., GIFT123"
                      required
                    />
                    <p className="text-xs text-muted-foreground">For demo, try: GIFT123 or GIFT456</p>
                  </div>

                  <Button type="submit" className="w-full" disabled={isCheckingCode}>
                    {isCheckingCode ? "Checking..." : "Check Balance"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Recent Gift Cards</h3>

              {mockGiftCards.map((card) => (
                <Card key={card.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{card.code}</p>
                        <p className="text-sm text-muted-foreground">Issued: {formatDate(card.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(card.balance)}</p>
                        <p className="text-sm text-muted-foreground">of {formatCurrency(card.amount)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
