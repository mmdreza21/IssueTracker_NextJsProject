import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/lib/prisma";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
interface Props {
  params: { id: string };
}

async function IssueDetailPage({ params }: Props) {
  const { id } = await params;
  if (typeof +id !== "number") notFound();
  const issue = await prisma.issue.findUnique({ where: { id: +id } });
  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue?.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status}></IssueStatusBadge>
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-6">
        <Markdown>{issue?.description}</Markdown>
      </Card>
    </div>
  );
}

export default IssueDetailPage;
