import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Album Sharing Frame for Farcaster",
  description: "A frame generator for to share album on farcaster protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div>
          <img className={[styles.Bird, styles.BirdRight].join(' ')} src="/birds.png" />
          <img className={[styles.Bird, styles.BirdMiddle].join(' ')} src="/birds.png" />
          <img className={[styles.Bird, styles.BirdLeft].join(' ')} src="/birds.png" />
          <img className={[styles.Cloud, styles.CloudRight].join(' ')} src="/cloud-1.png" />
          <img className={[styles.Cloud, styles.CloudLeft].join(' ')} src="/cloud-1.png" />
        </div>
      </body>
    </html>
  );
}
