import apiClient from "@/lib/apiClient";
import { IssuesType } from "@/types/IssuesType";


export const getIssues = async (): Promise<IssuesType[]> => {
    const { data } = await apiClient.get("/issues");
    return data;
};