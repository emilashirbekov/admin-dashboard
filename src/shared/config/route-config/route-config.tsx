import { NotFoundPage } from "@/pages/not-found";
import { OverviewPage } from "@/pages/overview";
import type { RouteObject } from "react-router-dom";
import { ROUTES } from "./route-constants";
import { AnalyticsPage } from "@/pages/analytics";
import { ActivityPage } from "@/pages/activity";
import { UsersPage } from "@/pages/users";

export const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: ROUTES.OVERVIEW,
        element: <OverviewPage />,
      },
      {
        path: ROUTES.ANALYTICS,
        element: <AnalyticsPage />,
      },
      {
        path: ROUTES.USERS,
        element: <UsersPage />,
      },
      {
        path: ROUTES.ACTIVITY,
        element: <ActivityPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
