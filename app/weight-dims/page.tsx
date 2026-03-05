import { SumWeightsDimsAnimation } from "@/components/visualizations/sum-weights-dims"
import { PackagingCard } from "@/components/packaging-card"

export default function WeightDimsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: "#FDFCF2" }}>
      <div className="w-full max-w-lg">
        <PackagingCard
          title="Single Package - Weight & Dimensions"
          subtitle="Sum of weights & dimensions"
          description="Items packed together. Weights are summed and all sides of the item dimensions are combined."
          autoPlay
        >
          <SumWeightsDimsAnimation isHoverMode={false} isHovered={true} />
        </PackagingCard>
      </div>
    </div>
  )
}
