import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col border-t border-gray-100 bg-black text-white">
      <div className="flex flex-wrap justify-between gap-5 px-6 py-10 max-md:flex-col sm:px-16">
        <div className="flex flex-col items-start justify-start gap-6">
          <Image
            src="/logo.png"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
          <p className="text-sm">
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
