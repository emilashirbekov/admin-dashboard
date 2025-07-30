import type { ChartData } from "@/shared/lib/types";
import { ChartComponent } from "./chart-component";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Feature/Chart",
  component: ChartComponent,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    data: { control: "object" },
  },
} satisfies Meta<typeof ChartComponent>;

export default meta;
type Story = StoryObj<typeof ChartComponent>;

const mockChartData: ChartData[] = [
  { name: "Jan", revenue: 4000, users: 240 },
  { name: "Feb", revenue: 3000, users: 139 },
  { name: "Mar", revenue: 2000, users: 980 },
  { name: "Apr", revenue: 2780, users: 390 },
  { name: "May", revenue: 1890, users: 480 },
  { name: "Jun", revenue: 2390, users: 380 },
];

export const Default: Story = {
  args: {
    title: "Quarterly Stats",
    description: "Revenue and user growth",
    data: mockChartData,
  },
};

export const SinglePoint: Story = {
  args: {
    title: "Single Point",
    description: "Only January data",
    data: [{ name: "Jan", revenue: 4000, users: 120 }],
  },
};

export const Empty: Story = {
  args: {
    title: "No Data Available",
    description: "Nothing to display",
    data: [],
  },
};

export const Playground: Story = {
  args: {
    title: "Playground Chart",
    description: "Change data through Controls",
    data: mockChartData,
  },
};
