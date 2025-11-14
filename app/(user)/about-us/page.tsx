"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Nurulhuda Jamaludin",
    rating: 5,
    daysAgo: "21 hours ago",
    text: "Great response and service. Mimi responded very fast. She's very efficient and helpful. Thank you.",
  },
  {
    name: "Zhipeng Liu",
    rating: 5,
    daysAgo: "1 day ago",
    text: "Very satisfied with Fira's service. Professional and reliable.",
  },
  {
    name: "Cahaya Suhaila",
    rating: 5,
    daysAgo: "1 day ago",
    text: "Great experience using the app. Simple and straightforward process.",
  },
  {
    name: "Amanda Tan",
    rating: 5,
    daysAgo: "2 days ago",
    text: "Superb experience! The staff were very responsive and professional. Definitely recommend their platform.",
  },
  {
    name: "Lim Wei",
    rating: 5,
    daysAgo: "3 days ago",
    text: "Fast and easy process. Great support team that helped throughout.",
  },
];

const AboutPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 px-4 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

        <div className="relative mx-auto max-w-6xl text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            We Simplify Borrowing with{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
              Choice
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
              Transparency
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-blue-100 md:text-xl">
            Finding the right loan shouldn't be complicated. We connect you with
            trusted lenders, compare offers side-by-side, and help you make
            informed financial decisions with confidence.
          </p>

          {/* Stats */}
          <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-transform hover:scale-105">
              <div className="mb-2 text-4xl font-bold text-yellow-300 md:text-5xl">
                100+
              </div>
              <div className="text-sm text-blue-100 md:text-base">
                Lending Partners
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-transform hover:scale-105">
              <div className="mb-2 text-4xl font-bold text-yellow-300 md:text-5xl">
                300K+
              </div>
              <div className="text-sm text-blue-100 md:text-base">
                Happy Borrowers
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-transform hover:scale-105">
              <div className="mb-2 text-4xl font-bold text-yellow-300 md:text-5xl">
                1K+
              </div>
              <div className="text-sm text-blue-100 md:text-base">
                5-Star Reviews
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-transform hover:scale-105">
              <div className="mb-2 text-4xl font-bold text-yellow-300 md:text-5xl">
                24/7
              </div>
              <div className="text-sm text-blue-100 md:text-base">
                Support Available
              </div>
            </div>
          </div>

          <a
            href="/application"
            className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-4 text-lg font-semibold text-blue-900 shadow-xl transition-all hover:scale-105 hover:bg-yellow-300 hover:shadow-2xl"
          >
            Get Started Now
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Your Trusted Loan Comparison Platform Since 2018
              </h2>
              <div className="h-1 w-20 rounded-full bg-blue-600"></div>
              <p className="text-lg leading-relaxed text-gray-600">
                What started as a one-person mission has grown into a team of
                over 50 dedicated professionals serving more than 300,000
                borrowers and businesses across multiple countries.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                We believe that everyone deserves access to fair, transparent
                loan options. Our platform eliminates the guesswork by bringing
                together offers from trusted lenders, allowing you to compare
                rates, terms, and benefits all in one place.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                Whether you're looking for a personal loan, business financing,
                or mortgage options, we're here to simplify your journey and
                help you secure the best deal for your unique situation.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-yellow-200 opacity-20 blur-3xl"></div>
              <img
                src="/hero.png"
                alt="Our team at work"
                className="relative z-10 h-auto w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-blue-50 to-slate-50 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Real experiences from real borrowers who trusted us with their
              financial journey
            </p>
          </div>

          <div className="relative">
            {/* Testimonial Card */}
            <div className="mx-auto max-w-4xl">
              <div className="rounded-3xl bg-white p-8 shadow-xl md:p-12">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-2xl font-bold text-white shadow-lg">
                    {testimonials[currentIndex].name[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {testimonials[currentIndex].daysAgo}
                    </p>
                  </div>
                </div>

                <div className="mb-4 flex gap-1">
                  {Array.from({
                    length: testimonials[currentIndex].rating,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  "{testimonials[currentIndex].text}"
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Posted on Google</span>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:bg-blue-50 hover:shadow-xl"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6 text-blue-600" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? "w-8 bg-blue-600"
                        : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:bg-blue-50 hover:shadow-xl"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <div className="order-2 md:order-1">
              <img
                src="/hero.png"
                alt="Start your loan journey"
                className="h-auto w-full rounded-2xl shadow-2xl"
              />
            </div>

            <div className="order-1 space-y-6 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Ready to Find Your Perfect Loan?
              </h2>
              <div className="h-1 w-20 rounded-full bg-blue-600"></div>
              <p className="text-lg leading-relaxed text-gray-600">
                Join thousands of satisfied borrowers who have found their ideal
                financing solution through our platform. Compare offers from top
                lenders, get expert guidance, and secure the best rates for your
                needs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-blue-100 p-1">
                    <svg
                      className="h-4 w-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Free comparison with no hidden fees
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-blue-100 p-1">
                    <svg
                      className="h-4 w-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Quick approval in as little as 24 hours
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-blue-100 p-1">
                    <svg
                      className="h-4 w-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Expert support throughout your journey
                  </span>
                </li>
              </ul>
              <a
                href="/application"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
              >
                Start Your Application
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
