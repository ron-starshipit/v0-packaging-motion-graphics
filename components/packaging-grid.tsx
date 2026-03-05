"use client"

import React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { SumWeightsAnimation } from "@/components/visualizations/sum-weights"
import { SumWeightsDimsAnimation } from "@/components/visualizations/sum-weights-dims"
import { DefaultPackageAnimation } from "@/components/visualizations/default-package"
import { UniquePackageAnimation } from "@/components/visualizations/unique-package"
import { AutoAssignAnimation } from "@/components/visualizations/auto-assign"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Play, MousePointerClick } from "lucide-react"

interface AnimationProps {
  isHoverMode: boolean
  isHovered: boolean
}

const ANIMATIONS = [
  {
    title: "Single Package - Weight",
    subtitle: "Sum of integration item weights",
    description: "All the items weights are summed and assigned to the default package dimensions.",
    component: SumWeightsAnimation,
    className: "md:col-span-1",
  },
  {
    title: "Single Package - Weight & Dimensions",
    subtitle: "Sum of weights & dimensions",
    description: "Items packed together. Weights are summed and all sides of the item dimensions are combined.",
    component: SumWeightsDimsAnimation,
    className: "md:col-span-1",
  },
  {
    title: "Default Package Preset",
    subtitle: "Default weight & dimensions",
    description: "Items are packed into a pre-defined default package regardless of their properties.",
    component: DefaultPackageAnimation,
    className: "md:col-span-1",
  },
  {
    title: "Unique Package per Item",
    subtitle: "Treat each item as a package",
    description: "Each item gets treated as it's own individual package, using each item's weight and dimensions. Best for large items or pre-packaged goods.",
    component: UniquePackageAnimation,
    className: "md:col-span-1",
  },
  {
    title: "Auto Assign Packages",
    subtitle: "Reccommended packaaging based on item dimensions and packaging presets",
    description: "The recommended packaging algorithm tries to find the smallest package that will fit all items in the order, if that doesn't exist it will add another package to accommodate.",
    component: AutoAssignAnimation,
    className: "md:col-span-2",
  },
]

export function PackagingGrid() {
  const [isHoverMode, setIsHoverMode] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-end space-x-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2">
          <Play className={cn("w-4 h-4", !isHoverMode ? "text-[#0061D5]" : "text-slate-400")} />
          <Label
            htmlFor="animation-mode"
            className={cn("text-sm font-medium cursor-pointer", !isHoverMode ? "text-slate-900" : "text-slate-500")}
          >
            Auto Play
          </Label>
        </div>
        <Switch id="animation-mode" checked={isHoverMode} onCheckedChange={setIsHoverMode} />
        <div className="flex items-center space-x-2 cursor-pointer">
          <Label
            htmlFor="animation-mode"
            className={cn("text-sm font-medium cursor-pointer", isHoverMode ? "text-slate-900" : "text-slate-500")}
          >
            Hover to Play
          </Label>
          <MousePointerClick className={cn("w-4 h-4", isHoverMode ? "text-[#0061D5]" : "text-slate-400")} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ANIMATIONS.map((item, index) => (
          <PackagingCard
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            description={item.description}
            className={item.className}
            isHoverMode={isHoverMode}
          >
            {/* @ts-ignore */}
            <item.component />
          </PackagingCard>
        ))}
      </div>
    </div>
  )
}

function PackagingCard({
  children,
  title,
  subtitle,
  description,
  className,
  isHoverMode,
}: {
  children: React.ReactNode
  title: string
  subtitle: string
  description: string
  className?: string
  isHoverMode: boolean
}) {
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
        {/* Pass hover state to children */}
        {React.cloneElement(children as React.ReactElement, { isHoverMode, isHovered })}
      </div>
      <div className="p-6 bg-white z-10 pt-0">
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
    </Card>
  )
}
