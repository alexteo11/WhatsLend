import Image from "next/image";
import React from "react";
import { Card, CardContent } from "../lib/card";

const Goals = () => {
  return (
    <div className="middle-container-width py-8 md:py-14">
      <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
        <p className="font-bold text-app">OUR GOALS</p>
        <h1 className="text-4xl font-extrabold">
          Help You To Archive Financial Goals
        </h1>
        <h3 className="scale- max-w-[80%] text-light-gray">
          Need some fast case? Bad credit history? Try our loan and feel secure
          in your future
        </h3>
        <div className="mt-5 flex flex-wrap items-center justify-evenly gap-4 [&_div]:flex-auto [&_div]:p-5 [&_div]:py-6 md:[&_div]:flex-1">
          <Card>
            <CardContent className="flex flex-col items-center gap-5 text-center">
              <Image
                src="fast_response.png"
                alt="fast_response"
                width={100}
                height={100}
              />
              <h1 className="text-xl font-bold">High bank loan</h1>
              <p className="text-gray-700/70">
                We provide alot of loan more than bank. All the rates are
                flexible and easy to customize
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-5 text-center">
              <Image
                src="fast_response.png"
                alt="fast_response"
                width={100}
                height={100}
              />
              <h1 className="text-xl font-bold">High bank loan</h1>
              <p className="text-gray-700/70">
                We provide alot of loan more than bank. All the rates are
                flexible and easy to customize
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-5 text-center">
              <Image
                src="fast_response.png"
                alt="fast_response"
                width={100}
                height={100}
              />
              <h1 className="text-xl font-bold">High bank loan</h1>
              <p className="text-gray-700/70">
                We provide alot of loan more than bank. All the rates are
                flexible and easy to customize
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Goals;
