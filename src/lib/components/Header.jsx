import Image from "next/image";

export const Header = () => {
  return (
    <header className="p-4 w-full h-[60px] !bg-white flex items-center !gap-4 ">
      <div className="h-full flex gap-2 items-center !p-4">
        <Image
          src="/assets/logo.webp"
          alt="Company's logo"
          width={70}
          height={70}
        />
        <h1 className="text-2xl text-green-700">Retro Hub</h1>
      </div>
    </header>
  );
};
