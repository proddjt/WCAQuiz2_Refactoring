'use client'

import Quiz from "@/components/pages/goldrush/Quiz";
import { useParams } from "next/navigation";

export default function Page(){
    const params = useParams();
    
    return (
        <Quiz mode={params.mode as string || ""} />
    )
}