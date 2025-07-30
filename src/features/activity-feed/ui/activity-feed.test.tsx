import { screen, render } from "@testing-library/react";
import { ActivityFeed } from "./activity-feed";
import "@testing-library/jest-dom";
import type { Activity } from "@/shared/lib/types";

const mockActivities: Activity[] = [
  {
    id: "1",
    user: "Alice",
    type: "user",
    action: "Logged into the system",
    timestamp: new Date("2025-07-18T10:00:00Z").toISOString(),
  },
  {
    id: "2",
    user: "Bob",
    type: "security",
    action: "Updated user settings",
    timestamp: new Date("2025-07-18T11:00:00Z").toISOString(),
  },
];

describe("ActivityFeed component", () => {
  beforeEach(() => {
    render(<ActivityFeed activities={mockActivities} />);
  });

  test("renders card header and description", () => {
    const cardHeader = screen.getByTestId("activity-title");
    expect(cardHeader).toBeInTheDocument();
    expect(cardHeader).toHaveTextContent(/Recent Activity/i);

    const cardDescription = screen.getByTestId("activity-description");
    expect(cardDescription).toBeInTheDocument();
    expect(cardDescription).toHaveTextContent(
      /Latest actions and system events/i
    );
  });

  test("render activity list", () => {
    const activityItems = screen.getAllByTestId("activity-item");
    expect(activityItems).toHaveLength(mockActivities.length);

    mockActivities.forEach((activity) => {
      expect(screen.getByText(activity.user)).toBeInTheDocument();
      expect(screen.getByText(activity.action)).toBeInTheDocument();
      expect(screen.getByText(activity.type)).toBeInTheDocument();
    });
  });
});
