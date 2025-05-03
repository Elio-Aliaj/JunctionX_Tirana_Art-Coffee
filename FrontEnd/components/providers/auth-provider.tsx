"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { mockUsers } from "@/lib/data";
import type { User } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is admin
  const isAdmin = user?.email === "admin@cafe.com";

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, you would validate credentials against a backend
        // For demo purposes, we'll just check if the email exists in our mock data
        const foundUser = mockUsers.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (foundUser) {
          setUser(foundUser);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name.toLowerCase(),
          email: email.toLowerCase(),
          password,
          roles: ["client"],
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          resolve(true);
        })
        .catch((error) => {
          console.error("Error:", error);
          resolve(false);
        });
    });
  };

  const logout = () => {
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
