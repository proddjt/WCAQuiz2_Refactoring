'use client'

import Quiz from "@/components/pages/versus/Quiz";
import { Suspense } from "react";

export default function Page(){
    
    return (
        <Suspense>
            <Quiz />
        </Suspense>
    )
}