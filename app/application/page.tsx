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
import { useRouter, useSearchParams } from "next/navigation";
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
import axios from "axios";
import { Button } from "../components/lib/button";
import { FormData } from "@/schemas/form.schema";
import { toast } from "sonner";
import { LoaderWrapper } from "../components/common/LoaderWrapper";

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export default function Application() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { step, setSource, setFormDefaultValues, isSubmittingApplication } =
    useFormStore();

  const [api, setApi] = useState<CarouselApi>();
  const [isFormReady, setIsFormReady] = useState(false);
  const [singpassUserInfo, setSingpassUserInfo] =
    useState<DeepPartial<FormData>>();
  // SAMPLE TESTING DATA
  // {
  //   generalInformation: {
  //     fullName: {
  //       value: "TAN SOOK MUN, EMILY",
  //       source: SOURCES_ENUM.SINGPASS,
  //     },
  //     dob: {
  //       value: "1991-10-10",
  //       source: SOURCES_ENUM.SINGPASS,
  //     },
  //     residencyStatus: {
  //       value: "C",
  //       label: "CITIZEN",
  //       source: SOURCES_ENUM.SINGPASS,
  //     },
  //     nationality: {
  //       value: "SG",
  //       label: "SINGAPORE CITIZEN",
  //       source: SOURCES_ENUM.SINGPASS,
  //     },
  //   },
  //   contactDetails: {
  //     email: {
  //       value: "Myinfotest@gmail.com",
  //       source: SOURCES_ENUM.SINGPASS,
  //     },
  //     mobileNo: {
  //       value: "+6597399245",
  //       source: SOURCES_ENUM.SINGPASS,
  //     },
  //   },
  //   personalDetails: {
  //     uinfin: {
  //       value: "S7790795E",
  //       source: SOURCES_ENUM.SINGPASS,
  //     },
  //     civilStatus: {
  //       value: "2",
  //       label: "Married",
  //       source: SOURCES_ENUM.SINGPASS,
  //     },
  //   },
  //   housingDetails: {
  //     address: {
  //       value: "115, YISHUN RING ROAD, YISHUN RING ROAD, 9-114",
  //       source: SOURCES_ENUM.SINGPASS,
  //     },
  //     unitNo: {
  //       value: "114",
  //       source: SOURCES_ENUM.SINGPASS,
  //     },
  //     postalCode: {
  //       value: "760115",
  //       source: SOURCES_ENUM.SINGPASS,
  //     },
  //     country: {
  //       value: "SG",
  //       label: "SINGAPORE",
  //       source: SOURCES_ENUM.SINGPASS,
  //     },
  //   },
  // }

  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSingpassInfo, setShowSingpassInfo] = useState(false);

  useEffect(() => {
    // TODO: need do or not
    // setTimeout(() => setShowLogin(!user), 500);
  }, [user]);

  const getSingpassUserInfo = async (
    code: string,
    code_verifier: string,
    nonce: string,
    state: string,
  ) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/core_kyc/sgpass/singpassUserInfo`;
      const response = await axios.get(endpoint, {
        params: {
          code,
          code_verifier,
          nonce,
          state,
        },
      });
      const userInfo = response.data?.data;
      setSingpassUserInfo(userInfo);
      return userInfo;
    } catch {
      router.replace("/");
      toast.error("Singpass data retrieval session expired. Please try again.");
    }
  };

  const initForm = async () => {
    const query = searchParams.get("source");
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    // check is singpass and have mib
    if (query === "mib" && code && state) {
      const singpassSession = localStorage.getItem("singpass_session");
      const { code_verifier, nonce } = JSON.parse(singpassSession || "");

      setSource(SOURCES_ENUM.SINGPASS);
      const userInfo = await getSingpassUserInfo(
        code,
        code_verifier,
        nonce,
        state,
      );
      setFormDefaultValues({
        ...userInfo,
      });
      setIsFormReady(true);
      return;
    }

    setSource(SOURCES_ENUM.MANUAL);
    setFormDefaultValues(singpassUserInfo);
    setIsFormReady(true);
  };

  useEffect(() => {
    initForm();
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
        <LoaderWrapper
          className="w-full md:w-[65%]"
          isLoading={isSubmittingApplication}
        >
          <Card>
            <CardContent className="p-8 md:p-10">
              <h1 className="application__form-title">
                Welcome to your loan service application!
              </h1>
              <FormStepView className="my-14 md:mx-10" />
              {singpassUserInfo && (
                <div className="flex items-center justify-end text-sm">
                  <p className="text-right">Currently applying with </p>
                  <Image
                    className="ml-1 mr-2 translate-y-[3px]"
                    src="/singpass_logo_fullcolours.png"
                    alt="singpass_logo"
                    width={80}
                    height={12}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowSingpassInfo(true)}
                  >
                    View Info
                  </Button>
                </div>
              )}

              {!isFormReady ? (
                <FormSkeleton />
              ) : (
                <Carousel
                  draggable={false}
                  opts={{
                    startIndex: step - 1,
                    watchDrag: false,
                    watchFocus: false,
                    watchResize: (emblaApi, entries) => {
                      // https://github.com/davidjerleke/embla-carousel/issues/910#issuecomment-2162274395
                      for (const entry of entries) {
                        if (emblaApi.containerNode() === entry.target)
                          return true;

                        window.requestAnimationFrame(() => {
                          emblaApi.reInit();
                          emblaApi.emit("resize");
                        });

                        break;
                      }

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
        </LoaderWrapper>
        <ApplicationInformation className="hidden md:flex" />
        <BaseDialog isOpen={showLogin} onOpenChange={setShowLogin}>
          <Login />
        </BaseDialog>
        <BaseDialog
          isOpen={showSingpassInfo}
          onOpenChange={setShowSingpassInfo}
        >
          {singpassUserInfo && (
            <SingpassUserInfoDialog singpassUserInfo={singpassUserInfo} />
          )}
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
  const { isSingpassForm } = useFormStore();

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
          {!isSingpassForm() && (
            <>
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
            </>
          )}
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

const SingpassUserInfoDialog = ({
  singpassUserInfo,
}: {
  singpassUserInfo: DeepPartial<FormData>;
}) => {
  const DataRow = ({
    title,
    desc,
  }: {
    title: string;
    desc: string | undefined;
  }) => {
    if (!desc) {
      return;
    }

    return (
      <div className="flex w-full flex-wrap text-sm">
        <span className="flex-1 font-bold">{title}</span>
        <span className="flex-1">{desc}</span>
      </div>
    );
  };

  return (
    <div className="flex max-w-[550px] flex-col gap-2 px-6 py-10">
      <h1 className="text-center text-3xl text-app">Singpass User Info</h1>
      <p className="mb-8 text-center text-sm text-light-gray">
        Please rest assured that we only retrieve the required data with your
        consent, and we will not store or use it for any other purpose than for
        analysis to provide you with the best loan options.
      </p>
      <div className="space-y-2">
        <DataRow
          title="Full Name"
          desc={singpassUserInfo.generalInformation?.fullName?.value}
        />
        <DataRow
          title="NRIC/FIN"
          desc={singpassUserInfo.personalDetails?.uinfin?.value}
        />
        <DataRow
          title="Date of birth"
          desc={singpassUserInfo.generalInformation?.dob?.value as string}
        />
        <DataRow
          title="Email"
          desc={singpassUserInfo.contactDetails?.email?.value}
        />
        <DataRow
          title="Mobile No."
          desc={singpassUserInfo.contactDetails?.mobileNo?.value}
        />
        <DataRow
          title="Address"
          desc={singpassUserInfo.housingDetails?.address?.value}
        />
        <DataRow
          title="Unit No."
          desc={singpassUserInfo.housingDetails?.unitNo?.value}
        />
        <DataRow
          title="Postal Code"
          desc={singpassUserInfo.housingDetails?.postalCode?.value}
        />
        <DataRow
          title="Country"
          desc={singpassUserInfo.housingDetails?.country?.label}
        />
        <DataRow
          title="Marital Status"
          desc={singpassUserInfo.personalDetails?.civilStatus?.label}
        />
        {/* <DataRow
          title="Type of Housing"
          desc={singpassUserInfo.housingDetails.typeOfHousing.value}
        />
        <DataRow
          title="Ownership of Housing"
          desc={singpassUserInfo.housingDetails.typeOfHousing.value}
        /> */}
      </div>
    </div>
  );
};
