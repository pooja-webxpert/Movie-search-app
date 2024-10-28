"use client";
import { errorMsg, successMsg } from "@/component/Toastmsg/toaster";
import { Sheet } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Button, FormControl, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

import InputField from "@/component/shared/form/InputField";
import { SignUpValidation } from "@/component/validation/signUpValidation";
import { routesUrl } from "@/utils/pagesurl";

const SignUpForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignUpValidation) });

  // Initialize cookies data
  const [data, setData] = useState(() => {
    // Retrieve and parse the cookie data, or return an empty array if not found
    const cookieData = Cookies.get("register");
    return cookieData ? JSON.parse(cookieData) : [];
  });

  const [user, setUser] = useState(null);
  const router = useRouter();

  const onSubmit = async (registeruser) => {
    const checkData = data.find(
      (item) =>
        item.email === registeruser.email ||
        item.username === registeruser.username
    );
    if (checkData) {
      if (checkData.email === registeruser.email) {
        errorMsg("Email already exists");
      } else if (checkData.username === registeruser.username) {
        errorMsg("Username already exists");
      } else {
        errorMsg("User already exists");
      }
    } else {
      try {
        // Add the new user to the existing array
        const storedData = [...data, registeruser];
        setData(storedData);

        // Serialize and store the array in cookies
        Cookies.set("register", JSON.stringify(storedData), { expires: 7 }); // Set cookie to expire in 7 days

        setUser(registeruser);
        successMsg("User registered successfully");
      } catch (error) {
        errorMsg("An error occurred while saving data:", error);
      }
    }
    reset();
  };

  useEffect(() => {
    if (!user) return;
    const loginuser = async () => {
      const { email, password } = user;
      const localData = Cookies.get("register");

      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
          localData,
        });
        if (res.error) {
          return errorMsg("Invalid credentials");
        } else {
          router.replace("/");
          return successMsg("Login Successfully");
        }
      } catch (error) {
        return errorMsg("Login Error");
      }
    };
    loginuser();
  }, [user]);

  return (
    <>
     <div className="login-section">
       <div className="">
       <Sheet
          sx={{
            width: 500,
            mx: "auto",
            py: 9,
            py: 7,
            px: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Typography variant="h4" className="text-center">
                <b>Welcome!</b>
              </Typography>
            </div>
            <div>
              <FormControl>
                <InputField
                errors={errors}
                  className="w-96 ml-5"
                  label="Email"
                  control={control}
                  name="email"
                  type="text"
                  placeholder="example123@gmail.com"
                  />
              </FormControl>
            </div>
            <br/>
            <div>
              <FormControl>
                <InputField
                  placeholder="example123"
                errors={errors}
                  className="w-96 ml-5"
                  label="Username"
                  control={control}
                  name="username"
                  type="text"
                
                />
              </FormControl>
            </div>
            <br />
            <div>
              <FormControl>
                <InputField
                errors={errors}
                  className="w-96 ml-5"
                  control={control}
                  name="password"
                  type="password"
                  label="Password"
                />
              </FormControl>
            </div>
            <br />
            <div className="flex justify-center items-center mt-10  ">
              <Button
                type="submit"
                className="!bg-gray-600 !hover:bg-gray-700 !text-white !font-bold cursor-pointer !px-6 !py-2 
                !rounded-md !transition duration-300"
              >
                Register
              </Button>
            </div>
              <div className="text-center mt-10">
                <Typography>
                Already have an account? 
                  <Link href={routesUrl.signIn}>
                    <span className="hover:underline hover:text-red-800"> Sign In</span>
                  </Link>
                </Typography>
              </div>
          </form>
        </Sheet>
       </div>
      </div>
    </>
  );
};

export default SignUpForm;
