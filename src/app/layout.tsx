import "./globals.css";
import "./animations.css"
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: {
    default: "WCAQuiz by Giovanni Tramontano",
    template: `%s - WCAQuiz by Giovanni Tramontano`,
  },
  description: "WCAQuiz is an independent web-app based on World Cube Association world. It allows you to play various quizzes based on WCA data.",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: "https://wcaquiz.xyz",
  },
  verification: {
    google: "s3PPuEct8UujjcNF4F4fX78TGJEo7E4TfehbiJTqWUs",
  },
  openGraph: {
    type: "website",
    url: "https://wcaquiz.xyz",
    title: "WCAQuiz by Giovanni Tramontano",
    description: "WCAQuiz is an independent web-app based on World Cube Association world. It allows you to play various quizzes based on WCA data.",
    siteName: "WCAQuiz by Giovanni Tramontano",
    images: [
      {
        url: "https://wcaquiz.xyz/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WCAQuiz preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
