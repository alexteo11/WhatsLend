"use client";

import { useEffect, useState } from "react";
import CarouselAutoHeight from "embla-carousel-auto-height";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../../components/lib/carousel";
import { useFormStore } from "@/stores/useFormStore";
import FormOne from "../../components/forms/FormOne";
import { useRouter, useSearchParams } from "next/navigation";
import { SOURCES_ENUM } from "@/schemas/common.schema";
import FormStepView from "../../components/forms/FormStepView";
import Image from "next/image";
import FormTwo from "../../components/forms/FormTwo";
import FormThree from "../../components/forms/FormThree";
import Success from "../../components/forms/Success";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../../components/lib/card";
import FAQ from "../../components/home/FAQ";
import ApplyButton from "../../components/common/ApplyButton";
import BaseDialog from "../../components/common/BaseDialog";
import Login from "../../components/auth/Login";
import axios from "@/lib/axios";
import { Button } from "../../components/lib/button";
import { FormData } from "@/schemas/form.schema";
import { toast } from "sonner";
import { LoaderWrapper } from "../../components/common/LoaderWrapper";
// import sampleSingpassData1 from "./sampleSingpassData1.json";
// import sampleSingpassData2 from "./sampleSingpassData2.json";
// import sampleSingpassData3 from "./sampleSingpassData3.json"; // singpass test

