import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HandyANDY Home Repair | Metro Atlanta",
  description: "Honest, reliable handyman and home renovation services across Metro Atlanta. Family-owned since 1995.",
  keywords: "handyman Atlanta, home repair Marietta GA, kitchen remodel, bathroom renovation, deck builder Atlanta",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
