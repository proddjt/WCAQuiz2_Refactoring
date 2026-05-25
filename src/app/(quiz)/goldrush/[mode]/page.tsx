"use client";

import Quiz from "@/components/pages/goldrush/Quiz";
import { useParams, useRouter } from "next/navigation";

const goldrushModes = ["ez", "md", "hd"];

export default function Page() {
  const params = useParams();
  const router = useRouter();

  if (!params.mode || !goldrushModes.includes(params.mode as string)) router.push("/not-found");

  return <Quiz mode={params.mode as "ez" | "md" | "hd"} />;
}
