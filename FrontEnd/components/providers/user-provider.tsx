"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./auth-provider"
import type { User } from "@/lib/types"

interface UserContextType {
  addPoints: (points: number) => void
  updateBirthdayReminder: (enabled: boolean) => void
  birthdayReminderEnabled: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const [birthdayReminderEnabled, setBirthdayReminderEnabled] = useState(false)

  // Load birthday reminder preference from localStorage
  useEffect(() => {
    if (!isLoading && user) {
      const storedPreference = localStorage.getItem(`birthdayReminder-${user.id}`)
      if (storedPreference) {
        setBirthdayReminderEnabled(storedPreference === "true")
      }
    }
  }, [isLoading, user])

  const addPoints = (points: number) => {
    if (!user) return

    // In a real app, this would be an API call
    // For demo purposes, we'll just update localStorage
    const updatedUser: User = {
      ...user,
      points: user.points + points,
      level: getUpdatedLevel(user.points + points),
    }

    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const updateBirthdayReminder = (enabled: boolean) => {
    if (!user) return

    setBirthdayReminderEnabled(enabled)
    localStorage.setItem(`birthdayReminder-${user.id}`, String(enabled))
  }

  // Helper function to determine loyalty level based on points
  const getUpdatedLevel = (points: number): "bronze" | "silver" | "gold" => {
    if (points >= 750) return "gold"
    if (points >= 300) return "silver"
    return "bronze"
  }

  return (
    <UserContext.Provider
      value={{
        addPoints,
        updateBirthdayReminder,
        birthdayReminderEnabled,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
