import { render } from "@testing-library/react"
import { getActivityIcon } from "./get-activity-icon"
import type { Activity } from "@/shared/lib/types"

describe("getActivityIcon", () => {
  function renderIcon(type: string) {
    const { container } = render(<>{getActivityIcon(type as Activity['type'])}</>)
    return container.querySelector("svg")
  }

  test("returns User icon for 'user' type", () => {
    const svg = renderIcon("user")
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass("h-4", "w-4")
  })

  test("returns Shield icon for 'security' type", () => {
    const svg = renderIcon("security")
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass("h-4", "w-4")
  })

  test("returns Settings icon for 'system' type", () => {
    const svg = renderIcon("system")
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass("h-4", "w-4")
  })

  test("returns User icon for unknown type", () => {
    const svg = renderIcon("unknown")
    expect(svg).toBeInTheDocument()
  })
})
