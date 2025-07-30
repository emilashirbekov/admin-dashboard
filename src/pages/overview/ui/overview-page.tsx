import { ActivityFeed } from "@/features/activity-feed";
import { ChartComponent } from "@/features/chart-component";
import { MetricCard } from "@/features/metric-card";
import { LoadingData } from "@/shared/components/ui/loading-data";
import { api, mockMetrics } from "@/shared/lib/api/api";
import type { Activity, ChartData } from "@/shared/lib/types";
import { useEffect, useState } from "react";

const OverviewPage = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [chartRes, activities] = await Promise.all([
        api.getChartData(),
        api.getActivities(),
      ]);
      if (chartRes.success) setChartData(chartRes.data);
      if (activities.success) setActivities(activities.data);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    <LoadingData />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ChartComponent
          data={chartData}
          title="Revenue & Users Overview"
          description="Monthly revenue and user growth trends"
        />
        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
};

export default OverviewPage;
