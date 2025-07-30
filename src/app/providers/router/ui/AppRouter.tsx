import { routes } from "@/shared/config/route-config";
import { useRoutes } from "react-router-dom";

function AppRoutes() {
  return useRoutes(routes);
}

export const AppRouter = () => {
  return (
      <AppRoutes />
  );
};
