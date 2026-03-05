import { DefaultPackageAnimation } from "@/components/visualizations/default-package"
import { PackagingCard } from "@/components/packaging-card"

export default function DefaultPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: "#FDFCF2" }}>
      <div className="w-full max-w-lg">
        <PackagingCard
          title="Default Package Preset"
          subtitle="Default weight & dimensions"
          description="Items are packed into a pre-defined default package regardless of their properties."
          autoPlay
        >
          <DefaultPackageAnimation />
        </PackagingCard>
      </div>
    </div>
  )
}
