import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "@/services/api-client";
import { Issue, Status } from "@prisma/client";


const apiClient = new APIClient<Issue[]>("/api/issues");

const useIssues = ({ }: { filter: { status: Status | undefined } }) =>
    useQuery<Issue[], Error>({
        queryKey: ["issue"],
        queryFn: () => apiClient.getAll(),
        staleTime: ms("1H"),
        retry: 3
    });

export default useIssues; 