"use client";

import Quiz from "@/components/pages/reveal/Quiz";
import { useParams, useRouter } from "next/navigation";

const revealDifficulty = ["ez", "md", "hd"];
const revealModes = ["IT", "europe", "asia", "africa", "north-america", "south-america", "world"];

export default function Page() {
  const params = useParams();
  const router = useRouter();

  if (
    !params.mode ||
    !revealModes.includes(params.mode as string) ||
    !params.difficulty ||
    !revealDifficulty.includes(params.difficulty as string)
  )
    router.push("/not-found");

  return <Quiz mode={params.mode as string} difficulty={params.difficulty as string} />;
}
