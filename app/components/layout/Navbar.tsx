import Link from "next/link";
import Image from "next/image";

import { CustomButton } from "@/app/components";

const Navbar = () => {
  return (
    <header className="hero__bg relative top-0 z-10 w-full shadow-xl">
      <nav className="middle-container-width flex items-center justify-between py-2">
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
