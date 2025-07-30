import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/shared/components/ui/table";
import type { User } from "@/shared/lib/types";
import { Edit, Trash2 } from "lucide-react";

interface UsersTableProps {
  filteredUsers: User[];
  openEditDialog: (user: User) => void;
  handleDeleteUser: (id: string) => void;
  isLoading: boolean;
}

export const UserTableData = (props: UsersTableProps) => {
  const { filteredUsers, openEditDialog, handleDeleteUser, isLoading } = props;
  return (
    <TableBody data-testid='users-table'>
      {filteredUsers.map((user) => (
        <TableRow key={user.id}>
          <TableCell className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </TableCell>
          <TableCell>
            <Badge variant={user.role === "admin" ? "default" : "secondary"}>
              {user.role}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge variant={user.status === "active" ? "default" : "secondary"}>
              {user.status}
            </Badge>
          </TableCell>
          <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
          <TableCell>
            <div className="flex items-center space-x-2">
              <Button
                data-testid='edit-btn'
                variant="ghost"
                size="sm"
                onClick={() => openEditDialog(user)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                data-testid='delete-btn'
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteUser(user.id)}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
