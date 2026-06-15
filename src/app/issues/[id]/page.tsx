import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

async function IssueDetailPage({ params }: Props) {
  const { id } = await params;
  if (typeof id !== "number") notFound();
  const issue = await prisma.issue.findUnique({ where: { id: +id } });
  if (!issue) notFound();

  return (
    <div>
      <p>{issue?.title}</p>
      <p>{issue?.status}</p>
      <p>{issue?.description}</p>
      <p>{issue?.createdAt.toDateString()}</p>
    </div>
  );
}

export default IssueDetailPage;
