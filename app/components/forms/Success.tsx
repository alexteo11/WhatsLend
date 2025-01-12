"use client";
import React, { useEffect } from "react";
import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useFormStore } from "@/stores/useFormStore";

const Success = () => {
  const { step } = useFormStore();
  const [dotLottie, setDotLottie] = React.useState<DotLottie | null>(null);

  useEffect(() => {
    if (step === 4) {
      dotLottie?.play();
    }
  }, [step]);

  const dotLottieRefCallback = (dotLottie: DotLottie | null) => {
    setDotLottie(dotLottie);
  };

  return (
    <div className="flex flex-col items-center gap-4 pb-20 pt-5">
      <DotLottieReact
        className="-my-10 object-contain opacity-[0.75] brightness-150"
        src="/success.lottie"
        height={250}
        width={250}
        dotLottieRefCallback={(e) => dotLottieRefCallback(e)}
      />
      <h1 className="text-2xl font-bold md:text-3xl">
        Application submitted successfully!
      </h1>
      <p className="text-light-gray">
        Kindly wait for a moment for the loan officer to review your application
      </p>
    </div>
  );
};

export default Success;
