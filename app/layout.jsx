import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import "./globals.css";

//The geistSans and geistMono variables are used to load and apply custom fonts in the application
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const vt323 = localFont({
  src: "../public/fonts/vt323-v17-latin-regular.woff2",
  variable: "--font-vt323-regular",
  weight: "100 900",
});

export const metadata = {
  title: "Retro Hub",
  description: "Market place for consoles and video games lovers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          geistMono.variable,
          vt323.variable,
          "antialiased",
          "h-full",
          "max-w-md",
          "border-x",
          "m-auto",
          "bg-black",
          "text-white",
          "relative"
        )}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
