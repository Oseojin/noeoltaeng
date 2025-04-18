import "./globals.css";

export const metadata = {
  title: "얼탱이 없는 모음",
  description: "여러 사이트를 하나로 묶는 메인 포털",
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
