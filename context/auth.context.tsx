"use client";

import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../lib/firebase";

interface AuthContext {
  user: FirebaseUser | null;
  loading: boolean;
}

const AuthContext = React.createContext<AuthContext>({} as AuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({
  children,
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setUser(user);

      // await get user data from api?
      // const delay = new Promise((resolve) => setTimeout(resolve, 0));
      // await delay;

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
