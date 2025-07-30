import type { Meta, StoryObj } from '@storybook/react';
import { ActivityFeed } from "./activity-feed";
import type { Activity } from "@/shared/lib/types";

const meta = {
  title: "Feature/Activity",
  component: ActivityFeed,
  tags: ["autodocs"],
} satisfies Meta<typeof ActivityFeed>;

export default meta;
type Story = StoryObj<typeof ActivityFeed>;

const mockActivities: Activity[] = [
  {
    id: "1",
    user: "John Doe",
    action: "Created new project",
    timestamp: "2024-01-20T10:30:00Z",
    type: "user",
  },
  {
    id: "2",
    user: "System",
    action: "Database backup completed",
    timestamp: "2024-01-20T09:15:00Z",
    type: "system",
  },
  {
    id: "3",
    user: "Jane Smith",
    action: "Updated user profile",
    timestamp: "2024-01-20T08:45:00Z",
    type: "user",
  },
  {
    id: "4",
    user: "Security",
    action: "Failed login attempt detected",
    timestamp: "2024-01-20T08:30:00Z",
    type: "security",
  },
];

export const Default: Story = {
  args: {
    activities: mockActivities,
  },
};

export const Empty: Story = {
  args: {
    activities: [],
  },
};
