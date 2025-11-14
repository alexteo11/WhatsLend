"use client";

import React from "react";
import { useAuth } from "@/context/auth.context";
import { Mail, User, Edit3 } from "lucide-react";
import { Button } from "@/app/components/lib/button";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  const { user, signOut, isAuthenticatedUser } = useAuth();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "Not available";

  const handleSignOut = async () => {
    await signOut();
    // You can add toast if needed
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <div className="flex w-full max-w-md flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
        {/* Top Section */}
        <div>
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500 shadow-inner">
              <User className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {displayName}
            </h1>
            <p className="mt-1 text-sm text-gray-500">{userEmail}</p>
          </div>

          {/* Info Section */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-medium">Email</span>
              </div>
              <span className="text-sm text-gray-800">{userEmail}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-5 w-5 text-indigo-500" />
                <span className="text-sm font-medium">Status</span>
              </div>
              {isAuthenticatedUser ? (
                <span className="text-sm font-semibold text-green-600">
                  Active
                </span>
              ) : (
                <span className="text-sm font-semibold text-red-600">
                  Inactive
                </span>
              )}
            </div>
          </div>

          {/* Edit Profile */}
          {/* {isAuthenticatedUser ? (
            <div className="mt-8 flex justify-center">
              <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-white transition-all hover:bg-indigo-700">
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </button>
            </div>
          ) : null} */}
        </div>

        {/* Bottom Sign Out Button */}
        {isAuthenticatedUser && (
          <div className="mt-8">
            <Button
              variant="destructive"
              size="default"
              className={cn("w-full")}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
