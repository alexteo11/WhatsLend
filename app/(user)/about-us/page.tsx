"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import TestimonialCarousel from "@/app/components/home/TestimonialCarousel";
import { Button } from "@/app/components/lib/button";
import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero / Intro Section */}
      <section className="mx-auto max-w-5xl space-y-8 px-4 py-16 text-center">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          We simplify borrowing with{" "}
          <span className="text-green-600">choice</span> and{" "}
          <span className="text-green-600">transparency</span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas sunt
          facere eligendi quos est qui mollitia! Nobis, facere eveniet? Ipsum
          tempore assumenda libero sint eveniet eligendi ullam illo praesentium
          soluta, dolores repellat, quibusdam sunt unde et, eos consectetur.
          Necessitatibus suscipit ipsa, atque modi ipsum corrupti impedit
          doloribus excepturi sunt ullam?
        </p>

        {/* Stats */}
        <div className="mt-8 flex flex-col items-center justify-center gap-10 sm:flex-row">
          <div className="text-center">
            <span className="block text-3xl font-semibold text-green-600">
              100+
            </span>
            <p className="text-gray-500">lending partners</p>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-semibold text-green-600">
              300k+
            </span>
            <p className="text-gray-500">borrowers</p>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-semibold text-green-600">
              1k+
            </span>
            <p className="text-gray-500">5-star reviews</p>
          </div>
          <div className="flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <ArrowRight className="h-10 w-10 text-green-600" />
            </div>
          </div>
        </div>

        {/* Call to action */}
        <button className="mx-auto mt-10 flex items-center gap-2 rounded-lg bg-green-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-green-700">
          TRY NOW <ArrowRight className="h-5 w-5" />
        </button>
      </section>

      <hr className="mx-auto max-w-6xl border-gray-200" />

      {/* About Section */}
      <section className="mx-auto max-w-4xl space-y-6 px-4 py-16 text-center md:text-left">
        <h2 className="text-3xl font-semibold text-gray-900">Testing today</h2>
        <p className="text-gray-600">
          Since 2018, we’ve gone from a one-man team to more than 50 people
          serving over 300,000 borrowers and businesses across multiple
          countries.
        </p>
        <p className="text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit
          consectetur ea provident modi quod veritatis mollitia, a
          necessitatibus architecto reiciendis repudiandae adipisci maiores
          deleniti laboriosam cum rem incidunt cumque quos aliquam tempore nam
          sunt ab. Nihil, qui ad quaerat velit, ducimus dolores reprehenderit
          possimus, magnam iusto quia vel dolorem iure molestiae quisquam animi
          accusamus eaque ullam sint fugit! Atque ex esse eligendi iure debitis,
          maxime qui nisi expedita, minima non culpa quod quae pariatur odit
          recusandae facilis totam aspernatur, nesciunt suscipit molestiae! Sit
          amet, temporibus, ea sed nemo voluptates aliquid, consequuntur ad vero
          praesentium facere ipsam cupiditate officia. Aut, voluptatum!
        </p>
      </section>

      {/* ✅ Full-width Testimonial Section */}
      <section className="bg-gray-50 px-4 py-20">
        <TestimonialCarousel />
      </section>

      {/* Our Team */}
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-between space-y-6 px-4 py-16 md:flex-row md:items-start md:space-y-0">
        {/* Image Section */}
        <div className="mb-6 w-full md:mb-0 md:w-1/2">
          <img
            src="/hero.png"
            alt="Team 1"
            className="h-auto w-full rounded-lg object-cover shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="w-full space-y-4 px-4 text-center md:w-1/2 md:text-left">
          <h1 className="text-3xl font-semibold text-gray-800">Testing</h1>
          <p className="text-lg text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod a
            eaque accusamus neque reiciendis maiores commodi voluptatum quidem
            nesciunt ducimus.
          </p>
          <Button
            size="default"
            asChild
            className="transition-transform duration-200 ease-in-out hover:scale-[102.5%]"
          >
            <Link href="/application">Try Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer Company Details */}
      {/* <section className="px-4 py-16 max-w-4xl mx-auto text-center md:text-left text-gray-600 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">
          Testing Pte. Ltd.
        </h3>
        <p>UEN: 201801220D</p>
        <p>176 Orchard Road, #05-05, Singapore 238843</p>
      </section> */}
    </main>
  );
};

export default AboutPage;
