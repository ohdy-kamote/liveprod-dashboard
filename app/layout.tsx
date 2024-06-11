import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Live Prod Dashboard",
  description: "This is the scheduling dashboard for the live production team.",
};

export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto p-4">
          <Navbar session={session} />
          <div className="mt-8">
            {props.children}
          </div>
          <div id="modal-root" />
        </div>
      </body>
    </html>
  );
}
