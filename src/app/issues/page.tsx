import { prisma } from "@/lib/prisma";
import { Issue, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssuesToolbar from "./IssuesToolbar";
import IssuesTable, {
  columnNames,
  Direction,
  IssueQuery,
} from "./_components/IssuesTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

async function IssuesPage({ searchParams }: Props) {
  let queries = await searchParams;
  const { status, orderBy, page = 1 } = queries;
  const pageSize = 5;

  const statuses = Object.values(Status);
  const validStatus = statuses.includes(status) ? status : undefined;

  const [field, direction] = (orderBy || "").split("-");
  const validOrderBy =
    columnNames.includes(field as keyof Issue) &&
    (direction === Direction.ASC || direction === Direction.DESC)
      ? { [field]: direction }
      : {};

  const where = { status: validStatus };
  const issues = await prisma?.issue.findMany({
    where,
    orderBy: validOrderBy,
    skip: (+page - 1) * pageSize,
    take: pageSize,
  });

  const totalCount = await prisma.issue.count({ where });

  const currentPage = Number(page ?? 1);

  //! with  External API
  // const apiClient = new APIClient<Issue[]>("/api/issues");
  // const issues = await apiClient.getAll({ params: { status: validStatus } });

  return (
    <Flex direction={"column"} gap={"3"}>
      <IssuesToolbar />

      <IssuesTable issues={issues} orderBy={orderBy} searchParams={queries} />

      <Pagination
        itemCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </Flex>
  );
}

export const dynamic = "force-dynamic";
// export const revalidate = 60;

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all Games Issue!",
};
