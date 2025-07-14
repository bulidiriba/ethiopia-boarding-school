import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoE | Ethiopia Boarding Schools Admission",
  description: "Ethiopia Boarding Schools Admission System",
  icons: {
    icon: "/moe-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
