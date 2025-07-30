import { UsersTable } from "@/features/users-table";
import { LoadingData } from "@/shared/components/ui/loading-data";
import { api } from "@/shared/lib/api/api";
import type { User } from "@/shared/lib/types";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [users] = await Promise.all([api.getUsers()]);
      if (users.success) setUsers(users.data);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshUsers = async () => {
    const response = await api.getUsers();
    if (response.success) {
      setUsers(response.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    <LoadingData />;
  }

  return (
    <div className="space-y-6">
      <UsersTable users={users} onUsersChange={refreshUsers} />
    </div>
  );
};

export default UsersPage;
