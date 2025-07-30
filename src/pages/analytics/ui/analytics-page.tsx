import { ChartComponent } from "@/features/chart-component";
import { MetricCard } from "@/features/metric-card";
import { LoadingData } from "@/shared/components/ui/loading-data";
import { api } from "@/shared/lib/api/api";
import type { ChartData, Metric } from "@/shared/lib/types";
import { useEffect, useState } from "react";

const AnalyticsPage = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [metrics, chartRes] = await Promise.all([
        api.getMetrics(),
        api.getChartData(),
      ]);
      if (metrics.success) setMetrics(metrics.data);
      if (chartRes.success) setChartData(chartRes.data);
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
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
      <ChartComponent
        data={chartData}
        title="Detailed Analytics"
        description="Comprehensive view of your application metrics"
      />
    </div>
  );
};

export default AnalyticsPage;
