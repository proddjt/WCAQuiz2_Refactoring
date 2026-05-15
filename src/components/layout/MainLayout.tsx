'use client'

import i18next from "i18next";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useMemo } from "react";
import Providers from "./Providers";
import { Box } from "@mantine/core";
import Particles from "../react-bits/Particles";
import Footer from "./Footer";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function MainLayout({children} : {children: React.ReactNode}) {
  const language = useMemo(() => navigator.language.split('-')[0] || "en", []);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language])

  return (
    <html lang={language} suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://wcaquiz.xyz",
              name: "WCAQuiz",
              description: "An independent web-app based on World Cube Association world. It allows you to play various quizzes based on WCA data.",
              image: "https://wcaquiz.xyz/og-image.jpg",
            }),
          }}
        />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Providers>
          <Box pos={"fixed"} w={"100vw"} h={"100vh"} style={{zIndex: "-1"}}>
            <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={20}
            speed={0.5}
            particleBaseSize={200}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={true}
            />
          </Box>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}