"use client";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="p-3 w-full h-fit flex flex-col justify-center items-center gap-4 border-y border-white absolute bottom-0">
      <div className="h-full flex gap-2 items-center my-[5px]">
        <Link href="/">
          <Image
            className="rounded-lg"
            src="/assets/logo.webp"
            alt="Company's logo"
            width={70}
            height={70}
          />
        </Link>
      </div>
      <div className="flex flex-col  h-full w-fit gap-4 items-center">
        <span>RetroHub All right reserved</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};
