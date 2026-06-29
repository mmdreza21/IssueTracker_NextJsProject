import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import NavBar from "./NavBar";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import QueryProvider from "./providers/QueryProvider";
import AuthProvider from "./providers/Authprovider";

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
        <QueryProvider>
          <AuthProvider>
            <Theme accentColor="plum" panelBackground="solid" appearance="dark">
              <NavBar></NavBar>
              <main className="p-5">
                <Container>{children}</Container>
              </main>
              {/* <ThemePanel></ThemePanel> */}
            </Theme>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
