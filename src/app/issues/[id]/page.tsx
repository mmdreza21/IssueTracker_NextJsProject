import { prisma } from "@/lib/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOption";
import AssigneeSelect from "./assigneeSelect";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } }),
);

async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  if (typeof +id !== "number") notFound();
  const issue = await fetchIssue(+id);
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} className="" gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

export default IssueDetailPage;

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchIssue(+id);
  return {
    title: issue?.title,
    description: issue?.description,
  };
}
