import { AutoAssignAnimation } from "@/components/visualizations/auto-assign"
import { PackagingCard } from "@/components/packaging-card"

export default function AutoAssignPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: "#FDFCF2" }}>
      <div className="w-full max-w-2xl">
        <PackagingCard
          title="Auto Assign Packages"
          subtitle="Recommended packaging based on item dimensions and packaging presets"
          description="The recommended packaging algorithm tries to find the smallest package that will fit all items in the order, if that doesn't exist it will add another package to accommodate."
          autoPlay
        >
          <AutoAssignAnimation isHoverMode={false} isHovered={true} />
        </PackagingCard>
      </div>
    </div>
  )
}
