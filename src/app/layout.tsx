import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import NavBar from "./NavBar";
import { Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mamads | Issue Tracker",
  description: "haha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} `}>
      <body>
        <Theme accentColor="plum" panelBackground="solid" appearance="light">
          <NavBar></NavBar>
          <main className="p-5">{children}</main>
          {/* <ThemePanel></ThemePanel> */}
        </Theme>
      </body>
    </html>
  );
}
