import { IssueStatusBadge, Link } from "@/app/components";
import { prisma } from "@/lib/prisma";
import { Issue, Status } from "@prisma/client";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import moment from "moment";
import NextLink from "next/link";
import Pagination from "../components/Pagination";
import IssuesToolbar from "./IssuesToolbar";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: number };
}

enum Direction {
  ASC = "asc",
  DESC = "desc",
}

async function IssuesPage({ searchParams }: Props) {
  let queries = await searchParams;
  const { status, orderBy, page } = queries;

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Create",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const statuses = Object.values(Status);
  const validStatus = statuses.includes(status) ? status : undefined;

  const [field, direction] = (orderBy || "").split("-");

  const validOrderBy =
    columns.map((column) => column.value).includes(field as keyof Issue) &&
    (direction === Direction.ASC || direction === Direction.DESC)
      ? { [field]: direction }
      : {};

  const issues = await prisma?.issue.findMany({
    where: { status: validStatus },
    orderBy: validOrderBy,
  });

  const totalCount = await prisma.issue.count();

  const parseOrderBy = (field: string, direction?: string): string => {
    const res =
      direction === "" || direction === Direction.DESC
        ? `${field}-${Direction.ASC}`
        : `${field}-${Direction.DESC}`;
    return res;
  };

  const currentPage = Number(page ?? 1);

  //! with  External API
  // const apiClient = new APIClient<Issue[]>("/api/issues");
  // const issues = await apiClient.getAll({ params: { status: validStatus } });

  return (
    <div>
      <IssuesToolbar />
      <Table.Root variant="surface" className="mt-5">
        <Table.Header>
          <Table.Row>
            {columns.map((c) => (
              <Table.ColumnHeaderCell key={c.label} className={c.className}>
                <Flex gap={"1"}>
                  <NextLink
                    href={{
                      query: {
                        ...queries,
                        orderBy: parseOrderBy(c.value, direction as Direction),
                      },
                    }}
                  >
                    {c.label}
                  </NextLink>
                  {orderBy === `${c.value}-${Direction.DESC}` && (
                    <CaretDownIcon />
                  )}
                  {orderBy === `${c.value}-${Direction.ASC}` && <CaretUpIcon />}
                </Flex>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues?.map((issue: any) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <br />
                <div className={`block md:hidden text-xs mt-1   `}>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {moment(issue.createdAt).format("YYYY.MM.DD")}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={totalCount}
        pageSize={10}
        currentPage={currentPage}
      />
    </div>
  );
}

export const dynamic = "force-dynamic";
// export const revalidate = 60;

export default IssuesPage;
