import { prisma } from "@/lib/prisma";
import { Table } from "@radix-ui/themes";
import moment from "moment";
import IssueStatusBadge from "../components/IssueStatusBadge";
import Link from "../components/Link";
import IssuesToolbar from "./IssuesToolbar";

async function IssuesPage() {
  const issues = await prisma?.issue.findMany();
  return (
    <div>
      <IssuesToolbar />
      <Table.Root variant="surface" className="mt-5">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell"></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue: any) => (
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
    </div>
  );
}

export default IssuesPage;
