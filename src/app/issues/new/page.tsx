"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

import "easymde/dist/easymde.min.css";

import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AxiosError } from "axios";

interface IssueForm {
  title: string;
  description: string;
}

function NewIssuePage() {
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <div className="space-y-3 max-w-xl">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await apiClient.post("/issues", data);
            router.push("/issues");
          } catch (error: any) {
            setError(error.response.data.message[0]);
          }
        })}
        className=" space-y-3"
      >
        <TextField.Root placeholder="Title" {...register("title")}>
          <TextField.Slot />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
