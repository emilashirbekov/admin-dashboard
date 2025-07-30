import type { Meta, StoryObj } from "@storybook/react";
import { MetricCard } from "./metric-card";
import type { Metric } from "@/shared/lib/types";

const meta = {
  title: "Feature/MetricCard",
  component: MetricCard,
  tags: ["autodocs"],
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof MetricCard>;

const mockMetric: Metric = {
  id: "1",
  title: "Total Users",
  value: "2,543",
  change: "+12.5%",
  trend: "up",
};

export const TrendingUp: Story = {
  args: {
    metric: {
      ...mockMetric,
      trend: "up",
      change: "+12.5%",
    },
  },
}

export const TrendingDown: Story = {
  args: {
    metric: {
      ...mockMetric,
      trend: "down",
      change: "-8.1%",
    },
  },
}

export const NoChange: Story = {
  args: {
    metric: {
      ...mockMetric,
      trend: "neutral",
      change: "0.0%",
    },
  },
}