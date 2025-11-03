import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "memstate-api: El mock server con memoria",
  description: "Un servidor de API mock stateful que no olvida tus cambios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto max-w-4xl p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
