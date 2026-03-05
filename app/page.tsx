import { PackagingGrid } from "@/components/packaging-grid"
import { Package } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen p-8 md:p-12 lg:p-24 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="space-y-4 max-w-2xl mx-[0] text-left">
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Starshipit Packaging Options</h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Visualise how Starshipit can calculate and assign packages for your shipments.
          </p>
        </header>

        <PackagingGrid />
      </div>
    </main>
  )
}
