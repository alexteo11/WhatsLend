import React from "react";
import DataDetailsTableView from "./data-details-table-view";
import DataDetailsSection from "./data-details-section";
import { DeepPartial } from "react-hook-form";
import { FormData } from "@/schemas/form.schema";
import { formatDate } from "@/helper/dateFormatter";

const SingpassUserInfo = ({
  singpassUserInfo,
}: {
  singpassUserInfo: DeepPartial<FormData>;
}) => {
  return (
    <div className="flex max-w-[550px] flex-col gap-2 px-6 py-10">
      <h1 className="text-center text-3xl text-app">Singpass User Info</h1>
      <p className="mb-8 text-center text-sm text-light-gray">
        Please rest assured that we only retrieve the required data with your
        consent, and we will not store or use it for any other purpose than for
        analysis to provide you with the best loan options.
      </p>
      <div className="space-y-2">
        <DataDetailsSection
          title="Personal Details"
          data={singpassUserInfo.personalDetails}
          rows={[
            { title: "NRIC/FIN", path: "uinfin.value" },
            { title: "Full Name", path: "fullName.value" },
            { title: "Gender", path: "sex.label" },
            { title: "Nationality", path: "nationality.label" },
            {
              title: "Date of birth",
              path: "dob.value",
              formatter: formatDate,
            },
            { title: "Birth Country", path: "birthCountry.label" },
            { title: "Race", path: "race.label" },
            { title: "Residential Status", path: "residentialStatus.label" },
            { title: "Marital Status", path: "maritalStatus.label" },
            { title: "Passport Type", path: "passType.label" },
            { title: "Passport Status", path: "passStatus.value" },
            {
              title: "Passport Expiry Date",
              path: "passExpiryDate.value",
              formatter: formatDate,
            },
          ]}
        />

        <br />
        <DataDetailsSection
          title="Contact Details"
          data={singpassUserInfo.contactDetails}
          rows={[
            { title: "Email", path: "email.value" },
            { title: "Mobile No.", path: "mobileNo.value" },
          ]}
        />

        <br />
        <DataDetailsSection
          title="Employment Details"
          data={singpassUserInfo.employmentDetails}
          rows={[
            { title: "Occupation", path: "occupation.value" },
            { title: "Employer Name", path: "employerName.value" },
            { title: "Employment Sector", path: "employmentSector.value" },
          ]}
        />

        <br />
        <DataDetailsSection
          title="Housing Details"
          data={singpassUserInfo.housingDetails}
          rows={[
            { title: "Address", path: "address.value" },
            { title: "Unit No.", path: "unitNo.value" },
            { title: "Postal Code", path: "postalCode.value" },
            { title: "Country", path: "country.label" },
            { title: "Type of Housing", path: "housingType.label" },
          ]}
        />
        <DataDetailsTableView data={singpassUserInfo} />
      </div>
    </div>
  );
};

export default SingpassUserInfo;
