"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../lib/button";
import { Dispatch, SetStateAction, useState } from "react";
import BaseDialog from "../common/BaseDialog";
import Login from "../auth/Login";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../lib/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAuth } from "@/context/auth.context";
import { User as FirebaseUser } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";

const Navbar = () => {
  const { user } = useAuth();
  const [showSideBar, setShowSideBar] = useState(false);
  const [showSignInDialog, setShowSignInDialog] = useState(false);

  return (
    <header className="hero__bg fixed left-0 top-0 z-40 h-[var(--nav-height)] w-full shadow-xl">
      <nav className="middle-container-width flex items-center justify-between py-3">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Compare Loan Logo"
            width={130}
            height={18}
            className="object-contain"
          />
        </Link>
        <NavigationButtons
          user={user}
          setShowSignInDialog={setShowSignInDialog}
          className="hidden md:flex"
        />
        <Sheet open={showSideBar} onOpenChange={setShowSideBar}>
          <SheetTrigger className="block md:hidden">
            <Button size="icon" variant="link" asChild>
              <MenuIcon className="text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent className="max-w-[60vw]">
            <VisuallyHidden>
              <SheetTitle>Navigation</SheetTitle>
            </VisuallyHidden>
            <NavigationSideBar
              user={user}
              setShowSignInDialog={setShowSignInDialog}
              setShowSideBar={setShowSideBar}
            />
          </SheetContent>
        </Sheet>
      </nav>
      <BaseDialog isOpen={showSignInDialog} onOpenChange={setShowSignInDialog}>
        <Login
          onInnerDialogOpen={() => {
            setShowSignInDialog(false);
          }}
          onLoginSuccess={() => {
            setShowSignInDialog(false);
            setShowSideBar(false);
          }}
        />
      </BaseDialog>
    </header>
  );
};

const SignInOrSignOutButton = ({
  user,
  setShowSignInDialog,
  setShowSideBar,
  className,
  size,
  variant,
}: {
  user: FirebaseUser | null;
  setShowSignInDialog: Dispatch<SetStateAction<boolean>>;
  setShowSideBar?: Dispatch<SetStateAction<boolean>>;
  size: "default" | "lg";
  variant?: "link";
} & React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const label = user ? "Sign Out" : "Sign In";

  const action = async () => {
    if (user) {
      await auth.signOut();
      toast.success("Logged out successfully.");
      setShowSignInDialog(false);
      setShowSideBar?.(false);
    } else {
      setShowSignInDialog(true);
    }
  };

  const getVariant = () => {
    if (variant) {
      return variant;
    }

    return user ? "default" : "app";
  };

  return (
    <Button
      variant={getVariant()}
      size={size}
      className={cn(
        "border px-5 py-5 !text-white",
        className,
        user && "border-destructive font-bold !text-destructive",
      )}
      onClick={() => action()}
    >
      {label}
    </Button>
  );
};

const NavigationButtons = ({
  user,
  setShowSignInDialog,
  className,
}: {
  user: FirebaseUser | null;
  setShowSignInDialog: Dispatch<SetStateAction<boolean>>;
} & React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-4 [&>*]:text-base [&>*]:text-white",
        className,
      )}
    >
      <Button asChild variant="link" className="text-shadow px-5">
        <Link href="/#how-it-works">How It Works</Link>
      </Button>
      <Button asChild variant="link" className="text-shadow">
        <Link href="/#faqs">FAQs</Link>
      </Button>
      <Button asChild variant="link" className="text-shadow">
        <Link href="/about-us" scroll={false}>
          About Us
        </Link>
      </Button>
      <Button asChild variant="link" className="text-shadow">
        <Link href="/contact-us" scroll={false}>
          Contact Us
        </Link>
      </Button>
      <SignInOrSignOutButton
        size="default"
        variant="link"
        className="border-2 border-white !text-white"
        user={user}
        setShowSignInDialog={setShowSignInDialog}
      />
    </div>
  );
};

const NavigationSideBar = ({
  user,
  setShowSignInDialog,
  setShowSideBar,
  className,
}: {
  user: FirebaseUser | null;
  setShowSignInDialog: Dispatch<SetStateAction<boolean>>;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
} & React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex flex-col justify-between">
      <div
        className={cn(
          "scrollable-sheet-content mt-10 flex h-[calc(100vh-160px)] flex-col gap-4 overflow-scroll [&>*]:text-base [&>*]:text-primary",
          className,
        )}
      >
        <div className="h-0.5 w-full bg-app/15"></div>
        <Button
          asChild
          variant="link"
          className="text-shadow"
          onClick={() => setShowSideBar(false)}
        >
          <Link href="/">Home</Link>
        </Button>
        <div className="h-0.5 w-full bg-app/15"></div>
        <Button
          asChild
          variant="link"
          className="text-shadow"
          onClick={() => setShowSideBar(false)}
        >
          <Link href="/#how-it-works">How It Works</Link>
        </Button>
        <div className="h-0.5 w-full bg-app/15"></div>
        <Button
          asChild
          variant="link"
          className="text-shadow"
          onClick={() => setShowSideBar(false)}
        >
          <Link href="/#faqs">FAQs</Link>
        </Button>
        <div className="h-0.5 w-full bg-app/15"></div>

        <Button
          asChild
          variant="link"
          className="text-shadow"
          onClick={() => setShowSideBar(false)}
        >
          <Link href="/about-us">About Us</Link>
        </Button>
        <div className="h-0.5 w-full bg-app/15"></div>

        <Button
          asChild
          variant="link"
          className="text-shadow"
          onClick={() => setShowSideBar(false)}
        >
          <Link href="/contact-us">Contact Us</Link>
        </Button>

        <div className="h-0.5 w-full bg-app/15"></div>
      </div>
      <div className="h-0.5 w-full bg-app/15"></div>

      <SignInOrSignOutButton
        size="default"
        className="my-5"
        user={user}
        setShowSignInDialog={setShowSignInDialog}
        setShowSideBar={setShowSideBar}
      />
    </div>
  );
};

export default Navbar;
