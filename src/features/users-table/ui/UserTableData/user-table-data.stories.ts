import type { User } from "@/shared/lib/types";
import { UserTableData } from "./user-table-data";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Feature/UserTable",
  component: UserTableData,
  tags: ["autodocs"],
} satisfies Meta<typeof UserTableData>;

export default meta;
type Story = StoryObj<typeof UserTableData>;

const mockUsers: User[] = [
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
];

export const Default: Story = {
  args: {
    filteredUsers: mockUsers,
    openEditDialog: (user) => {
      console.log("Edit", user);
    },
    handleDeleteUser: (id) => {
      console.log("Delete", id);
    },
    isLoading: false,
  },
};

export const Empty: Story = {
  args: {
    filteredUsers: [],
  },
};
