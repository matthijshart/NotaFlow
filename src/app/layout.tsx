import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NotaFlow — Aktes Opstellen",
  description: "Genereer concept-akten voor notariskantoren in Amsterdam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-[var(--background)]">
        {children}
      </body>
    </html>
  );
}
