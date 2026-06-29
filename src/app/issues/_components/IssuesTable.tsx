import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import moment from "moment";
import NextLink from "next/link";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  issues: Issue[];
  orderBy: string;
  searchParams: IssueQuery;
}

export enum Direction {
  ASC = "asc",
  DESC = "desc",
}

async function IssuesTable({ issues, searchParams }: Props) {
  const [field, direction] = (searchParams.orderBy || "").split("-");

  const parseOrderBy = (field: string, direction?: string): string => {
    const res =
      direction === "" || direction === Direction.DESC
        ? `${field}-${Direction.ASC}`
        : `${field}-${Direction.DESC}`;
    return res;
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((c) => (
            <Table.ColumnHeaderCell key={c.label} className={c.className}>
              <Flex gap={"1"}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: parseOrderBy(c.value, direction as Direction),
                    },
                  }}
                >
                  {c.label}
                </NextLink>
                {searchParams.orderBy === `${c.value}-${Direction.DESC}` && (
                  <CaretDownIcon />
                )}
                {searchParams.orderBy === `${c.value}-${Direction.ASC}` && (
                  <CaretUpIcon />
                )}
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
  );
}

export default IssuesTable;
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

export const columnNames = columns.map((column) => column.value);
