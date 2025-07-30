import type { UserForm } from "@/shared/lib/types";
import { CreateUserModal } from "./create-user-modal";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "Feature/CreateUserModal",
  component: CreateUserModal,
  tags: ["autodocs"],
  argTypes: {
    isCreateDialogOpen: { control: { type: "boolean" } },
    isLoading: { control: { type: "boolean" } },
  },
} satisfies Meta<typeof CreateUserModal>;

export default meta;
type Story = StoryObj<typeof CreateUserModal>;

const initialFormData: UserForm = {
  name: "",
  email: "",
  role: "user",
  status: "active",
};

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isCreateDialogOpen ?? true);
    const [formData, setFormData] = useState<UserForm>(initialFormData);

    return (
      <CreateUserModal
        {...args}
        isCreateDialogOpen={isOpen}
        setIsCreateDialogOpen={setIsOpen}
        formData={formData}
        setFormData={setFormData}
        handleCreateUser={() => alert("User created")}
      />
    );
  },
  args: {
    isCreateDialogOpen: true,
    isLoading: false,
  },
};
