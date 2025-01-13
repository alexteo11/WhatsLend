"use client";

import { useEffect, useState } from "react";
import CarouselAutoHeight from "embla-carousel-auto-height";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../components/lib/carousel";
import { useFormStore } from "@/stores/useFormStore";
import FormOne from "../components/forms/FormOne";
import { useSearchParams } from "next/navigation";
import { SOURCES_ENUM } from "@/schemas/common.schema";
import FormStepView from "../components/forms/FormStepView";
import Image from "next/image";
import FormTwo from "../components/forms/FormTwo";
import FormThree from "../components/forms/FormThree";
import Success from "../components/forms/Success";
import { Skeleton } from "../components/lib/skeleton";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../components/lib/card";
import FAQ from "../components/home/FAQ";
import ApplyButton from "../components/common/ApplyButton";
import BaseDialog from "../components/common/BaseDialog";
import Login from "../components/auth/Login";
import { useAuth } from "@/context/auth.context";

export default function Application() {
  const searchParams = useSearchParams();
  const { step, setSource, setFormOneDefaultValues } = useFormStore();
  const [api, setApi] = useState<CarouselApi>();
  const [isFormReady, setIsFormReady] = useState(false);

  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setShowLogin(!user);
  }, [user]);

  useEffect(() => {
    const query = searchParams.get("source");

    if (query !== "mib") {
      setSource(SOURCES_ENUM.SINGPASS);

      // call api
      // set singpass data
      setFormOneDefaultValues({
        loanDetails: {
          loanAmount: {
            source: SOURCES_ENUM.MANUAL,
            // value: 15000,
          },
          loanTenure: {
            source: SOURCES_ENUM.MANUAL,
            // value: 12,
          },
          loanPurpose: {
            source: SOURCES_ENUM.SINGPASS,
            value: "testing",
          },
        },
        generalInformation: {
          fullName: {
            source: SOURCES_ENUM.MANUAL,
            value: "qwe 123",
          },
          dob: {
            source: SOURCES_ENUM.MANUAL,
            value: new Date("2016-04-06T16:00:00.000Z"),
          },
          residencyStatus: {
            source: SOURCES_ENUM.MANUAL,
            value: "1",
            label: "Singapore",
          },
          nationality: {
            value: "1",
            source: SOURCES_ENUM.MANUAL,
            label: "Singaporean",
          },
        },
        contactDetails: {
          email: {
            source: SOURCES_ENUM.MANUAL,
            value: "qwe@gmail.com",
          },
          mobileNo: {
            source: SOURCES_ENUM.MANUAL,
            value: "+601133400142",
          },
        },
        incomeDetails: {
          employmentStatus: {
            value: "1",
            source: SOURCES_ENUM.MANUAL,
            label: "Employed",
          },
          monthlyIncome: {
            source: SOURCES_ENUM.MANUAL,
            value: 2000,
          },
        },
      });
      setIsFormReady(true);
      return;
    }

    setSource(SOURCES_ENUM.MANUAL);
    setFormOneDefaultValues();
    setIsFormReady(true);
  }, [searchParams]);

  useEffect(() => {
    if (!api) {
      return;
    }
    api.scrollTo(step - 1);

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
    setTimeout(() => {
      api.reInit();
      api.emit("resize");
    }, 1000);
  }, [step]);

  return (
    <div className="h-full bg-slate-200/50">
      <div className="middle-container-width m-auto flex flex-row items-start gap-10 py-10">
        <Card className="w-full md:w-[65%]">
          <CardContent className="p-8 md:p-10">
            <h1 className="application__form-title">
              Welcome to your loan service application!
            </h1>
            <FormStepView className="my-14 md:mx-10" />

            {!isFormReady ? (
              <FormSkeleton />
            ) : (
              <Carousel
                draggable={false}
                opts={{
                  watchDrag: false,
                  watchFocus: false,
                  watchResize: (emblaApi, entries) => {
                    // https://github.com/davidjerleke/embla-carousel/issues/910#issuecomment-2162274395
                    for (const entry of entries) {
                      if (emblaApi.containerNode() === entry.target)
                        return true;

                      console.log(`running here?`);
                      window.requestAnimationFrame(() => {
                        emblaApi.reInit();
                        emblaApi.emit("resize");
                      });

                      break;
                    }
                    console.log(`running here?2`);

                    return true;
                  },
                  disableKeyBinding: true,
                }}
                setApi={setApi}
                plugins={[CarouselAutoHeight()]}
              >
                <CarouselContent className="flex items-start">
                  <CarouselItem>
                    <FormOne />
                  </CarouselItem>
                  <CarouselItem>
                    <FormTwo />
                  </CarouselItem>
                  <CarouselItem>
                    <FormThree />
                  </CarouselItem>
                  <CarouselItem>
                    <Success />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            )}
          </CardContent>
        </Card>
        <ApplicationInformation className="hidden md:flex" />
        <BaseDialog isOpen={showLogin} onOpenChange={setShowLogin}>
          <Login />
        </BaseDialog>
      </div>
    </div>
  );
}

