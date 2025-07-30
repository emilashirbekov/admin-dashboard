import type { ChartData } from "@/shared/lib/types";
import { render, screen } from "@testing-library/react";
import { ChartComponent } from "./chart-component";

const mockChartData: ChartData[] = [
  { name: "Jan", revenue: 4000, users: 240 },
  { name: "Feb", revenue: 3000, users: 139 },
];

const mockChartTitle = "Chart title";
const mockChartDescription = "Chart description";

describe("render chart component", () => {
  beforeEach(() => {
    render(
      <ChartComponent
        data={mockChartData}
        title={mockChartTitle}
        description={mockChartDescription}
      />
    );
  });

  test("renders chart title and description", () => {
    const chartTitle = screen.getByTestId("chart-title");
    const chartDescription = screen.getByTestId("chart-description");

    expect(chartTitle).toHaveTextContent(mockChartTitle);
    expect(chartTitle).toBeInTheDocument();

    expect(chartDescription).toBeInTheDocument();
    expect(chartDescription).toHaveTextContent(mockChartDescription);
  });

  test("renders list with chart activities", () => {
    const chartActivities = screen.getAllByTestId("chart-item");
    expect(chartActivities).toHaveLength(mockChartData.length);

    mockChartData.forEach((data) => {
      expect(screen.getByText(data.name)).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes("4000"))
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes("3000"))
      ).toBeInTheDocument();
    });
  });
});
