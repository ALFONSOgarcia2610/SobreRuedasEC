import { useGetAllUsers } from "@/Services/admin/users.query";

export const useUsers = () => {
  const queryUsers = useGetAllUsers();
  return {
    queryUsers
  };
};
