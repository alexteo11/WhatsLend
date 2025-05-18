"use client";
import Image from "next/image";
import ApplyButton from "../common/ApplyButton";

const Hero = () => {
  return (
    <div className="hero__bg overflow-hidden">
      <div className="middle-container-width flex flex-col items-center justify-around gap-x-10 py-20 md:flex-row">
        <div className="w-full flex-auto justify-center">
          <h1 className="hero__title text-shadow text-center md:text-start">
            One Single Platform To Reach Multiple Lenders
          </h1>
          <p className="hero__subtitle text-shadow text-center md:text-start">
            Secure your lowest possible interest rate in a timely manner.
          </p>
          <ApplyButton size="xl" className="mt-7 justify-center md:mt-10" />
        </div>
        <div className="relative aspect-square w-full sm:w-[70%] md:w-full">
          <Image
            src="/loan.gif"
            alt="loan"
            fill
            className="absolute animate-fade-in-right-left-1 object-contain"
          />
          <Image
            src="/debt.gif"
            alt="debt"
            fill
            className="absolute animate-fade-in-right-left-2 object-contain opacity-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
