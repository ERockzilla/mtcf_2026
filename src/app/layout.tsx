import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SimulationProvider } from "@/context/SimulationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MTCF Demo",
  description: "MedTech Cognitive Foundry Simulation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SimulationProvider>
          {children}
        </SimulationProvider>
      </body>
    </html>
  );
}
