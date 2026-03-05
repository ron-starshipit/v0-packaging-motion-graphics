import { UniquePackageAnimation } from "@/components/visualizations/unique-package"
import { PackagingCard } from "@/components/packaging-card"

export default function UniquePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: "#FDFCF2" }}>
      <div className="w-full max-w-lg">
        <PackagingCard
          title="Unique Package per Item"
          subtitle="Treat each item as a package"
          description="Each item gets treated as it's own individual package, using each item's weight and dimensions. Best for large items or pre-packaged goods."
          autoPlay
        >
          <UniquePackageAnimation isHoverMode={false} isHovered={true} />
        </PackagingCard>
      </div>
    </div>
  )
}
