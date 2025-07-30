import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import type { Metric } from "@/shared/lib/types"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MetricCardProps {
  metric: Metric
}

export function MetricCard({ metric }: MetricCardProps) {
  const TrendIcon = metric.trend === "up" ? TrendingUp : metric.trend === "down" ? TrendingDown : Minus
  const trendColor =
    metric.trend === "up" ? "text-green-600" : metric.trend === "down" ? "text-red-600" : "text-gray-600"

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
        <TrendIcon className={`h-4 w-4 ${trendColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <p className={`text-xs ${trendColor}`}>{metric.change} from last month</p>
      </CardContent>
    </Card>
  )
}
