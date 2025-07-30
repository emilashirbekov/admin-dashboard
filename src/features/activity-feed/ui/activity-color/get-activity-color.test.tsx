import type { Activity } from "@/shared/lib/types"
import { getActivityColor } from "./get-activity-color"

describe("getActivityColor", () => {
  test("returns correct color for 'user' type", () => {
    expect(getActivityColor("user")).toBe("bg-blue-500")
  })

  test("returns correct color for 'security' type", () => {
    expect(getActivityColor("security")).toBe("bg-red-500")
  })

  test("returns correct color for 'system' type", () => {
    expect(getActivityColor("system")).toBe("bg-green-500")
  })

  test("returns default color for unknown type", () => {
    expect(getActivityColor("unknown" as Activity['type'])).toBe("bg-gray-500")
  })
})
