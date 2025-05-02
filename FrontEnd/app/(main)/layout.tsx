import type React from "react"
import LayoutWrapper from "../layout-wrapper"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>
}
