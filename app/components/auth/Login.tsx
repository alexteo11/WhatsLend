"use client";

import React, { useMemo } from "react";
import { Form } from "../lib/form";
import { useForm } from "react-hook-form";
import { LoginReq, loginReqSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import BaseFormField from "../common/BaseFormField";
import { Button } from "../lib/button";
import { LoaderWrapper } from "../common/LoaderWrapper";
import { toast } from "sonner";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./Signup";
import useDialogStore from "@/stores/useDialogStore";
import { useAuth } from "@/context/auth.context";
import { cn } from "@/lib/utils";
import { Role } from "@/constants/authEnums";
interface LoginProps {
  onInnerDialogOpen?: () => void;
  onLoginSuccess?: () => void;
}

const ROLE_LOGIN_MAP = {
  [Role.ADMIN]: {
    title: "Admin Login",
    desc: "Welcome, Admin. Please log in to manage the system.",
    showResetPassword: true,
    showSignupNow: false,
  },
  [Role.LENDER]: {
    title: "Lender Login",
    desc: "Welcome, Lender. Please login to access your dashboard.",
    showResetPassword: true,
    showSignupNow: false,
  },
  [Role.USER]: {
    title: "User Login",
    desc: "Log in and start your journey to financial freedom",
    showResetPassword: true,
    showSignupNow: true,
  },
};

const Login = ({
  onInnerDialogOpen,
  onLoginSuccess,
  className,
}: LoginProps & React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const { signIn, userRole, isAuthenticating } = useAuth();
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
    await signIn(data.email, data.password, () => {
      toast.success("You have logged in successfully.");
      onLoginSuccess?.();
    });
  };

  const onResetPasswordBtnClick = () => {
    openDialog(<ForgotPassword />);
    onInnerDialogOpen?.();
  };

  const onSignUpBtnClick = () => {
    openDialog(<SignUp onSignUpSuccess={() => closeDialog()} />);
    onInnerDialogOpen?.();
  };

  const { title, desc, showResetPassword, showSignupNow } = useMemo(
    () => ROLE_LOGIN_MAP[userRole],
    [userRole],
  );

  return (
    <>
      <LoaderWrapper
        isLoading={isAuthenticating}
        className={cn("w-[90vw] max-w-[500px]", className)}
      >
        <div className="flex flex-col gap-2 px-6 py-10">
          <h1 className="text-center text-3xl text-app">{title}</h1>
          <p className="mb-8 text-center text-sm text-light-gray">{desc}</p>
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

                  <div className="flex flex-row items-center justify-evenly gap-4">
                    {showResetPassword && (
                      <Button
                        className="flex-1"
                        type="button"
                        size="lg"
                        variant="outline"
                        onClick={() => onResetPasswordBtnClick()}
                      >
                        <p>Reset Password</p>
                      </Button>
                    )}
                    {showSignupNow && (
                      <Button
                        className="flex-1"
                        type="button"
                        size="lg"
                        onClick={() => onSignUpBtnClick()}
                      >
                        Sign Up Now
                      </Button>
                    )}
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
