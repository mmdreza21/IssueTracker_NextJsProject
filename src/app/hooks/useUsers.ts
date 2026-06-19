import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "@/services/api-client";
import { User } from "@prisma/client";


const apiClient = new APIClient<User[]>("/api/users");

const useUsers = () =>
    useQuery<User[], Error>({
        queryKey: ["users"],
        queryFn: () => apiClient.getAll(),
        staleTime: ms("1H"),
        retry: 3
    });

export default useUsers; 