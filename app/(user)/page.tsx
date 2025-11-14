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
