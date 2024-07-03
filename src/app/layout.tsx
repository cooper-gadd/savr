import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { NavBar } from "./_components/navbar";

export const metadata = {
  title: "Savr",
  description: "Savr is a sleek, intuitive recipe manager.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
