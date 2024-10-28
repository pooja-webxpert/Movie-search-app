"use client";
import { FormControl } from "@mui/joy";
import { Sheet } from "@mui/joy";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import InputField from "@/component/shared/form/InputField";
import { errorMsg, successMsg } from "@/component/Toastmsg/toaster";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInValidation } from "@/component/validation/signInValidation";
import { routesUrl } from "@/utils/pagesurl";
import Cookies from "js-cookie"; // Import the js-cookie package

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(SignInValidation) });
  const router = useRouter();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const cookieData = Cookies.get("register"); // Retrieve cookies data
    const localData = cookieData ? JSON.parse(cookieData) : []; // Parse cookies data if exists

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        localData: JSON.stringify(localData), // Pass the cookie data as a string
      });
      if (res.error) {
        return errorMsg("Invalid credentials");
      } else {
        router.replace("/"); // Redirect to homepage on successful login
        return successMsg("Login Successfully");
      }
    } catch (error) {
      return errorMsg("Login Error");
    }
  };

  return (
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
                    type="email"
                    placeholder="example123@gmail.com"
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
              <div className="flex justify-center items-center mt-7  ">
                <Button
                  type="submit"
                  className="!bg-gray-600 !hover:bg-gray-700 !text-white !font-bold cursor-pointer !px-6 !py-2 
                !rounded-md !transition duration-300"
                >
                  Login
                </Button>
              </div>
              <div className="text-center mt-10">
                <Typography>
                  Don't have an account?
                  <Link href={routesUrl.signUp}>
                    <span className="hover:underline hover:text-red-800"> Sign Up</span>
                  </Link>
                </Typography>
              </div>
            </form>
          </Sheet>
        </div>
      </div>
  );
};

export default Login;
