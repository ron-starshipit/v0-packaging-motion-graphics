"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Box } from "lucide-react"

const FINAL_STEP = 2

export function SumWeightsDimsAnimation({ isHoverMode, isHovered }: { isHoverMode?: boolean; isHovered?: boolean }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (!isHoverMode) {
      interval = setInterval(() => {
        setStep((prev) => (prev + 1) % 4)
      }, 2000)
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

    return () => clearInterval(interval)
  }, [isHoverMode, isHovered])

  const isMerged = step >= FINAL_STEP

  // Standard items
  const items = [
    { id: 1, weight: 1, w: 40, h: 40, label: "1kg", dims: "10x10x10", x: -75 },
    { id: 2, weight: 3, w: 56, h: 56, label: "3kg", dims: "14x14x14", x: 0 },
    { id: 3, weight: 2, w: 60, h: 40, label: "2kg", dims: "15x10x10", x: 75 },
  ]

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-50/50 overflow-hidden">
      <div className="relative h-48 w-full flex items-center justify-center">
        {/* Final Package - Dynamically sized to fit items */}
        <motion.div
          animate={{
            width: isMerged ? 140 : 20,
            height: isMerged ? 100 : 20,
            opacity: isMerged ? 1 : 0,
            y: isMerged ? 0 : 20,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 25, duration: 0.8 }}
          className="absolute z-10 border-2 border-[#0061D5] bg-[#eff6ff] rounded-xl flex flex-col items-center justify-center overflow-hidden shadow-sm"
        >
          {isMerged && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Box className="w-5 h-5 text-[#0061D5] mx-auto mb-1" />
              <div className="text-[#0061D5] font-bold text-lg leading-none">6kg</div>
            </motion.div>
          )}
        </motion.div>

        {/* Moved dimensions below the package */}
        {isMerged && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute mt-[136px] z-10 text-[10px] font-bold text-[#0061D5] bg-blue-100 px-2 py-0.5 rounded" // Increased top margin to 136px
          >
            39x14x14 cm
          </motion.div>
        )}

        {/* Items */}
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            animate={{
              x: isMerged ? (i === 1 ? 0 : i === 0 ? -20 : 20) : item.x,
              y: isMerged ? (i === 1 ? 10 : -10) : 0,
              scale: isMerged ? 0.8 : 1, // Scale down slightly to "fit" in the visual box
              opacity: isMerged ? 0 : 1, // Fade out as they "enter" the box
            }}
            transition={{ type: "spring", stiffness: 150, damping: 25, duration: 0.8 }}
            className="absolute flex flex-col items-center z-20"
          >
            <div
              style={{ width: item.w, height: item.h }}
              className="bg-white rounded-md border-2 border-slate-300 shadow-sm flex items-center justify-center mb-1"
            >
              <span className="text-[10px] font-bold text-slate-500">{item.label}</span>
            </div>
            <motion.span
              animate={{ opacity: isMerged ? 0 : 1 }}
              className="text-[8px] text-slate-400 font-mono whitespace-nowrap"
            >
              {item.dims}
            </motion.span>
          </motion.div>
        ))}

        {/* Ghost items inside showing packing */}
        {isMerged && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {/* Just a visual representation of packed items inside */}
            <div className="w-10 h-10 border border-dashed border-[#0061D5]/30 bg-white/30 absolute -translate-x-4 -translate-y-4 rounded" />
            <div className="w-14 h-14 border border-dashed border-[#0061D5]/30 bg-white/30 absolute translate-x-2 translate-y-2 rounded" />
            <div className="w-16 h-8 border border-dashed border-[#0061D5]/30 bg-white/30 absolute -translate-x-2 translate-y-6 rounded" />
          </div>
        )}
      </div>
    </div>
  )
}
