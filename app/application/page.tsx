// import Image from "next/image";

export default function Application() {
  console.log("ansdajd");
  return (
    <main className="overflow-hidden">
      <h1 className="mt-24 text-2xl font-semibold padding-x padding-y">
        Welcome to your loan service application!
      </h1>

      <form className="padding-x pt-6 pb-8 mb-4">
        <div className="application__form-section">
          <h2>Personal Information</h2>
        </div>
        <div className="mb-4">
          <label className="application__form-label-container">NRIC/FIN</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="uinfin"
            type="text"
            placeholder="S1234567A"
          />
        </div>
        <div className="mb-6">
          <label className="application__form-label-container">Name</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            type="text"
            placeholder="LIM SHONG BOON"
          />
        </div>
      </form>
    </main>
  );
}
