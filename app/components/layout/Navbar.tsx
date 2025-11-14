"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../lib/button";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import BaseDialog from "../common/BaseDialog";
import Login from "../auth/Login";
import { cn } from "@/lib/utils";
import { MenuIcon, User as UserIcon, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../lib/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAuth } from "@/context/auth.context";
import { toast } from "sonner";
import { Role } from "@/constants/authEnums";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../lib/dropdown-menu";
import { usePathname } from "next/navigation";

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

// Helper function to check if link is active
const isLinkActive = (href: string, pathname: string) => {
  // Handle hash links
  if (href.includes("#")) {
    const path = href.split("#")[0];
    return pathname === (path || "/");
  }
  // Handle exact matches
  if (href === pathname) return true;
  // Handle relative paths (./dashboard)
  if (href.startsWith("./")) {
    const relativePath = href.slice(1);
    return pathname.endsWith(relativePath);
  }
  return false;
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
          <>
            <NavigationButtons
              setShowSignInDialog={setShowSignInDialog}
              className="hidden md:flex"
            />
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
          </>
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

const UserMenu = ({
  setShowSignInDialog,
}: {
  setShowSignInDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user, signOut, userRole } = useAuth();
  const userEmail = user?.email || "";
  const userName = user?.displayName || userEmail?.split("@")[0] || "User";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const getProfileLink = () => {
    if (userRole === Role.LENDER) return "/lender/profile";
    if (userRole === Role.ADMIN) return "/admin/profile";
    return "/profile";
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Logged out successfully.");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex min-w-0 items-center gap-2 border-0 p-2 text-white hover:bg-white/10"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white">
            {userInitials}
          </div>
          <span className="hidden max-w-[120px] truncate lg:block">
            {userName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="truncate text-sm font-medium leading-none">
              {userName}
            </p>
            <p className="truncate text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={getProfileLink()}
            className="flex cursor-pointer items-center"
          >
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NavigationButtons = ({
  setShowSignInDialog,
  className,
}: {
  setShowSignInDialog: Dispatch<SetStateAction<boolean>>;
} & React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const { userRole, isAuthenticatedUser } = useAuth();
  const pathname = usePathname();

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
          <Button
            asChild
            variant="link"
            className={cn(
              "text-shadow",
              isLinkActive("/about-us", pathname) &&
                "underline decoration-2 underline-offset-4",
            )}
          >
            <Link href="/about-us" scroll={false}>
              About Us
            </Link>
          </Button>
          <Button
            asChild
            variant="link"
            className={cn(
              "text-shadow",
              isLinkActive("/contact-us", pathname) &&
                "underline decoration-2 underline-offset-4",
            )}
          >
            <Link href="/contact-us" scroll={false}>
              Contact Us
            </Link>
          </Button>
          {isAuthenticatedUser && (
            <Button
              asChild
              variant="link"
              className={cn(
                "text-shadow",
                isLinkActive("/my-applications", pathname) &&
                  "underline decoration-2 underline-offset-4",
              )}
            >
              <Link href="/my-applications" scroll={false}>
                My Applications
              </Link>
            </Button>
          )}
        </>
      )}
      {isAuthenticatedUser ? (
        <UserMenu setShowSignInDialog={setShowSignInDialog} />
      ) : (
        <SignInOrSignOutButton
          size="default"
          variant="link"
          className="border-2 border-white !text-white"
          setShowSignInDialog={setShowSignInDialog}
        />
      )}
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
  const { userRole, isAuthenticatedUser, user, signOut } = useAuth();
  const pathname = usePathname();
  const userEmail = user?.email || "";
  const userName = user?.displayName || userEmail?.split("@")[0] || "User";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const getProfileLink = () => {
    if (userRole === Role.LENDER) return "/lender/profile";
    if (userRole === Role.ADMIN) return "/admin/profile";
    return "/profile";
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Logged out successfully.");
    setShowSideBar(false);
  };

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
              className={cn(
                "text-shadow",
                isLinkActive(item.href, pathname) &&
                  "font-semibold underline decoration-2 underline-offset-4",
              )}
              onClick={() => setShowSideBar(false)}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
            <div className="h-0.5 w-full bg-app/15"></div>
          </div>
        ))}
      </div>
      <div className="h-0.5 w-full bg-app/15"></div>

      {isAuthenticatedUser ? (
        <div className="my-5 flex flex-col gap-3">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-app/20 text-sm font-semibold text-primary">
              {userInitials}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-primary">
                {userName}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {userEmail}
              </span>
            </div>
          </div>
          <div className="h-0.5 w-full bg-app/15"></div>
          <Button
            asChild
            variant="link"
            className={cn(
              "justify-start text-primary",
              isLinkActive("/profile", pathname) &&
                "font-semibold underline decoration-2 underline-offset-4",
            )}
            onClick={() => setShowSideBar(false)}
          >
            <Link href="/profile" className="flex w-full items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </Button>
          <Button
            variant="link"
            className="justify-start text-destructive"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      ) : (
        <SignInOrSignOutButton
          size="default"
          variant="link"
          className="my-5"
          setShowSignInDialog={setShowSignInDialog}
          setShowSideBar={setShowSideBar}
        />
      )}
    </div>
  );
};

export default Navbar;
