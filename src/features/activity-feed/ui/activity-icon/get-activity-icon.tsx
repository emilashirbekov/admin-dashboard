import type { Activity } from "@/shared/lib/types"
import { Settings, Shield, User } from "lucide-react"

export const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "user":
        return <User className="h-4 w-4" />
      case "security":
        return <Shield className="h-4 w-4" />
      case "system":
        return <Settings className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
}