"use client";

import IssueStatusBadge, { statusMap } from "@/app/components/IssueStatusBadge";
import { Status } from "@prisma/client";
import { Select, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

function IssueStatusFilter() {
  const statusList: { label: string; value: Status }[] = [
    {
      label: statusMap.OPEN.label,
      value: Status.OPEN,
    },
    {
      label: statusMap.CLOSED.label,
      value: Status.CLOSED,
    },
    {
      label: statusMap.IN_PROGRESS.label,
      value: Status.IN_PROGRESS,
    },
  ];

  const currentQueries = useSearchParams();
  const currentStatus = currentQueries.get("status") ?? "all";
  const router = useRouter();

  const filterStatus = (status: string) => {
    const params = new URLSearchParams(currentQueries.toString());
    // for (const element of currentQueries.keys()) {
    //   params.set(element, currentQueries.get(element)!);
    // }
    if (status !== "all") params.set("status", status);
    else params.delete("status");

    params.set("page", "1");
    const query = params.size ? "?" + params.toString() : "";
    router.push(`/issues${query}`);
  };

  return (
    <>
      <Select.Root defaultValue={currentStatus} onValueChange={filterStatus}>
        <Select.Trigger placeholder="Filter by status..."></Select.Trigger>

        <Select.Content position="popper" sideOffset={5}>
          <Select.Group>
            <Select.Label>No Filter</Select.Label>
            <Select.Item value="all">
              <Flex align="center" gap="2">
                <Text size="2">All</Text>
              </Flex>
            </Select.Item>
          </Select.Group>

          <Select.Separator />

          <Select.Group>
            <Select.Label>Status List</Select.Label>
            {statusList.map((status) => (
              <Select.Item key={status.label} value={status.value}>
                <IssueStatusBadge status={status.value} />
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
}

export default IssueStatusFilter;
