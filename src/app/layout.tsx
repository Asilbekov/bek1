import type { Metadata } from "next";
import { Inter, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
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
      <body className={`${inter.variable} ${pressStart2P.variable} ${vt323.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
