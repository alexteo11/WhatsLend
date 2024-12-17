import Link from "next/link";
import Image from "next/image";

import { CustomButton } from "@/app/components";

const Navbar = () => {
  return (
    <header className="w-full absolute z-10 hero__bg">
      <nav className="mx-auto flex justify-between items-center sm:px-16 px-6 py-1 shadow-xl">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Compare Loan Logo"
            width={130}
            height={18}
            className="object-contain"
          />
        </Link>
        <CustomButton
          title="Sign In"
          btnType="button"
          containerStyles="text-white rounded-lg min-w-[130px]"
        />
      </nav>
    </header>
  );
};

export default Navbar;
