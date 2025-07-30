import { ActivityFeed } from "@/features/activity-feed";
import { LoadingData } from "@/shared/components/ui/loading-data";
import { api } from "@/shared/lib/api/api";
import type { Activity } from "@/shared/lib/types";
import { useEffect, useState } from "react";

const ActivityPage = () => {
 const [activities, setActivities] = useState<Activity[]>([]);
   const [loading, setLoading] = useState(true);
 
   const loadData = async () => {
     setLoading(true);
     try {
       const [activities] = await Promise.all([api.getActivities()]);
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
       <ActivityFeed activities={activities} />
     </div>
   );
}

export default ActivityPage