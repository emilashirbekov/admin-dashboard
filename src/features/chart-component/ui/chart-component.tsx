import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import type { ChartData } from "@/shared/lib/types"

interface ChartComponentProps {
  data: ChartData[]
  title: string
  description: string
}

export function ChartComponent({ data, title, description }: ChartComponentProps) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue || 0))
  const maxUsers = Math.max(...data.map((d) => d.users || 0))

  return (
    <Card>
      <CardHeader>
        <CardTitle data-testid='chart-title'>{title}</CardTitle>
        <CardDescription data-testid='chart-description'>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div data-testid='chart-item' key={item.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.name}</span>
                <div className="flex gap-4">
                  <span className="text-blue-600">Revenue: ${item.revenue}</span>
                  <span className="text-green-600">Users: {item.users}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((item.revenue || 0) / maxRevenue) * 100}%` }}
                  />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((item.users || 0) / maxUsers) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
