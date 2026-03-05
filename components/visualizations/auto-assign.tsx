"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { CheckCircle2, XCircle } from "lucide-react"

export function AutoAssignAnimation({ isHoverMode, isHovered }: { isHoverMode?: boolean; isHovered?: boolean }) {
  const FINAL_STEP = 4
  const [step, setStep] = useState(0)

  const BOX_GAP = 150
  const SMALL_BOX_X = -BOX_GAP
  const MEDIUM_BOX_X = 0
  const LARGE_BOX_X = BOX_GAP

  // Cluster configuration relative to the box center
  // 3kg left, 1kg top-right, 2kg bottom-right
  const CLUSTER_OFFSETS = {
    3: { x: -28, y: 0 }, // 3kg
    1: { x: 28, y: -28 }, // 1kg
    2: { x: 28, y: 28 }, // 2kg
  }

  useEffect(() => {
    let mounted = true

    const runSequence = async () => {
      if (!mounted) return
      setStep(0)
      await new Promise((r) => setTimeout(r, 1500))

      if (!mounted) return
      setStep(1)
      await new Promise((r) => setTimeout(r, 1500))

      if (!mounted) return
      setStep(2)
      await new Promise((r) => setTimeout(r, 1500))

      if (!mounted) return
      setStep(3)
      await new Promise((r) => setTimeout(r, 1500))

      if (!mounted) return
      setStep(4)
    }

    if (!isHoverMode) {
      const loop = async () => {
        await runSequence()
        await new Promise((r) => setTimeout(r, 3000))
        if (mounted) loop()
      }
      loop()
    } else {
      if (isHovered) {
        runSequence()
      } else {
        setStep(FINAL_STEP)
      }
    }

    return () => {
      mounted = false
    }
  }, [isHoverMode, isHovered])

  const items = [
    { id: 1, w: 40, h: 40, label: "1kg", dims: "10x10", initialX: -60 }, // 1kg
    { id: 3, w: 56, h: 56, label: "3kg", dims: "14x14", initialX: 0 }, // 3kg
    { id: 2, w: 50, h: 30, label: "2kg", dims: "15x10", initialX: 60 }, // 2kg
  ]

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-50/50 overflow-hidden pt-8">
      <div className="absolute top-4 w-full text-center h-8 z-40">
        <AnimatePresence mode="wait">
          {step === FINAL_STEP && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs font-bold text-[#0061D5] bg-blue-50 px-4 py-1.5 rounded-full inline-block shadow-sm border border-blue-100"
            >
              Selected: Medium Box
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative w-full h-48 flex items-center justify-center mt-6">
        {/* Box Options Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Small Box - Left */}
          <div className="absolute" style={{ left: "50%", marginLeft: SMALL_BOX_X, transform: "translateX(-50%)" }}>
            <motion.div
              animate={{
                borderColor: step === 2 ? "#ef4444" : "#cbd5e1",
                backgroundColor: step === 2 ? "#fef2f2" : "transparent",
              }}
              className="w-20 h-20 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors relative z-0"
            >
              <span className="text-[10px] text-slate-400 font-bold absolute -top-5 whitespace-nowrap">Small Box</span>
            </motion.div>
          </div>

          {/* Medium Box - Center */}
          <div className="absolute" style={{ left: "50%", marginLeft: MEDIUM_BOX_X, transform: "translateX(-50%)" }}>
            <motion.div
              animate={{
                borderColor: step === FINAL_STEP ? "#0061D5" : "#cbd5e1",
                backgroundColor: step === FINAL_STEP ? "#eff6ff" : "transparent",
                scale: step === FINAL_STEP ? 1.05 : 1,
              }}
              className="w-32 h-24 border-2 border-dashed rounded-lg flex items-center justify-center transition-all relative z-0"
            >
              <span className="text-[10px] text-slate-400 font-bold absolute -top-5 whitespace-nowrap">Medium Box</span>

              {step === FINAL_STEP && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-[#0061D5] text-white rounded-full p-1 shadow-md z-20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </motion.div>
              )}
            </motion.div>

            {/* Dims Label */}
            <motion.div
              animate={{ opacity: step === FINAL_STEP ? 1 : 0, y: step === FINAL_STEP ? 0 : -5 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#0061D5] bg-blue-100 px-2 py-0.5 rounded whitespace-nowrap"
            >
              20x15x15 cm
            </motion.div>
          </div>

          {/* Large Box - Right */}
          <div className="absolute" style={{ left: "55%", marginLeft: LARGE_BOX_X, transform: "translateX(-50%)" }}>
            <div className="w-40 h-28 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center opacity-40 z-0">
              <span className="text-[10px] text-slate-400 font-bold absolute -top-5 whitespace-nowrap">Large Box</span>
            </div>
          </div>
        </div>

        {/* Items - Absolute positioned */}
        {items.map((item, i) => {
          // Default: Start position row above
          let targetX = item.initialX
          let targetY = -100 // Start high up
          let zIndex = 30

          if (step >= 1) {
            // Determine box center X based on step
            const boxCenterX = step < 3 ? SMALL_BOX_X : MEDIUM_BOX_X

            // Get cluster offset for this specific item
            const offset = CLUSTER_OFFSETS[item.id as keyof typeof CLUSTER_OFFSETS]

            targetX = boxCenterX + offset.x
            targetY = offset.y // Centered vertically on the box
            zIndex = 50 // Ensure on top of boxes
          }

          return (
            <motion.div
              key={item.id}
              animate={{
                x: targetX,
                y: targetY,
                scale: 1,
                zIndex: zIndex,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              style={{ width: item.w, height: item.h, zIndex }}
              className="absolute bg-white rounded-md border-2 border-slate-300 shadow-sm flex flex-col items-center justify-center"
            >
              <span className="text-[10px] font-bold text-slate-500">{item.label}</span>
              <span className="text-[7px] text-slate-400 font-mono mt-0.5">{item.dims}</span>

              {/* Overflow Indicator */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 z-20"
                >
                  <XCircle className="w-3 h-3" />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
