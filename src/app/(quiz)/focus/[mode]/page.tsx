"use client";

import Quiz from "@/components/pages/focus/Quiz";
import { useParams, useRouter } from "next/navigation";

const focusModes = ["IT", "europe", "asia", "africa", "north-america", "south-america", "world"];

export default function Page() {
  const params = useParams();
  const router = useRouter();

  if (!params.mode || !focusModes.includes(params.mode as string)) router.push("/not-found");

  return <Quiz mode={params.mode as string} />;
}
