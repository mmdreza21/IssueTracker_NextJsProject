"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
// lazy loading
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
// import SimpleMDE from "react-simplemde-editor"

import "easymde/dist/easymde.min.css";

import { createIssueSchema } from "@/lib/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import axios from "axios";
import { Issue } from "@prisma/client";

type IssueFormData = z.infer<typeof createIssueSchema>;

interface Props {
  issue?: Issue | null;
}

function IssueForm({ issue }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const OnSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh(); //For ignore client cash
    } catch (error: any) {
      setError(error.response.data.message[0]);
    } finally {
      setLoading(false);
    }
  });
  return (
    <div className="space-y-3 max-w-xl">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={OnSubmit} className=" space-y-3">
        <TextField.Root
          placeholder="Title"
          {...register("title")}
          defaultValue={issue?.title}
        >
          <TextField.Slot />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          defaultValue={issue?.description}
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isLoading}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;
