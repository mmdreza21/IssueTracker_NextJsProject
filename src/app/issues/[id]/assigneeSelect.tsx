"use client";
import useUsers from "@/app/hooks/useUsers";
import { Issue } from "@prisma/client";
import { Flex, Select, Skeleton, Text } from "@radix-ui/themes";
import axios from "axios";

interface AssigneeSelectProps {
  issue: Issue;
  currentAssigneeId?: string | null;
}

function AssigneeSelect({ issue, currentAssigneeId }: AssigneeSelectProps) {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton height={"2rem"} />;

  if (error) return null;

  return (
    <Select.Root
      defaultValue={
        issue.assignedToUserId ? issue.assignedToUserId : "unassigned"
      }
      onValueChange={(userId) => {
        axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: userId == "unassigned" ? null : userId,
        });
      }}
    >
      <Select.Trigger placeholder="Assign to..."></Select.Trigger>

      <Select.Content position="popper" sideOffset={5}>
        <Select.Group>
          <Select.Label>Assign Issue</Select.Label>
          <Select.Item value="unassigned">
            <Flex align="center" gap="2">
              <Text size="2">Unassigned</Text>
            </Flex>
          </Select.Item>
        </Select.Group>

        <Select.Separator />

        <Select.Group>
          <Select.Label>Team Members</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.email}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
