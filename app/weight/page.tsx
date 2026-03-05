import { SumWeightsAnimation } from "@/components/visualizations/sum-weights"
import { PackagingCard } from "@/components/packaging-card"

export default function WeightPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: "#FDFCF2" }}>
      <div className="w-full max-w-lg">
        <PackagingCard
          title="Single Package - Weight"
          subtitle="Sum of integration item weights"
          description="All the items weights are summed and assigned to the default package dimensions."
          autoPlay
        >
          <SumWeightsAnimation isHoverMode={false} isHovered={true} />
        </PackagingCard>
      </div>
    </div>
  )
}
