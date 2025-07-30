import type { User, UserForm } from "@/shared/lib/types";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { UpdateUserModal } from "./update-user-modal";

const meta = {
  title: "Feature/UpdateUserModal",
  tags: ["autodocs"],
  component: UpdateUserModal,
} satisfies Meta<typeof UpdateUserModal>;

export default meta;
type Story = StoryObj<typeof UpdateUserModal>;

const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "",
  role: "admin",
  status: "active",
  lastLogin: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};

const Template = () => {
  const [editingUser, setEditingUser] = useState<User | null>(mockUser);
  const [formData, setFormData] = useState<UserForm>({
    name: mockUser.name,
    email: mockUser.email,
    role: mockUser.role,
    status: mockUser.status,
  });

  const handleUpdateUser = () => {
    console.log("Updated user:", formData);
    setEditingUser(null);
  };

  return (
    <UpdateUserModal
      editingUser={editingUser}
      setEditingUser={setEditingUser}
      formData={formData}
      setFormData={setFormData}
      isLoading={false}
      handleUpdateUser={handleUpdateUser}
    />
  );
};

export const Default: Story = {
  render: Template,
};
