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
      <body>{children}</body>
    </html>
  );
}
