import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import type { Activity } from "@/shared/lib/types"
import { getActivityIcon } from "./activity-icon/get-activity-icon"
import { getActivityColor } from "./activity-color/get-activity-color"

export interface ActivityFeedProps {
  activities: Activity[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle data-testid='activity-title'>Recent Activity</CardTitle>
        <CardDescription data-testid='activity-description'>Latest actions and system events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div data-testid='activity-item' key={activity.id} className="flex items-start space-x-3">
              <Avatar className={`h-8 w-8 ${getActivityColor(activity.type)}`}>
                <AvatarFallback className="text-white">{getActivityIcon(activity.type)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.user}</p>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
