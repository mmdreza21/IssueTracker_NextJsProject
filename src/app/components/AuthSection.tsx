import email from "next-auth/providers/email";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
import { Box, Button, Container, Flex, Skeleton, Text } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
function AuthSection() {
  const { data, status } = useSession();

  if (status == "loading") return <Skeleton />;

  const email = data?.user?.email ?? "";
  const firstLetter = email.charAt(0).toUpperCase();
  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button className="w-9 h-9 rounded-full flex items-center justify-center font-bold hover:opacity-80">
              {firstLetter}
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-55 rounded-md  shadow-lg border p-2"
              sideOffset={8}
            >
              {/* Email header */}
              <div className="px-2 py-2 border-b mb-2">
                <Text size="2" weight="bold">
                  {email}
                </Text>
              </div>

              {/* Profile (optional future page) */}
              <DropdownMenu.Item asChild>
                <Link href="/profile" className="px-2 py-2 rounded-md block ">
                  Profile
                </Link>
              </DropdownMenu.Item>

              {/* Logout */}
              <DropdownMenu.Item
                className="px-2 py-2 rounded-md text-red-600 hover:bg-red-50 cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Log out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      )}

      {status === "unauthenticated" && (
        <Button>
          <Link href="/api/auth/signin" className="">
            Log in
          </Link>
        </Button>
      )}
    </Box>
  );
}

export default AuthSection;
