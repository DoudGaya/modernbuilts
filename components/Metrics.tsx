import { Building2, HardHat, MapPinned, Smile } from "lucide-react"

const metrics = [
  { id: 1, numbers: 20, message: "completed projects", icon: HardHat },
  { id: 2, numbers: 12, message: "active service areas", icon: MapPinned },
  { id: 3, numbers: 35, message: "homes and buildings", icon: Building2 },
  { id: 4, numbers: 100, message: "happy customers", icon: Smile },
]

export const Metrics = () => {
  return (
    <div className="grid grid-cols-2 divide-x divide-gray-700 bg-gray-950 text-white md:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <div key={metric.id} className="p-4">
            <div className="flex items-start gap-2">
              <p className="text-4xl font-semibold">{metric.numbers}</p>
              <span className="rounded-md bg-primary p-1 text-gray-950">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-2 text-sm text-white/75">{metric.message}</p>
          </div>
        )
      })}
    </div>
  )
}
