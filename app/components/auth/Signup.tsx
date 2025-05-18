"use client";

import React from "react";
import { Form } from "../lib/form";
import { useForm } from "react-hook-form";
import { SignUpReq, signUpReqSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseFormField from "../common/BaseFormField";
import { Button } from "../lib/button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { LoaderWrapper } from "../common/LoaderWrapper";
import { FirebaseError } from "firebase/app";

interface SignUpProps {
  onSignUpSuccess?: () => void;
}

const SignUp = ({ onSignUpSuccess }: SignUpProps) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<SignUpReq>({
    resolver: zodResolver(signUpReqSchema),
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpReq) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      // TODO: migrate to api call
      toast.success("Account created and logged in successfully.");
      form.reset();
      onSignUpSuccess?.();
    } catch (error) {
      console.log({ error });

      // todo check duplicate acccount
      if ((error as FirebaseError).code === "auth/email-already-in-use") {
        toast.error(
          "Email already in use. Please proceed to reset password if you have forgotten your password.",
        );
        return;
      }

      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoaderWrapper isLoading={isLoading} className="w-[90vw] max-w-[500px]">
      <div className="flex flex-col gap-2 px-6 py-10">
        <h1 className="text-center text-3xl text-app">Sign Up</h1>
        <p className="mb-8 text-center text-sm text-light-gray">
          Sign up with us and keep track of your applications
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

              <BaseFormField
                form={form}
                fieldRef="password"
                label="Password"
                type="password"
              />

              <BaseFormField
                form={form}
                fieldRef="confirmPassword"
                label="Confirm Password"
                type="password"
              />
              <div className="flex w-full flex-col gap-4 pt-2">
                <Button type="submit" size="lg" variant="app">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </LoaderWrapper>
  );
};

export default SignUp;
