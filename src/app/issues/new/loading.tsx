import { Box, Skeleton } from "@radix-ui/themes";

function loadingIssuesDetailPage() {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
}

export default loadingIssuesDetailPage;
