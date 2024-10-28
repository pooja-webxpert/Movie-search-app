"use client";
import { successMsg } from "@/component/Toastmsg/toaster";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  //handle SignOut 
  const handleSignOut = () => {
    successMsg("Logout successfull")
    signOut({ callbackUrl: "/", redirect: true });
  }
  return (
    <>
      <button
        className=" hover:bg-slate-100   "
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </>
  );
};
export default LogoutButton;
