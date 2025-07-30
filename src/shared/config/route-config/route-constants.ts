export const ROUTES = {
  OVERVIEW: "/overview",
  ANALYTICS: "/analytics",
  USERS: "/users",
  ACTIVITY: "/activity",
  NOT_FOUND: "*",
} as const;

export type AppRoutes = (typeof ROUTES)[keyof typeof ROUTES];
