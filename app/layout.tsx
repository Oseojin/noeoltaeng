import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata = {
  title: "A Bunch of Idiots",
  description: "The Idiot Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Analytics />
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
