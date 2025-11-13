"use client";

import React, { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const testimonials = [
  {
    name: "Nurulhuda Jamaludin (Masfrina)",
    rating: 5,
    daysAgo: "21 hours ago",
    text: "Great.. Response fast and services.. Mimi response very fast. She's very efficient and helpful. Thank you.",
  },
  {
    name: "Zhipeng Liu",
    rating: 5,
    daysAgo: "1 day ago",
    text: "对Fira服务很满意。",
  },
  {
    name: "Cahaya Suhaila",
    rating: 5,
    daysAgo: "1 day ago",
    text: "Great experience using lendela app.",
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
    text: "Fast and easy process. Great support team.",
  },
];

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1); // Default 1 on mobile, adjust dynamically on desktop

  const next = () => {
    if (index < testimonials.length - visibleCards) {
      setIndex((prev) => prev + 1);
    } else {
      setIndex(0); // Loop back to the first
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    } else {
      setIndex(testimonials.length - visibleCards); // Loop back to the last
    }
  };

  // Adjust visible cards dynamically based on screen size
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3); // 3 cards visible on larger screens
      } else if (window.innerWidth >= 640) {
        setVisibleCards(2); // 2 cards on tablets
      } else {
        setVisibleCards(1); // 1 card on mobile
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full px-4 md:px-8">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(index * 100) / visibleCards}%)`,
            width: `${(testimonials.length / visibleCards) * 100}%`,
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 px-4 sm:w-1/2 lg:w-1/3"
            >
              <div className="flex h-full flex-col rounded-xl bg-white p-6 text-gray-800 shadow-md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-gray-700">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.daysAgo}</p>
                  </div>
                </div>

                <div className="mb-2 flex items-center text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className="flex-grow leading-relaxed text-gray-700">
                  {t.text}
                </p>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                    alt="Google logo"
                    className="mr-2 h-5 w-5"
                  />
                  <span>Posted on Google</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute -left-4 top-1/2 -translate-y-1/2 transform rounded-full border border-gray-200 bg-white p-2 shadow-md hover:bg-gray-100"
      >
        <ArrowLeft className="h-5 w-5 text-gray-700" />
      </button>

      <button
        onClick={next}
        className="absolute -right-4 top-1/2 -translate-y-1/2 transform rounded-full border border-gray-200 bg-white p-2 shadow-md hover:bg-gray-100"
      >
        <ArrowRight className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  );
};

export default TestimonialCarousel;
