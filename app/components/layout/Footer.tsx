import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col text-white mt-5 border-t border-gray-100 bg-black">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <Image
            src="/logo.png"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
          <p className="text-sm ">
            CompareLoan 2024 <br />
            All rights reserved &copy;
          </p>
        </div>
        {/* for about us and all those */}
        {/* <div className="footer__links"></div> */}
      </div>
    </footer>
  );
};

export default Footer;
