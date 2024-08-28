"use client"
import { getTableLink } from "@/lib/utils"
import QRCode from "qrcode"
import { useEffect, useRef } from "react"

export default function QRCodeTable({
    token,
    tableNumber,
    width = 250,
}: {
    token: string
    tableNumber: number
    width?: number
}) {
    const canvaRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const canvas = canvaRef.current!
        canvas.height = width + 70
        canvas.width = width
        const canvasContext = canvas.getContext("2d")!
        canvasContext.fillStyle = "white"
        canvasContext.fillRect(0, 0, canvas.width, canvas.height)
        canvasContext.font = "20px Arial"
        canvasContext.textAlign = "center"
        canvasContext.fillStyle = "#000"
        canvasContext.fillText(`Table ${tableNumber}`, width / 2, width + 20)
        canvasContext.fillText(`Quét mã QR để gọi món`, width / 2, width + 50)
        const vitrualCanvas = document.createElement("canvas")
        QRCode.toCanvas(
            vitrualCanvas,
            getTableLink({
                token,
                tableNumber,
            }),
            (error) => {
                if (error) console.error(error)
                canvasContext.drawImage(vitrualCanvas, 0, 0, width, width)
            }
        )
    }, [token, tableNumber, width])
    return <canvas ref={canvaRef}></canvas>
}
