"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function UniquePackageAnimation({ isHoverMode, isHovered }: { isHoverMode?: boolean; isHovered?: boolean }) {
  const FINAL_STEP = 3
  const [step, setStep] = useState(0)

  useEffect(() => {
    let mounted = true
    let timer: NodeJS.Timeout

    const runSequence = async () => {
      if (!mounted) return
      // Start
      setStep(0)
      await new Promise((r) => setTimeout(r, 1000))

      if (!mounted) return
      setStep(1) // Space apart
      await new Promise((r) => setTimeout(r, 800))

      if (!mounted) return
      setStep(2) // Show item dims
      await new Promise((r) => setTimeout(r, 800))

      if (!mounted) return
      setStep(3) // Box appears + package dims
    }

    if (!isHoverMode) {
      // Loop mode
      const loop = async () => {
        await runSequence()
        await new Promise((r) => setTimeout(r, 3000))
        if (mounted) loop()
      }
      loop()
    } else {
      // Hover mode
      if (isHovered) {
        runSequence()
      } else {
        setStep(FINAL_STEP)
      }
    }

    return () => {
      mounted = false
      clearTimeout(timer)
    }
  }, [isHoverMode, isHovered])

  const items = [
    { id: 1, weight: 1, w: 40, h: 40, label: "1kg", dims: "10x10x10", startX: -75 },
    { id: 2, weight: 3, w: 56, h: 56, label: "3kg", dims: "14x14x14", startX: 0 },
    { id: 3, weight: 2, w: 60, h: 40, label: "2kg", dims: "15x10x10", startX: 75 },
  ]

  const isSpaced = step >= 1
  const showItemDims = step >= 2
  const isPacked = step >= 3

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-50/50">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          animate={{
            x: isSpaced ? (i - 1) * 90 : item.startX,
            scale: 1,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute flex flex-col items-center justify-center w-24 h-56"
        >
          {/* Package Label - Positioned dynamically based on item height */}
          <motion.div
            animate={{
              opacity: isPacked ? 1 : 0,
              y: isPacked ? 0 : 10,
            }}
            style={{
              marginTop: -((item.h + 20) / 2 + 25), // Calculate exact position above box center
            }}
            className="absolute top-1/2 text-[10px] font-bold text-[#0061D5] z-50 w-full text-center whitespace-nowrap"
          >
            PKG #{item.id}
          </motion.div>

          {/* The Package Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: isPacked ? 1 : 0,
              borderColor: isPacked ? "#0061D5" : "transparent",
            }}
            transition={{ duration: 0.4 }}
            style={{
              width: item.w + 20,
              height: item.h + 20,
            }}
            className="absolute border-2 rounded-xl bg-[#eff6ff] shadow-sm z-10 transition-colors duration-300"
          />

          {/* The Item */}
          <motion.div
            animate={{ y: 0 }}
            transition={{ type: "spring" }}
            style={{ width: item.w, height: item.h }}
            className="bg-white rounded-md border-2 border-slate-300 shadow-sm z-20 flex items-center justify-center relative"
          >
            <span className="text-[10px] font-bold text-slate-500">{item.label}</span>
          </motion.div>

          <div className="absolute bottom-0 w-full flex justify-center h-8">
            {/* Item dims */}
            <motion.div
              animate={{
                opacity: showItemDims && !isPacked ? 1 : 0,
                y: showItemDims ? -20 : -10,
              }}
              className="absolute text-[9px] text-slate-400 font-mono"
            >
              {item.dims}
            </motion.div>

            {/* Package dims (highlighted) */}
            <motion.div
              animate={{
                opacity: isPacked ? 1 : 0,
                y: isPacked ? -20 : -30,
              }}
              className="absolute text-[9px] font-bold text-[#0061D5] bg-blue-100 px-1.5 rounded"
            >
              {item.dims}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
