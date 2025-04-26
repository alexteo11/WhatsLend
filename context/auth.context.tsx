"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  User as FirebaseUser,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { Role } from "@/constants/authEnums";
import { authAxios } from "@/lib/axios";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";

interface AuthContext {
  user: FirebaseUser | null; // TODO: replace with User
  userRole: Role;
  loading: boolean;
  isAuthenticating: boolean;
  signIn: (
    email: string,
    password: string,
    successCallback?: () => void,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  isInitializing: boolean;
  isAuthenticatedUser: boolean;
}

const AuthContext = React.createContext<AuthContext>({} as AuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({
  children,
  role,
}: React.HtmlHTMLAttributes<HTMLDivElement> & { role: Role }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [userRole] = useState<Role>(role);

  const isInitializing = useMemo(() => {
    return !user && loading && !isAuthenticating;
  }, [user, loading, isAuthenticating]);

  const isAuthenticatedUser = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }
    const _userRole = window.localStorage?.getItem("compareLoanUserRole");
    return !!(user && _userRole === userRole);
  }, [user, userRole, isAuthenticating]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (_user) => {
      setLoading(true);
      setUser(_user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (
    email: string,
    password: string,
    successCallback?: () => void,
  ) => {
    setIsAuthenticating(true);

    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      await verifyAuthLogin(data.user.uid, userRole, successCallback);
    } catch (error: unknown) {
      console.log({ error });

      if ((error as FirebaseError).code === "auth/invalid-credential") {
        toast.error("Invalid credentials. Please try again.");
        return;
      }

      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const verifyAuthLogin = async (
    uid: string,
    role: Role,
    successCallback?: () => void,
  ) => {
    try {
      const response = await authAxios.post<{ data: string }>(
        `/auth/${role}/verify/${uid}`,
      );
      const accessToken = response.data.data;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("compareLoanAccessToken", accessToken);
        window.localStorage.setItem("compareLoanUserRole", userRole);
      }
      successCallback?.();
    } catch {
      await signOut();
      toast.error("Login verification failed. Please try again.");
      return;
    }
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("compareLoanAccessToken");
      window.localStorage.removeItem("compareLoanUserRole");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        loading,
        isAuthenticating,
        signIn,
        signOut,
        isInitializing,
        isAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
