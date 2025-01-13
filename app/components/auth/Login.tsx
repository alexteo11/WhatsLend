"use client";

import React from "react";
import { Form } from "../lib/form";
import { useForm } from "react-hook-form";
import { LoginReq, loginReqSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseFormField from "../common/BaseFormField";
import { Button } from "../lib/button";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoaderWrapper } from "../common/LoaderWrapper";
import { toast } from "sonner";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./Signup";
import useDialogStore from "@/stores/useDialogStore";
import { FirebaseError } from "firebase/app";

interface LoginProps {
  onInnerDialogOpen?: () => void;
  onLoginSuccess?: () => void;
}

const Login = ({ onInnerDialogOpen, onLoginSuccess }: LoginProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { openDialog, closeDialog } = useDialogStore();

  const form = useForm<LoginReq>({
    resolver: zodResolver(loginReqSchema),
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginReq) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("You have logged in successfully.");
      onLoginSuccess?.();
    } catch (error: unknown) {
      console.log({ error });

      if ((error as FirebaseError).code === "auth/invalid-credential") {
        return toast.error("Invalid credentials. Please try again.");
      }
      // TODO: handle error, show invalid credentials
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onResetPasswordBtnClick = () => {
    openDialog(<ForgotPassword />);
    onInnerDialogOpen?.();
  };

  const onSignUpBtnClick = () => {
    openDialog(<SignUp onSignUpSuccess={() => closeDialog()} />);
    onInnerDialogOpen?.();
  };

  return (
    <>
      <LoaderWrapper isLoading={isLoading} className="w-[90vw] max-w-[500px]">
        <div className="flex flex-col gap-2 px-6 py-10">
          <h1 className="text-center text-3xl text-app">Login</h1>
          <p className="mb-8 text-center text-sm text-light-gray">
            Log in and start your journey to financial freedom
          </p>
          <div className="mx-auto w-[90%]">
            <Form {...form}>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
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

                <div className="flex w-full flex-col gap-4 pt-2">
                  <Button type="submit" size="lg" variant="app">
                    Log In
                  </Button>
                  <div className="flex items-center gap-5">
                    <div className="h-0.5 flex-auto bg-app/20" />
                    <span className="text-sm text-light-gray">Or</span>
                    <div className="h-0.5 flex-auto bg-app/20" />
                  </div>

                  <div className="flex flex-row items-center justify-evenly gap-4 [&>*]:w-[50%]">
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      onClick={() => onResetPasswordBtnClick()}
                    >
                      <p>Reset Password</p>
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      onClick={() => onSignUpBtnClick()}
                    >
                      Sign Up Now
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </LoaderWrapper>
    </>
  );
};

export default Login;
