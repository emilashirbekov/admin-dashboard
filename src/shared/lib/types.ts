export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive";
  avatar: string;
  createdAt: string;
  lastLogin: string;
}

export interface Metric {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export interface ChartData {
  name: string;
  revenue?: number;
  users?: number;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: "user" | "system" | "security";
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export type Status = "active" | "inactive";

export interface UserForm {
  name: string;
  email: string;
  role: User["role"];
  status: User["status"];
}
