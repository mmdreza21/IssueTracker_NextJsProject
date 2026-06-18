"use client";
import { Flex, Select, Text } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface AssigneeSelectProps {
  issueId: number;
  currentAssigneeId?: string | null;
}

function AssigneeSelect({ issueId, currentAssigneeId }: AssigneeSelectProps) {
  return (
    <Select.Root>
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
          <Select.Item value="1">mamadreza</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
