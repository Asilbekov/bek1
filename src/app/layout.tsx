import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Bek.uz - O'zbekiston Xizmatlar Bozori",
  description: "O'zbekistonda xizmat ko'rsatuvchilar va mijozlarni bog'lovchi platforma. Santexnik, sartarosh, oshpaz va boshqa ustalarni toping.",
  keywords: ["xizmatlar", "ustalar", "santexnik", "sartarosh", "O'zbekiston", "услуги", "мастера"],
  authors: [{ name: "Bek.uz" }],
  openGraph: {
    title: "Bek.uz - O'zbekiston Xizmatlar Bozori",
    description: "Kerakli xizmatni toping yoki o'z xizmatlaringizni taklif eting",
    type: "website",
    locale: "uz_UZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
