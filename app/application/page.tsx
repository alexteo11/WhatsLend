// import Image from "next/image";

import { PersonalInfoForm } from "../components";

export default function Application() {
  console.log("ansdajd");
  return (
    <main className="overflow-hidden">
      <h1 className="mt-24 text-xl font-bold padding-x padding-y">
        Welcome to your loan service application!
      </h1>

      <form className="padding-x pt-6 pb-8 mb-4">
        <PersonalInfoForm />
      </form>
    </main>
  );
}
