import { Button, Flex } from "@radix-ui/themes";
import { Spinner } from "./components";

export default function Home() {
  return (
    <Button className="">
      <span>Take NOTE THEN CODE</span>
      <Spinner />
    </Button>
  );
}
