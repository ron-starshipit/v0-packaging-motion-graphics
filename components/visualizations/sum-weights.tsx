"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Scale } from "lucide-react"

export function SumWeightsAnimation({ isHoverMode, isHovered }: { isHoverMode?: boolean; isHovered?: boolean }) {
  const FINAL_STEP = 2
  const [step, setStep] = useState(FINAL_STEP) // Start at final step

  useEffect(() => {
    let interval: NodeJS.Timeout
    let timeout: NodeJS.Timeout

    if (!isHoverMode) {
      timeout = setTimeout(() => {
        setStep(0)
        interval = setInterval(() => {
          setStep((prev) => (prev + 1) % 4)
        }, 2000)
      }, 500)
    } else {
      if (isHovered) {
        setStep(0)
        interval = setInterval(() => {
          setStep((prev) => (prev < FINAL_STEP ? prev + 1 : prev))
        }, 1000)
      } else {
        setStep(FINAL_STEP)
      }
    }

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [isHoverMode, isHovered])

  const items = [
    { id: 1, weight: 1, w: 40, h: 40, label: "1kg", x: -75 },
    { id: 2, weight: 3, w: 56, h: 56, label: "3kg", x: 0 },
    { id: 3, weight: 2, w: 60, h: 40, label: "2kg", x: 75 },
  ]

  const isMerged = step >= FINAL_STEP

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-50/50 overflow-hidden">
      <div className="relative h-48 w-full flex items-center justify-center" style={{ marginBottom: "20px" }}>
        {/* The Final Package */}
        <motion.div
          initial={{ scale: 1, opacity: 1, y: 0 }}
          animate={{
            scale: isMerged ? 1 : 0.8,
            opacity: isMerged ? 1 : 0,
            y: isMerged ? 0 : 20,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.8 }}
          className="absolute z-10 w-40 h-32 bg-[#eff6ff] border-2 border-[#0061D5] rounded-xl shadow-sm flex flex-col items-center justify-center text-[#0061D5]"
        >
          <Scale className="w-6 h-6 mb-1" />
          <span className="font-bold text-2xl">6kg</span>
          <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70">Total Weight</span>
        </motion.div>

        {/* The Individual Items */}
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{
              x: 0,
              scale: 0.5,
              opacity: 0,
              y: 10,
            }}
            animate={{
              x: isMerged ? 0 : item.x,
              scale: isMerged ? 0.5 : 1,
              opacity: isMerged ? 0 : 1,
              y: isMerged ? 10 : 0,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 25, duration: 0.8 }}
            style={{ width: item.w, height: item.h }}
            className="absolute bg-white rounded-md border-2 border-slate-300 shadow-sm flex items-center justify-center z-20"
          >
            <span className="text-[10px] font-bold text-slate-500">{item.label}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: isMerged ? 1 : 0, y: isMerged ? 0 : 10 }}
        className="absolute bottom-4 text-xs font-mono text-[#0061D5] bg-blue-100 px-3 py-1 rounded-full"
      >
        1kg + 3kg + 2kg = 6kg
      </motion.div>
    </div>
  )
}
