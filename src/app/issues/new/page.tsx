"use client";
import { Button, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

import "easymde/dist/easymde.min.css";

import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

function NewIssuePage() {
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await apiClient.post("/issues", data);
        router.push("/issues");
      })}
      className="max-w-xl space-y-3"
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
  );
}

export default NewIssuePage;
