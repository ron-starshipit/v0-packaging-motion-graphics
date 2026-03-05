"use client"

import React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PackagingCardProps {
  children: React.ReactNode
  title: string
  subtitle: string
  description: string
  className?: string
  isHoverMode?: boolean
  autoPlay?: boolean
}

export function PackagingCard({
  children,
  title,
  subtitle,
  description,
  className,
  isHoverMode = false,
  autoPlay = false,
}: PackagingCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={cn(
        "overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white group flex flex-col",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 pt-0 pl-6 pb-0">
        <h3 className="font-semibold text-lg text-slate-900 group-hover:text-[#0061D5] transition-colors">{title}</h3>
        <p className="text-sm font-medium text-[#0061D5] mt-1">{subtitle}</p>
      </div>
      <div className="flex-1 min-h-[300px] bg-slate-50/50 border-y border-slate-100 relative overflow-hidden flex items-center justify-center">
        {React.cloneElement(children as React.ReactElement, {
          isHoverMode: autoPlay ? false : isHoverMode,
          isHovered: autoPlay ? true : isHovered,
        })}
      </div>
      <div className="p-6 bg-white z-10 pt-0">
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
    </Card>
  )
}
