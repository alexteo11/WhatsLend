import Image from "next/image";
import { Hero } from "@/app/components";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover_why_us">
        <div className="why__us">
          <div className="home__text-container">
            <h1 className="text-4xl font-extrabold">Why Us?</h1>
            <div className="mt-6 font-medium">
              WE MAKE FINDING LOAN EASY
              <br />
              <br />
              <ul className="list-disc">
                <li>Effortless application process</li>
                <li className="mt-3">Completely transparent</li>
                <li className="mt-3">Free-to-use, no hidden costs</li>
              </ul>
            </div>
          </div>
          <div className="why__us__image-container">
            <div className="why__us__image">
              <Image
                src="/multi-lenders.png"
                alt="multi lenders"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
