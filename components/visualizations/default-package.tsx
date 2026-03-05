"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { PackageCheck } from "lucide-react"

const TOTAL_STEPS = 3

export function DefaultPackageAnimation({ isHoverMode, isHovered }: { isHoverMode?: boolean; isHovered?: boolean }) {
  const [step, setStep] = useState(TOTAL_STEPS - 1)

  useEffect(() => {
    let interval: NodeJS.Timeout
    let timeout: NodeJS.Timeout

    if (!isHoverMode) {
      timeout = setTimeout(() => {
        setStep(0)
        interval = setInterval(() => {
          setStep((prev) => (prev + 1) % TOTAL_STEPS)
        }, 1500)
      }, 1000)
    } else {
      if (isHovered) {
        setStep(0)
        interval = setInterval(() => {
          setStep((prev) => (prev < TOTAL_STEPS - 1 ? prev + 1 : prev))
        }, 1000)
      } else {
        setStep(TOTAL_STEPS - 1)
      }
    }

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [isHoverMode, isHovered])

  const itemsFaded = step >= 1
  const isPacked = step >= 2

  const items = [
    { id: 1, weight: 1, w: 40, h: 40, label: "1kg", x: -75 },
    { id: 2, weight: 3, w: 56, h: 56, label: "3kg", x: 0 },
    { id: 3, weight: 2, w: 60, h: 40, label: "2kg", x: 75 },
  ]

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-50/50 overflow-hidden">
      {/* Items - start visible, then fade and move up */}
      {items.map((item) => (
        <motion.div
          key={item.id}
          animate={{
            y: itemsFaded ? -60 : 0,
            x: itemsFaded ? item.x * 1.5 : item.x,
            opacity: itemsFaded ? 0.25 : 1,
            scale: itemsFaded ? 0.7 : 1,
            filter: itemsFaded ? "grayscale(100%)" : "grayscale(0%)",
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{ width: item.w, height: item.h }}
          className="absolute z-10 bg-white rounded-md border-2 border-slate-300 shadow-sm flex items-center justify-center"
        >
          <span className="text-[10px] font-bold text-slate-500">{item.label}</span>
        </motion.div>
      ))}

      {/* The Default Package Box - slides in from below */}
      <motion.div
        animate={{
          y: isPacked ? 0 : 80,
          opacity: isPacked ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="absolute z-20 w-40 h-32 border-2 border-[#0061D5] bg-blue-50 rounded-xl flex flex-col items-center justify-center"
      >
        <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-slate-100 text-[9px] font-bold text-slate-500 rounded uppercase tracking-wider">
          Default Package
        </div>

        <motion.div
          animate={{ scale: isPacked ? 1 : 0.5, opacity: isPacked ? 1 : 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center text-[#0061D5]"
        >
          <PackageCheck className="w-8 h-8 mb-1" />
          <span className="font-bold text-sm">Standard Small Box</span>
        </motion.div>
      </motion.div>

      {/* Ignored Dimensions Indicator */}
      <motion.div
        animate={{ opacity: isPacked ? 1 : 0, y: isPacked ? 0 : 10 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-4 text-[10px] text-slate-400 text-center font-medium"
      >
        Item dimensions ignored
      </motion.div>
    </div>
  )
}
