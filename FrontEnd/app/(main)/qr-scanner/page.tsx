"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, RefreshCw, Table2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useTable } from "@/components/providers/table-provider"

// Valid QR code format for tables
const TABLE_QR_PATTERN = /^table-(\d+)$/

export default function QRScannerPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { setTableNumber } = useTable()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasCamera, setHasCamera] = useState<boolean | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Check for camera availability
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          setHasCamera(true)
          // Stop the stream immediately after checking
          stream.getTracks().forEach((track) => track.stop())
        })
        .catch(() => {
          setHasCamera(false)
        })
    } else {
      setHasCamera(false)
    }

    // Clean up on unmount
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current)
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // Start the camera and scanning process
  const startScanning = async () => {
    if (!videoRef.current || !canvasRef.current) return

    setIsScanning(true)
    setScanResult(null)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      videoRef.current.srcObject = stream
      videoRef.current.play()

      // Start scanning for QR codes
      scanIntervalRef.current = setInterval(() => {
        if (!videoRef.current || !canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        if (!context) return

        // Only process if video is playing
        if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
          // Set canvas dimensions to match video
          canvas.width = videoRef.current.videoWidth
          canvas.height = videoRef.current.videoHeight

          // Draw current video frame to canvas
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

          // In a real app, we would process the canvas image to detect QR codes
          // For this demo, we'll simulate finding a QR code after a delay
          setTimeout(() => {
            // Simulate finding a QR code (in a real app, this would be from actual detection)
            const simulatedQrCode = "table-2"
            handleScanResult(simulatedQrCode)
          }, 3000)
        }
      }, 500)
    } catch (error) {
      console.error("Error accessing camera:", error)
      setHasCamera(false)
      setIsScanning(false)
    }
  }

  // Handle scan result
  const handleScanResult = (result: string) => {
    // Stop scanning once we have a result
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current)
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }

    setIsScanning(false)
    setScanResult(result)

    // Check if it's a valid table QR code
    const tableMatch = result.match(TABLE_QR_PATTERN)

    if (tableMatch) {
      const tableNumber = tableMatch[1]

      // Set the table number in our context
      setTableNumber(tableNumber)

      toast({
        title: "Table QR Code Detected",
        description: `Found Table ${tableNumber}`,
      })

      setTimeout(() => {
        router.push("/menu")
      }, 1000)
    } else {
      toast({
        title: "Invalid QR Code",
        description: "This QR code is not a valid table code.",
        variant: "destructive",
      })

      // Reset scanner to allow trying again
      setScanResult(null)
    }
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Table QR Code Scanner</h1>

      <Card>
        <CardHeader>
          <CardTitle>Scan Table QR Code</CardTitle>
          <CardDescription>Point your camera at your table's QR code to place an order.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {hasCamera === null ? (
            <div className="flex flex-col items-center justify-center h-64">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
              <p>Checking camera access...</p>
            </div>
          ) : hasCamera ? (
            <div className="flex flex-col items-center">
              <div
                className={`relative w-full max-w-sm aspect-square bg-muted rounded-lg overflow-hidden mb-6 ${
                  isScanning ? "border-2 border-primary" : ""
                }`}
              >
                {/* Hidden video element for camera feed */}
                <video
                  ref={videoRef}
                  className={`absolute inset-0 w-full h-full object-cover ${isScanning ? "block" : "hidden"}`}
                  playsInline
                  muted
                />

                {/* Hidden canvas for processing video frames */}
                <canvas ref={canvasRef} className="hidden" />

                {isScanning ? (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Scanning animation */}
                    <div className="absolute left-0 right-0 h-0.5 bg-primary animate-[scan_2s_ease-in-out_infinite]"></div>

                    {/* Targeting corners */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>

              {scanResult ? (
                <div className="text-center mb-6">
                  <p className="text-lg font-medium">Table QR Code detected!</p>
                  <p className="text-muted-foreground">Redirecting to menu...</p>
                </div>
              ) : (
                <Button size="lg" onClick={startScanning} disabled={isScanning} className="mb-6">
                  {isScanning ? "Scanning..." : "Start Scanning"}
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <Camera className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Camera access required</p>
              <p className="text-muted-foreground text-center mb-6">Please allow camera access to scan QR codes.</p>
              <Button onClick={() => setHasCamera(null)}>Try Again</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>How to use table QR codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Table2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Table Ordering</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Each table in our café has a unique QR code. Scan the QR code on your table to place an order directly
                from your seat. Your order will be delivered right to your table.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
