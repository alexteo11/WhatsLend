"use client";

import React from "react";
import { Form } from "../lib/form";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordReq,
  forgotPasswordReqSchema,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseFormField from "../common/BaseFormField";
import { Button } from "../lib/button";
import { LoaderWrapper } from "../common/LoaderWrapper";
import { toast } from "sonner";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "@/lib/firebase";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ForgotPasswordReq>({
    resolver: zodResolver(forgotPasswordReqSchema),
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordReq) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast.success(
        "Password reset email sent successfully. Kindly check your email to reset your password.",
      );
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoaderWrapper isLoading={isLoading} className="w-[90vw] max-w-[500px]">
      <div className="flex flex-col gap-2 px-6 py-10">
        <h1 className="text-center text-3xl text-app">Forgot Password?</h1>
        <p className="mb-8 text-center text-sm text-light-gray">
          Enter your email to reset your password
        </p>
        <div className="mx-auto w-[90%]">
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <BaseFormField
                form={form}
                fieldRef="email"
                label="Email"
                type="email"
                placeholder="johndoe@gmail.com"
              />

              <div className="flex w-full flex-col gap-8 pt-2">
                <Button type="submit" size="lg" variant="app">
                  Send reset password email
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </LoaderWrapper>
  );
};

export default ForgotPassword;
