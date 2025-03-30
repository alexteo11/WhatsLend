import Hero from "../components/home/Hero";
import Waves from "../components/home/Waves";
import Goals from "../components/home/Goals";
import FlexibleLoanPricing from "../components/home/FlexibleLoanPricing";
import Steps from "../components/home/Steps";
import FAQ from "../components/home/FAQ";
import { Button } from "../components/lib/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <Waves />
      <Goals />
      <FlexibleLoanPricing />
      <Steps />
      <FAQSection />
    </>
  );
}

const FAQSection = () => {
  return (
    <div id="faqs" className="middle-container-width py-8 md:py-14">
      <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
        <p className="font-bold text-app">FAQ</p>
        <h1 className="text-4xl font-extrabold">Frequently Asked Questions</h1>
        <h3 className="max-w-[80%] text-light-gray">
          Feel free to contact us if you have any questions
        </h3>
        <div className="mt-5 w-full items-center justify-evenly gap-4 md:w-[75%]">
          <FAQ
            title="Frequently Asked Questions"
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

          <h1 className="mt-20 text-base text-light-gray">
            Got any more questions?
          </h1>
          <Button
            variant="outline"
            className="mt-5 scale-125 bg-app/50 text-light-gray transition-colors duration-200 ease-in-out hover:bg-app hover:text-white"
            asChild
          >
            <Link href={"/contact"}>Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
