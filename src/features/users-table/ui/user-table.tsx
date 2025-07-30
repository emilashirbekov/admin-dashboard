import { useState } from "react";
import { Search } from "lucide-react";
import type { User, UserForm } from "@/shared/lib/types";
import { api } from "@/shared/lib/api/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { CreateUserModal } from "./CreateUserModal/create-user-modal";
import { UpdateUserModal } from "./UpdateUserModal/update-user-modal";
import { UserTableData } from "./UserTableData/user-table-data";

interface UsersTableProps {
  users: User[];
  onUsersChange: () => void;
}

export function UsersTable({ users, onUsersChange }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<UserForm>({
    name: "",
    email: "",
    role: "user" as const,
    status: "active" as const,
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = async () => {
    setIsLoading(true);
    try {
      const response = await api.createUser({
        ...formData,
        avatar: "/placeholder.svg?height=40&width=40",
      });
      if (response.success) {
        setIsCreateDialogOpen(false);
        setFormData({ name: "", email: "", role: "user", status: "active" });
        onUsersChange();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    setIsLoading(true);
    try {
      const response = await api.updateUser(editingUser.id, formData);
      if (response.success) {
        setEditingUser(null);
        onUsersChange();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await api.deleteUser(userId);
      if (response.success) {
        onUsersChange();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle data-testid='users-title'>Users Management</CardTitle>
            <CardDescription data-testid='users-description'>Manage your application users</CardDescription>
          </div>
          <CreateUserModal
            formData={formData}
            setFormData={setFormData}
            isCreateDialogOpen={isCreateDialogOpen}
            isLoading={isLoading}
            setIsCreateDialogOpen={setIsCreateDialogOpen}
            handleCreateUser={handleCreateUser}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <UserTableData
            openEditDialog={openEditDialog}
            handleDeleteUser={handleDeleteUser}
            isLoading={isLoading}
            filteredUsers={filteredUsers}
          />
        </Table>

        <UpdateUserModal
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          isLoading={isLoading}
          handleUpdateUser={handleUpdateUser}
          formData={formData}
          setFormData={setFormData}
        />
      </CardContent>
    </Card>
  );
}
