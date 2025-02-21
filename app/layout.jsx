import { AdminBtn } from "@/components/buttons/AdminBtn";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
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
          "antialiased",
          vt323.variable,
          geistMono.variable,
          "h-full",
          "bg-black",
          "text-white",
          "relative"
        )}
      >
        <AdminBtn />
        <div className="flex flex-col min-h-full max-w-md m-auto gap-2">
          <Header />
          <main className="py-1 px-2 flex-1">
            <div className="flex flex-col gap-4 justify-center items-center font-[family-name:var(--font-geist-sans)]">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
