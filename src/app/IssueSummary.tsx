import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  close: number;
}

function IssueSummary({ open, inProgress, close }: Props) {
  const statuses: { label: string; link: Status; count: number }[] = [
    { label: "Open Issues", link: "OPEN", count: open },
    { label: "CLose Issues", link: "CLOSED", count: close },
    { label: "InProgress Issues", link: "IN_PROGRESS", count: inProgress },
  ];

  return (
    <Flex gap="5" align={"center"}>
      {statuses.map((s) => (
        <Card>
          <Flex gap={"2"} direction="column">
            <Link
              className="font-medium text-sm"
              href={`/issues?status=${s.link}`}
            >
              {s.label}
            </Link>
            <Text size={"5"} className="font-bold">
              {s.count}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}

export default IssueSummary;
