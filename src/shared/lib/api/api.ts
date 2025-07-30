import type { Activity, ApiResponse, ChartData, Metric, User } from "../types"
import { formatDate } from "../utils/utils"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-15",
    lastLogin: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-10",
    lastLogin: "2024-01-19T14:20:00Z",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "moderator",
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-05",
    lastLogin: "2024-01-18T09:15:00Z",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "user",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-12",
    lastLogin: "2024-01-20T16:45:00Z",
  },
]

export const mockMetrics: Metric[] = [
  {
    id: "1",
    title: "Total Users",
    value: "2,543",
    change: "+12.5%",
    trend: "up",
  },
  {
    id: "2",
    title: "Revenue",
    value: "$45,231",
    change: "+8.2%",
    trend: "up",
  },
  {
    id: "3",
    title: "Active Sessions",
    value: "1,234",
    change: "-2.4%",
    trend: "down",
  },
  {
    id: "4",
    title: "Conversion Rate",
    value: "3.24%",
    change: "+0.8%",
    trend: "up",
  },
]

export const mockChartData: ChartData[] = [
  { name: "Jan", revenue: 4000, users: 240 },
  { name: "Feb", revenue: 3000, users: 139 },
  { name: "Mar", revenue: 2000, users: 980 },
  { name: "Apr", revenue: 2780, users: 390 },
  { name: "May", revenue: 1890, users: 480 },
  { name: "Jun", revenue: 2390, users: 380 },
]

export const mockActivities: Activity[] = [
  {
    id: "1",
    user: "John Doe",
    action: "Created new project",
    timestamp: "2024-01-20T10:30:00Z",
    type: "user",
  },
  {
    id: "2",
    user: "System",
    action: "Database backup completed",
    timestamp: "2024-01-20T09:15:00Z",
    type: "system",
  },
  {
    id: "3",
    user: "Jane Smith",
    action: "Updated user profile",
    timestamp: "2024-01-20T08:45:00Z",
    type: "user",
  },
  {
    id: "4",
    user: "Security",
    action: "Failed login attempt detected",
    timestamp: "2024-01-20T08:30:00Z",
    type: "security",
  },
]

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  async getUsers(): Promise<ApiResponse<User[]>> {
    await delay(500)
    return { data: mockUsers, success: true }
  },

  async createUser(user: Omit<User, "id" | "createdAt" | "lastLogin">): Promise<ApiResponse<User>> {
    await delay(300)
    const newUser: User = {
      ...user,
      id: formatDate(Date.now().toString()),
      createdAt: formatDate(Date.now().toString().split('T')[0]),
      lastLogin: formatDate(Date.now().toString()),
    }
    mockUsers.push(newUser)
    return { data: newUser, success: true, message: "User created successfully" }
  },

  async updateUser(id: string, updates: Partial<User>): Promise<ApiResponse<User>> {
    await delay(300)
    const userIndex = mockUsers.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      return { data: {} as User, success: false, message: "User not found" }
    }
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates }
    return { data: mockUsers[userIndex], success: true, message: "User updated successfully" }
  },

  async deleteUser(id: string): Promise<ApiResponse<boolean>> {
    await delay(300)
    const userIndex = mockUsers.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      return { data: false, success: false, message: "User not found" }
    }
    mockUsers.splice(userIndex, 1)
    return { data: true, success: true, message: "User deleted successfully" }
  },

  async getMetrics(): Promise<ApiResponse<Metric[]>> {
    await delay(300)
    return { data: mockMetrics, success: true }
  },

  async getChartData(): Promise<ApiResponse<ChartData[]>> {
    await delay(400)
    return { data: mockChartData, success: true }
  },

  async getActivities(): Promise<ApiResponse<Activity[]>> {
    await delay(200)
    return { data: mockActivities, success: true }
  },
}
