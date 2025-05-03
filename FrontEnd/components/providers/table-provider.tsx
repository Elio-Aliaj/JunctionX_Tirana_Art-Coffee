"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface TableContextType {
  tableNumber: string | null
  setTableNumber: (tableNumber: string | null) => void
  hasScannedTable: boolean
}

const TableContext = createContext<TableContextType | undefined>(undefined)

export function TableProvider({ children }: { children: React.ReactNode }) {
  const [tableNumber, setTableNumber] = useState<string | null>(null)

  // Check if we have a stored table number in localStorage
  useEffect(() => {
    const storedTable = localStorage.getItem("tableNumber")
    if (storedTable) {
      setTableNumber(storedTable)
    }
  }, [])

  // Store table number in localStorage when it changes
  useEffect(() => {
    if (tableNumber) {
      localStorage.setItem("tableNumber", tableNumber)
    } else {
      localStorage.removeItem("tableNumber")
    }
  }, [tableNumber])

  return (
    <TableContext.Provider
      value={{
        tableNumber,
        setTableNumber,
        hasScannedTable: tableNumber !== null,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export function useTable() {
  const context = useContext(TableContext)
  if (context === undefined) {
    throw new Error("useTable must be used within a TableProvider")
  }
  return context
}
