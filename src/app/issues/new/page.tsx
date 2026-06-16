"use client";
import IssueFormSkeleton from "./loading";
import dynamic from "next/dynamic";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

function page() {
  return <IssueForm />;
}

export default page;
