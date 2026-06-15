import { Status } from "@/generated/prisma/enums";
import { Badge } from "@radix-ui/themes";
interface Props {
  status: Status;
}

const statusMap: Record<Status, { label: string; color: string }> = {
  OPEN: { label: "Open", color: "red" },
  CLOSED: { label: "Closed", color: "violet" },
  IN_PROGRESS: { label: "In progress", color: "green" },
};

function IssueStatusBadge({ status }: Props) {
  return (
    <Badge color={statusMap[status].color as "red"}>
      {statusMap[status].label}
    </Badge>
  );
}

export default IssueStatusBadge;
