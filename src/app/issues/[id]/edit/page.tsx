import { prisma } from "@/lib/prisma";
import IssueForm from "../../_components/IssueForm";

interface Props {
  params: { id: number };
}

async function EditIssuePage({ params }: Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: +id } });
  return <IssueForm issue={issue} />;
}

export default EditIssuePage;
