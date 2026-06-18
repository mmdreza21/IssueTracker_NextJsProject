"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button, Card, Flex, Text, TextField } from "@radix-ui/themes";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    await signIn("email", {
      email,
      callbackUrl: "/",
    });

    setLoading(false);
  };

  return (
    <Card size="3" className="max-w-md mx-auto mt-20">
      <Flex direction="column" gap="4">
        <Text size="6" weight="bold">
          Sign In
        </Text>

        <TextField.Root
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button onClick={handleLogin} loading={loading}>
          Send Magic Link
        </Button>
      </Flex>
    </Card>
  );
}
