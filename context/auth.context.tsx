"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User as FirebaseUser,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { Role } from "@/constants/authEnums";
import { authAxios } from "@/lib/axios";
import { BASE_CONFIG } from "@/configs/baseConfig";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";

interface AuthContext {
  user: unknown | null; // TODO: replace with User
  userRole: Role;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
    successCallback?: () => void,
  ) => Promise<void>;
  verifyAuthLogin: (role: Role, successCallback?: () => void) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContext>({} as AuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({
  children,
  role,
}: React.HtmlHTMLAttributes<HTMLDivElement> & { role: Role }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);
  let isSigningIn = false;
  const [userRole] = useState<Role>(role);

  console.log({
    role,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (_user) => {
      setLoading(true);
      setFirebaseUser(_user);

      if (_user && !isSigningIn) {
        await verifyAuthLogin(role);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (
    email: string,
    password: string,
    successCallback?: () => void,
  ) => {
    setLoading(true);
    isSigningIn = true;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      await verifyAuthLogin(userRole, successCallback);
    } catch (error: unknown) {
      console.log({ error });

      if ((error as FirebaseError).code === "auth/invalid-credential") {
        toast.error("Invalid credentials. Please try again.");
        return;
      }

      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      isSigningIn = false;
    }
  };

  const verifyAuthLogin = async (role: Role, successCallback?: () => void) => {
    try {
      const response = await authAxios.post(
        `${BASE_CONFIG.BASE_API_URL}/auth/${role}/verify`,
      );
      setUser(response.data.data);
      console.log(response.data.data);
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
  };

  return (
    <AuthContext.Provider
      value={{ user, userRole, loading, signIn, verifyAuthLogin, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
