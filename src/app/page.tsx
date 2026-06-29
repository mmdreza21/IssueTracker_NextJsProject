import { prisma } from "@/lib/prisma";
import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import IssueChart from "./IssueChart";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const close = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  const statusProps = { open, close, inProgress };

  return (
    <Grid gap={"5"} columns={{ initial: "1", md: "2" }}>
      <Flex gap={"5"} direction="column">
        <IssueSummary {...statusProps} />
        <IssueChart {...statusProps} />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of Games issue!",
};
