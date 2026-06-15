import { Box, Card, Flex, Heading, Skeleton } from "@radix-ui/themes";
import "react-loading-skeleton/dist/skeleton.css";

function loadingIssuesDetailPage() {
  return (
    <Box>
      <Heading>
        <Skeleton className="max-w-xl" />
      </Heading>
      <Flex className="space-x-3" my="2">
        <Skeleton width="6rem" />
        <Skeleton width="6rem" />
      </Flex>
      <Card className="prose mt-6">
        <Skeleton />
      </Card>
    </Box>
  );
}

export default loadingIssuesDetailPage;