const FormSkeleton = () => {
  const titleSkeleton = <Skeleton className="h-[32px] w-[200px]" />;
  const fieldSkeleton = (
    <div className="mt-4 flex w-full flex-col gap-2">
      <Skeleton className="h-[20px] w-[100px]" />
      <Skeleton className="h-[52px] w-full" />
    </div>
  );

  return (
    <div className="space-y-10">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="flex flex-col gap-2 pb-10" key={i}>
          {titleSkeleton}
          {fieldSkeleton}
          {fieldSkeleton}
          <div className="flex flex-wrap gap-4 [&>div]:flex-auto md:[&>div]:flex-1">
            {fieldSkeleton}
            {fieldSkeleton}
          </div>
        </div>
      ))}
    </div>
  );
};

const ApplicationInformation = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex w-[35%] flex-col gap-6", className)}>
      <Card className="bg-background">
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold">Steps to apply</h1>
          <ul className="mt-5 list-inside list-disc space-y-2">
            <li>Step 1: Fill in some basic information & loan details</li>
            <li>Step 2: Tell us more about yourself</li>
            <li>Step 3: Describe your financial situation</li>
          </ul>
          <div className="my-4 flex items-center gap-3">
            <div className="h-[1px] w-full bg-light-gray/30" />
            <span className="text-light-gray">OR</span>
            <div className="h-[1px] w-full bg-light-gray/30" />
          </div>
          <div className="flex items-center justify-center">
            <ApplyButton
              onlySingpassBtn
              size="lg"
              className="self-center shadow"
            />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-background">
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold">Why Choose us?</h1>
          <div className="mt-5 flex flex-row flex-wrap justify-center gap-4 xl:justify-between">
            <div className="flex flex-col gap-2">
              <Image
                src="/customer_service.png"
                alt="customer_service"
                width={80}
                height={80}
              />
              <p className="max-w-[80px] text-center text-sm text-light-gray">
                Excellent customer service
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Image
                src="/fast_response.png"
                alt="fast_response"
                width={80}
                height={80}
              />
              <p className="max-w-[80px] text-center text-sm text-light-gray">
                Quick application & response
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Image
                className="p-1"
                src="/good_rates.png"
                alt="good_rates"
                width={80}
                height={80}
              />
              <p className="max-w-[80px] text-center text-sm text-light-gray">
                Competitive interest rates
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-background">
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold">FAQ</h1>
          <FAQ
            list={[
              {
                title: "Is it accessible?",
                content: "Yes. It adheres to the WAI-ARIA design pattern.",
              },
              {
                title: "Is it styled?",
                content:
                  "Yes. It comes with default styles that matches the other components' aesthetic.",
              },
              {
                title: "Is it animated?",
                content:
                  "Yes. It comes with default styles that matches the other components' aesthetic.",
              },
              {
                title: "Is it accessible?",
                content: "Yes. It adheres to the WAI-ARIA design pattern.",
              },
              {
                title: "Is it styled?",
                content:
                  "Yes. It comes with default styles that matches the other components' aesthetic.",
              },
              {
                title: "Is it animated?",
                content:
                  "Yes. It comes with default styles that matches the other components' aesthetic.",
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};