import FormSkeleton from "@/app/components/forms/FormSkeleton";
import SingpassUserInfo from "@/app/components/data-display/singpass-user-info";

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export default function Application() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    step,
    setSource,
    setFormDefaultValues,
    isSubmittingApplication,
    resetForm,
  } = useFormStore();

  const [api, setApi] = useState<CarouselApi>();
  const [isFormReady, setIsFormReady] = useState(false);
  const [singpassUserInfo, setSingpassUserInfo] =
    useState<DeepPartial<FormData>>();
  // const [singpassUserInfo, setSingpassUserInfo] = useState<
  //   DeepPartial<FormData>
  // >(sampleSingpassData3 as never); // singpass test
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

  // const sampleFullData = {
  //   personalDetails: {
  //     uinfin: {
  //       value: "G4440433N",
  //       source: "SINGPASS",
  //     },
  //     fullName: {
  //       value: "WATTNA TIWARAT",
  //       source: "SINGPASS",
  //     },
  //     sex: {
  //       value: "F",
  //       label: "FEMALE",
  //       source: "SINGPASS",
  //     },
  //     nationality: {
  //       value: "AM",
  //       label: "ARMENIAN",
  //       source: "SINGPASS",
  //     },
  //     dob: {
  //       value: "1960-05-17T00:00:00.000Z",
  //       source: "SINGPASS",
  //     },
  //     race: {
  //       value: "AM",
  //       label: "ARMENIAN",
  //       source: "SINGPASS",
  //     },
  //     birthCountry: {
  //       value: "AM",
  //       label: "ARMENIA",
  //       source: "SINGPASS",
  //     },
  //     residentialStatus: {
  //       value: "A",
  //       label: "ALIEN",
  //       source: "MANUAL",
  //     },
  //     passType: {
  //       value: "P1Pass",
  //       label: "Employment Pass",
  //       source: "SINGPASS",
  //     },
  //     passStatus: {
  //       value: "Live",
  //       source: "SINGPASS",
  //     },
  //     passExpiryDate: {
  //       value: "2030-12-31T00:00:00.000Z",
  //       source: "SINGPASS",
  //     },
  //     maritalStatus: {
  //       value: "2",
  //       label: "Married",
  //       source: "MANUAL",
  //     },
  //   },
  //   contactDetails: {
  //     email: {
  //       value: "myinfotesting@gmail.com",
  //       source: "SINGPASS",
  //     },
  //     mobileNo: {
  //       value: "+6597399245",
  //       source: "SINGPASS",
  //     },
  //   },
  //   loanDetails: {
  //     loanAmount: {
  //       value: 9000,
  //       source: "MANUAL",
  //     },
  //     loanTenure: {
  //       value: 43,
  //       source: "MANUAL",
  //     },
  //     loanPurpose: {
  //       value: "qweqwe",
  //       source: "MANUAL",
  //     },
  //   },
  //   employmentDetails: {
  //     occupation: {
  //       value: "TRAINING MANAGER",
  //       source: "SINGPASS",
  //     },
  //     employmentStatus: {
  //       value: "student",
  //       label: "Student",
  //       source: "MANUAL",
  //     },
  //     monthlyIncome: {
  //       value: 123,
  //       source: "MANUAL",
  //     },
  //     employerName: {
  //       value: "AAS SISTEMAS PTE LTD",
  //       source: "SINGPASS",
  //     },
  //     employmentSector: {
  //       value: "MANUFACTURING",
  //       source: "SINGPASS",
  //     },
  //     timeAtCurrentEmployer: {
  //       value: "6-12-months",
  //       label: "6 to 12 months",
  //       source: "MANUAL",
  //     },
  //     timeAtPreviousEmployer: {
  //       value: "none",
  //       label: "No previous employment",
  //       source: "MANUAL",
  //     },
  //   },
  //   housingDetails: {
  //     address: {
  //       value: "123, LORONG 1 TOA PAYOH, TOA PAYOH VIEW, 13-220",
  //       source: "SINGPASS",
  //     },
  //     unitNo: {
  //       value: "220",
  //       source: "SINGPASS",
  //     },
  //     postalCode: {
  //       value: "310123",
  //       source: "SINGPASS",
  //     },
  //     country: {
  //       value: "SG",
  //       label: "SINGAPORE",
  //       source: "SINGPASS",
  //     },
  //     housingType: {
  //       value: "131",
  //       label: "CONDOMINIUM",
  //       source: "MANUAL",
  //     },
  //     hdbType: {
  //       value: "113",
  //       label: "3-ROOM FLAT (HDB)",
  //       source: "SINGPASS",
  //     },
  //     hdbOwnership: [],
  //   },
  //   existingLoanDetails: {
  //     isContactingWithAgency: {
  //       value: false,
  //       label: "No",
  //       source: "MANUAL",
  //     },
  //     hasExistingLoans: {
  //       value: false,
  //       label: "No",
  //       source: "MANUAL",
  //     },
  //     existingLoanFromBank: {
  //       source: "MANUAL",
  //     },
  //     existingLoanFromNonBank: {
  //       source: "MANUAL",
  //     },
  //     monthlyRepaymentToBank: {
  //       source: "MANUAL",
  //     },
  //     monthlyRepaymentToNonBank: {
  //       source: "MANUAL",
  //     },
  //   },
  // } as unknown as never;

  const [showLogin, setShowLogin] = useState(false);
  const [showSingpassInfo, setShowSingpassInfo] = useState(false);

  const onSingpassError = async () => {
    // delay for 100 ms
    await new Promise((resolve) => setTimeout(resolve, 100));
    router.replace("/");
    toast.error(
      "Myinfo is currently unavailable. Please try again shortly or apply the application manually.",
    );
  };

  const getSingpassUserInfo = async (
    code: string,
    code_verifier: string,
    nonce: string,
    state: string,
  ) => {
    try {
      const endpoint = `/loan/sgpass/singpassUserInfo`;
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
      onSingpassError();
    }
  };

  // https://compare-loan-will.web.app/application?source=mib&error_description=Resource+owner+did+not+authorise+the+request&error=access_denied&state=6db2e36ed2dcc684c991dfe085c1db78
  const initForm = async () => {
    const query = searchParams.get("source");
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const errorDesciption = searchParams.get("error_description");
    const error = searchParams.get("error");

    // always reset when come in
    resetForm();

    // check is singpass and have error
    if (query === "mib" && error && errorDesciption) {
      onSingpassError();
      return;
    }

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
    setFormDefaultValues();
    // setFormDefaultValues(sampleSingpassData3 as never); // singpass test
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
            <SingpassUserInfo
              singpassUserInfo={singpassUserInfo as unknown as never}
            />
          )}
        </BaseDialog>
      </div>
    </div>
  );
}

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
                  className="self-center"
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
                title: "What is WhatsWe",
                content:
                  "WhatsWe is a digital loan matching platform that connects borrowers with tailored loan offers from licensed providers. Using a single online application via Singpass, WhatsWe’s unique matching system keeps your personal information private while enabling lenders to generate personalized rates within minutes. This ensures you receive the most competitive loan options—so you never have to spend time searching for them.",
              },
              {
                title: "Is WhatsWe licensed?",
                content:
                  "We are a Singapore-based fintech company, fully registered and operating under the regulatory oversight of the Ministry of Law, in line with other reputable fintech firms. As a responsible and trusted player in the financial technology space, WhatsWe is also a proud member of the Singapore FinTech Association, adhering to industry best practices and standards. Our focus is on leveraging technology to simplify and enhance the loan-matching experience, ensuring transparency, security, and convenience for our users.",
              },
              {
                title: "How much can I borrow?",
                content:
                  "Typically, you may be eligible to borrow between three to six times your monthly income, with a maximum limit of $500,000. The exact borrowing amount depends on factors such as your salary, credit history, and any existing debt obligations. Additionally, under Singapore’s Total Debt Servicing Ratio (TDSR) framework, your total monthly debt repayments—including home loans, car loans, and personal loans—cannot exceed 55% of your gross monthly income. This ensures responsible borrowing and helps maintain your financial stability.",
              },
              {
                title: "How do I know if I am eligible for a loan?",
                content:
                  "Eligibility requirements differ across financial institutions. WhatsWe is not a lender and does not influence a borrower's eligibility.\n\nTypical criteria considered by most licensed loan providers include:\n\n- **Age:** Usually between 21 and 70 years old.\n- **Income:** S$20,000–S$30,000 annually for Singapore citizens/PRs; S$40,000–S$60,000 for foreigners.\n- **Employment Stability:** At least three months of employment; self-employed individuals may need to provide additional documents, such as tax returns.\n- **Credit Profile:** A good credit score improves approval chances and interest rates. Credit scores in Singapore range from 1000 to 2000, with higher scores indicating better creditworthiness.",
              },
              {
                title: "How are my personalised loan offers determined?",
                content:
                  "The loan offers you receive through WhatsWe are tailored specifically to your financial profile. Each offer includes a personalised interest rate and loan terms, determined by factors such as your income, existing debt, employment history, credit score, and more. Unlike generic advertised rates from banks, WhatsWe connects you with providers offering rates suited to your unique profile, ensuring you get the most competitive options without the hassle of searching.",
              },
              {
                title: "When will I receive the loan?",
                content:
                  "Once you accept an offer from a bank, the funds can be transferred to your account in as little as 15 minutes. For non-bank providers, local regulations require borrowers to verify their identity in person. In such cases, you’ll receive the funds when you visit their office after accepting the offer.",
              },
              {
                title: "How do I apply for a loan with WhatsWe?",
                content:
                  "Applying for a loan with WhatsWe takes just a few minutes. Using Singpass, your application is automatically submitted along with all necessary documents, including income statements, residential address, and CPF contribution history, so our lending partners can generate personalised offers for you. If you prefer not to use Singpass, you can upload the documents digitally. Once submitted, you’ll receive personalised offers from over 100 licensed loan providers within minutes, giving you multiple tailored options much faster than applying directly to a single lender.",
              },
              {
                title: "Can I use a personal loan for any purpose?",
                content:
                  "Personal loans are flexible and not tied to specific purposes like mortgages or car loans. Common uses include home renovations, weddings, emergencies, household expenses, recurring bills, debt consolidation, and business-related costs. Ultimately, how you use the funds is entirely up to you.",
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};
