import type { Metadata } from "next";
import { barlowCondensed, inter, newsreader } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Temikaze",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable} ${newsreader.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
