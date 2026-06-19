import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./_components/IssueStatusFilter";

function IssuesToolbar() {
  return (
    <Flex gap={"4"} mb="5">
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
      <IssueStatusFilter />
    </Flex>
  );
}

export default IssuesToolbar;
