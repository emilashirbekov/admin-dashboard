import { AppRouter } from "./providers/router";
import { useState } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/shared/components/ui/breadcrumb";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { DashboardSidebar } from "@/widgets/dashboard-sidebar";
import { useTheme } from "./providers/ThemeProvider";

function App() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("overview");


  const getSectionTitle = () => {
    switch (activeSection) {
      case "overview":
        return "Overview";
      case "analytics":
        return "Analytics";
      case "users":
        return "Users Management";
      case "activity":
        return "Activity Feed";
      default:
        return "Overview";
    }
  };

  return (
    <div className={theme}>
      <SidebarProvider>
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
         <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 dark:text-white" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{getSectionTitle()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-[92%]">
          <ThemeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
            <AppRouter />
          </div>
        </div>
      </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default App;
