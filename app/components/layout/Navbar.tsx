"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../lib/button";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import BaseDialog from "../common/BaseDialog";
import Login from "../auth/Login";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../lib/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAuth } from "@/context/auth.context";
import { toast } from "sonner";
import { Role } from "@/constants/authEnums";

const ROLE_NAV_BAR_MAP = {
  [Role.ADMIN]: {
    homeRoute: "/admin",
    sidebarItems: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "How It Works",
        href: "/#how-it-works",
      },
      {
        label: "FAQs",
        href: "/#faqs",
      },
      {
        label: "About Us",
        href: "/about-us",
      },
      {
        label: "Contact Us",
        href: "/contact-us",
      },
    ],
  },
  [Role.LENDER]: {
    homeRoute: "/lender",
    sidebarItems: [
      {
        label: "Dashboard",
        href: "./dashboard",
      },
      {
        label: "Offer",
        href: "./offer",
      },
      {
        label: "Appointment",
        href: "./appointment",
      },
      {
        label: "Payments",
        href: "./payments",
      },
      {
        label: "Profile",
        href: "./profile",
      },
    ],
  },
  [Role.USER]: {
    homeRoute: "/",
    sidebarItems: [
      {
        label: "Dashboard",
        href: "./dashboard",
      },
      {
        label: "Offer",
        href: "./offer",
      },
      {
        label: "Appointment",
        href: "./appointment",
      },
      {
        label: "Pending Payment",
        href: "./pendingPayment",
      },
      {
        label: "Profile",
        href: "./profile",
      },
    ],
  },
};

const Navbar = ({
  hideButtons,
  defaultHomeRoute,
}: {
  hideButtons?: boolean;
  defaultHomeRoute?: string;
}) => {
  const { userRole } = useAuth();
  const [showSideBar, setShowSideBar] = useState(false);
  const [showSignInDialog, setShowSignInDialog] = useState(false);

  const { homeRoute } = useMemo(() => {
    if (defaultHomeRoute) {
      return {
        homeRoute: defaultHomeRoute,
      };
    }

    return ROLE_NAV_BAR_MAP[userRole] || {};
  }, [userRole, defaultHomeRoute]);

  return (
    <header className="hero__bg fixed left-0 top-0 z-[50] h-[var(--nav-height)] w-full shadow-xl">
      <nav
        className={cn(
          "flex items-center justify-between py-3",
          userRole === Role.USER ? "middle-container-width" : "mx-auto w-[95%]",
        )}
      >
        <Link href={homeRoute || "/"}>
          <Image
            src="/logo.png"
            alt="Compare Loan Logo"
            width={130}
            height={18}
            className="object-contain"
          />
        </Link>
        {!hideButtons && (
          <NavigationButtons
            setShowSignInDialog={setShowSignInDialog}
            className="hidden md:flex"
          />
        )}
        {!hideButtons && (
          <Sheet open={showSideBar} onOpenChange={setShowSideBar}>
            <SheetTrigger className="block md:hidden">
              <Button size="icon" variant="link" asChild>
                <MenuIcon className="text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent className="z-[999] max-w-[60vw]">
              <VisuallyHidden>
                <SheetTitle>Navigation</SheetTitle>
              </VisuallyHidden>
              <NavigationSideBar
                setShowSignInDialog={setShowSignInDialog}
                setShowSideBar={setShowSideBar}
              />
            </SheetContent>
          </Sheet>
        )}
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
  setShowSignInDialog,
  setShowSideBar,
  className,
  size,
  variant,
}: {
  setShowSignInDialog: Dispatch<SetStateAction<boolean>>;
  setShowSideBar?: Dispatch<SetStateAction<boolean>>;
  size: "default" | "lg";
  variant?: "link";
} & React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const { isAuthenticatedUser, signOut } = useAuth();

  const label = isAuthenticatedUser ? "Sign Out" : "Sign In";

  const action = async () => {
    if (isAuthenticatedUser) {
      await signOut();
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

    return isAuthenticatedUser ? "default" : "app";
  };

  return (
    <Button
      variant={getVariant()}
      size={size}
      className={cn(
        "border px-5 py-5 !text-white",
        className,
        !!isAuthenticatedUser &&
          "border-destructive font-bold !text-destructive",
      )}
      onClick={() => action()}
    >
      {label}
    </Button>
  );
};

const NavigationButtons = ({
  setShowSignInDialog,
  className,
}: {
  setShowSignInDialog: Dispatch<SetStateAction<boolean>>;
} & React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const { userRole, isAuthenticatedUser } = useAuth();

  return (
    <div
      className={cn(
        "flex flex-row items-center gap-4 [&>*]:text-base [&>*]:text-white",
        className,
      )}
    >
      {userRole === Role.USER && (
        <>
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
          {isAuthenticatedUser && (
            <Button asChild variant="link" className="text-shadow">
              <Link href="/my-applications" scroll={false}>
                My Applications
              </Link>
            </Button>
          )}
        </>
      )}
      <SignInOrSignOutButton
        size="default"
        variant="link"
        className="border-2 border-white !text-white"
        setShowSignInDialog={setShowSignInDialog}
      />
    </div>
  );
};

const NavigationSideBar = ({
  setShowSignInDialog,
  setShowSideBar,
  className,
}: {
  setShowSignInDialog: Dispatch<SetStateAction<boolean>>;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
} & React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const { userRole } = useAuth();
  return (
    <div className="flex flex-col justify-between">
      <div
        className={cn(
          "scrollable-sheet-content mt-10 flex h-[calc(100vh-160px)] flex-col gap-4 overflow-scroll",
          className,
        )}
      >
        <div className="h-0.5 w-full bg-app/15"></div>
        {ROLE_NAV_BAR_MAP[userRole].sidebarItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-4 [&>*]:text-base [&>*]:text-primary"
          >
            <Button
              asChild
              variant="link"
              className="text-shadow"
              onClick={() => setShowSideBar(false)}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
            <div className="h-0.5 w-full bg-app/15"></div>
          </div>
        ))}
      </div>
      <div className="h-0.5 w-full bg-app/15"></div>

      <SignInOrSignOutButton
        size="default"
        variant="link"
        className="my-5"
        setShowSignInDialog={setShowSignInDialog}
        setShowSideBar={setShowSideBar}
      />
    </div>
  );
};

export default Navbar;
