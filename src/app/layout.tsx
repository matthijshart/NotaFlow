import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NotaFlow — Akte Builder",
  description: "Genereer concept-akten voor notariskantoren in Amsterdam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="antialiased min-h-screen bg-[var(--background)]">
        {children}
      </body>
    </html>
  );
}
