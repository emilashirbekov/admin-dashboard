import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { User, UserForm } from "@/shared/lib/types";
import { Plus } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface CreateUserModalProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
  formData: UserForm;
  setFormData: Dispatch<SetStateAction<UserForm>>;
  isLoading: boolean;
  handleCreateUser: () => void;
}

export const CreateUserModal = (props: CreateUserModalProps) => {
  const {
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    formData,
    setFormData,
    isLoading,
    handleCreateUser,
  } = props;
  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <button data-testid="add-user-modal-btn">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Add a new user to your application.
          </DialogDescription>
        </DialogHeader>
        <div data-testid="create-user-modal" className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select
              data-testid="role"
              value={formData.role}
              onValueChange={(value: User["role"]) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label data-testid='status' htmlFor="status">Status</Label>
            <Select
              data-testid="status"
              value={formData.status}
              onValueChange={(value: User["status"]) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem data-testid='active' value="active">Active</SelectItem>
                <SelectItem data-testid='inactive' value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            data-testid="create-user-btn"
            onClick={handleCreateUser}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
