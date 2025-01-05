"use client";
import Image from "next/image";
import CustomButton from "../common/CustomButton";

const Hero = () => {
  const handleRedirect = () => {
    window.location.href = "/application";
  };
  return (
    <div className="hero__bg">
      <div className="hero">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="hero__title">
            One Single Platform To Reach Multiple Lenders
          </h1>
          <p className="hero__subtitle">
            Secure your lowest possible interest rate in a timely manner.
          </p>
          <div className="flex flex-row items-center flex-wrap gap-10 mb-5 mt-20">
            <CustomButton
              title="Apply Manually"
              containerStyles="bg-black text-white rounded-lg"
              handleClick={handleRedirect}
            />
            <a href="#" className="inline-block">
              <Image
                src="/retrieve-singpass.png"
                alt="retrieve singpass"
                width={200}
                height={50}
              />
            </a>
          </div>
        </div>
        <div className="hero__image-container">
          <div className="hero__image">
            <Image src="/hero.png" alt="hero" fill className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
