import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Savr",
  description: "Savr is a sleek, intuitive recipe manager.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function NavBar() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Savr</div>
      <div>Sign In</div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
