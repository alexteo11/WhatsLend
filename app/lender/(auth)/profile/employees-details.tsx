"use client";

import PasswordField from "@/app/components/common/fields/PasswordField";
import PhoneField from "@/app/components/common/fields/PhoneField";
import SelectField from "@/app/components/common/fields/SelectField";
import TextField from "@/app/components/common/fields/TextField";
import { Button } from "@/app/components/lib/button";
import { FormField, FormItem, FormMessage } from "@/app/components/lib/form";
import { Role } from "@/constants/authEnums";
import { LENDER_STAFF_POSITIONS } from "@/constants/formOptions";
import { useAuth } from "@/context/auth.context";
import { CreateLender } from "@/schemas/lender.schema";
import { CreateLenderStaff, LenderStaff } from "@/schemas/lenderStaff.schema";
import { Plus, X } from "lucide-react";
import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

const EmployeesDetails = ({
  lenderStaffs,
  form,
}: {
  lenderStaffs: LenderStaff[];
  form?: UseFormReturn<CreateLender>;
}) => {
  const { userRole } = useAuth();

  const { fields, append, remove } = form
    ? useFieldArray({
        control: form?.control,
        name: "staffs",
      })
    : {};

  const onAddEmployeeClick = async () => {
    append?.({} as CreateLenderStaff);
  };

  // const submitChanges = async () => {
  //   try {
  //     const formData = await form?.handleSubmit((data) => data)();
  //     console.log(formData);
  //   } catch (error) {
  //     toast.error(getErrorMessage(error));
  //   }
  // };

  return (
    <div className="flex flex-col gap-10">
      <div>
        {lenderStaffs?.length || fields?.length ? (
          <div className="mt flex flex-col gap-8">
            {lenderStaffs.map((staff, index) => (
              <div key={index} className="flex flex-col gap-4">
                <h2 className="text-xl underline">Employees {index + 1}</h2>
                <div className="flex flex-wrap">
                  <span className="flex-1">Name: </span>
                  <span className="flex-2">{staff.name}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">Email: </span>
                  <span className="flex-2">{staff.email}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">Mobile No: </span>
                  <span className="flex-2">{staff.mobileNo}</span>
                </div>
                <div className="flex flex-wrap">
                  <span className="flex-1">Position: </span>
                  <span className="flex-2">{staff.position}</span>
                </div>
              </div>
            ))}
            {form &&
              fields &&
              fields.map((_newStaff, index) => {
                return (
                  <div key={_newStaff.id} className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                      <h2 className="text-xl underline">
                        Employees {index + lenderStaffs.length + 1}
                      </h2>
                      <div className="flex-auto"></div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          console.log(index);
                          remove?.(index);
                        }}
                      >
                        <X />
                      </Button>
                    </div>

                    <div className="flex flex-wrap">
                      <span className="flex-1">Name: </span>
                      <FormField
                        control={form.control}
                        name={`staffs.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col">
                            <TextField
                              form={form}
                              field={field}
                              type="text"
                              label="Name"
                              fieldRef={`staffs.${index}.name`}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-wrap">
                      <span className="flex-1">Email: </span>
                      <FormField
                        control={form.control}
                        name={`staffs.${index}.email`}
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col">
                            <TextField
                              form={form}
                              field={field}
                              type="email"
                              label="Email"
                              fieldRef={`staffs.${index}.email`}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-wrap">
                      <span className="flex-1">Password: </span>
                      <FormField
                        control={form.control}
                        name={`staffs.${index}.password`}
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col">
                            <PasswordField
                              form={form}
                              field={field}
                              type="password"
                              label="Password"
                              fieldRef={`staffs.${index}.email`}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-wrap">
                      <span className="flex-1">Mobile No: </span>
                      <FormField
                        control={form.control}
                        name={`staffs.${index}.mobileNo`}
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col">
                            <PhoneField
                              form={form}
                              field={field}
                              type="phone"
                              label="Mobile No"
                              fieldRef={`staffs.${index}.mobileNo`}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-wrap">
                      <span className="flex-1">Position: </span>
                      <FormField
                        control={form.control}
                        name={`staffs.${index}.position`}
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col">
                            <SelectField
                              form={form}
                              field={field}
                              type="select"
                              label="Position"
                              fieldRef={`staffs.${index}.position`}
                              options={LENDER_STAFF_POSITIONS}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-10 text-center">
            <span className="text-light-gray">No Employees Found</span>
            {form?.formState.errors.staffs ? (
              <span className="text-destructive">
                Need atleast 1 lender's employees
              </span>
            ) : null}
          </div>
        )}
      </div>
      {userRole === Role.ADMIN && (
        <div className="flex flex-row items-end gap-4">
          <Button
            type="button"
            className="flex-auto"
            variant="outline"
            onClick={onAddEmployeeClick}
          >
            <>
              Add new employees
              <Plus />
            </>
          </Button>
          {/* <Button
            type="button"
            className="flex-auto"
            disabled={!fields?.length}
            onClick={submitChanges}
          >
            Submit Changes
          </Button> */}
        </div>
      )}
    </div>
  );
};

export default EmployeesDetails;
