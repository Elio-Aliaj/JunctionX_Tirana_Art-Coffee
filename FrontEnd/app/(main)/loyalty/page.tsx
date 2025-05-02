"use client"

import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@/components/providers/user-provider"
import { mockRewards, loyaltyLevels } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export default function LoyaltyPage() {
  const { user } = useUser()
  const { toast } = useToast()

  // Find the user's current level and next level
  const currentLevel = loyaltyLevels.find((level) => level.name === user?.level) || loyaltyLevels[0]
  const nextLevelIndex = loyaltyLevels.findIndex((level) => level.name === user?.level) + 1
  const nextLevel = nextLevelIndex < loyaltyLevels.length ? loyaltyLevels[nextLevelIndex] : null

  // Calculate progress to next level
  const progressToNextLevel =
    nextLevel && user
      ? Math.min(100, ((user.points - currentLevel.threshold) / (nextLevel.threshold - currentLevel.threshold)) * 100)
      : 100

  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Loyalty Program</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{ backgroundColor: currentLevel.color + "33", color: currentLevel.color }}
                >
                  {currentLevel.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-lg capitalize">{currentLevel.name} Level</h3>
                  <p className="text-muted-foreground">{user?.points || 0} points</p>
                </div>
              </div>

              {nextLevel && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{user?.points || 0} points</span>
                    <span>{nextLevel.threshold} points</span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {nextLevel.threshold - (user?.points || 0)} points until {nextLevel.name} level
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Your Benefits</h4>
                <ul className="space-y-1">
                  {currentLevel.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="rewards">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="rewards" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockRewards.map((reward) => (
                  <Card key={reward.id}>
                    <div className="flex p-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={reward.image || "/placeholder.svg"}
                          alt={reward.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">{reward.name}</h3>
                        <p className="text-sm text-muted-foreground">{reward.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-medium">{reward.pointsCost} points</span>
                          <Button
                            size="sm"
                            disabled={!user || user.points < reward.pointsCost}
                            onClick={() => {
                              toast({
                                title: "Reward Redeemed",
                                description: `You've redeemed ${reward.name} for ${reward.pointsCost} points.`,
                              })
                            }}
                          >
                            Redeem
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Points History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Order #12345</p>
                        <p className="text-sm text-muted-foreground">{formatDate(new Date().toISOString())}</p>
                      </div>
                      <p className="text-sm font-medium text-primary">+25 points</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Order #12340</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(new Date(Date.now() - 86400000 * 3).toISOString())}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-primary">+18 points</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Free Coffee Reward</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(new Date(Date.now() - 86400000 * 5).toISOString())}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-destructive">-100 points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Loyalty Levels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loyaltyLevels.map((level) => (
            <Card key={level.name} className={user?.level === level.name ? "border-primary" : ""}>
              <CardHeader>
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold mb-2"
                  style={{ backgroundColor: level.color + "33", color: level.color }}
                >
                  {level.name.charAt(0).toUpperCase()}
                </div>
                <CardTitle className="capitalize">{level.name}</CardTitle>
                <CardDescription>{level.threshold}+ points</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {level.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
