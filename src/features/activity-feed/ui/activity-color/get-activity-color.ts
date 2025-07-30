import type { Activity } from "@/shared/lib/types"

export const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "user":
        return "bg-blue-500"
      case "security":
        return "bg-red-500"
      case "system":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }
