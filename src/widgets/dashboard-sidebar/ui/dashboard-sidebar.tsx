import { BarChart3, Home, Users, Activity } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/shared/components/ui/sidebar";
import { ROUTES } from "@/shared/config/route-config/route-constants";
import { Link } from "react-router-dom";

const navigation = [
  {
    title: "Main",
    items: [
      { title: "Overview", icon: Home, href: ROUTES.OVERVIEW },
      { title: "Analytics", icon: BarChart3, href: ROUTES.ANALYTICS },
      { title: "Users", icon: Users, href: ROUTES.USERS},
      { title: "Activity", icon: Activity, href: ROUTES.ACTIVITY },
    ],
  },
];

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function DashboardSidebar({
  activeSection,
  onSectionChange,
}: DashboardSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="w-max">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BarChart3 className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span data-testid="dashboard" className="font-semibold">
              Dashboard
            </span>
            <span
              data-testid="dashboard-title"
              className="text-xs text-muted-foreground"
            >
              Admin Panel
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link to={item.href}>
                      <SidebarMenuButton
                        isActive={activeSection === item.href.slice(1)}
                        onClick={() => onSectionChange(item.href.slice(1))}
                      >
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
