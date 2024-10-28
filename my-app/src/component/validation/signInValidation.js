import * as Yup from "yup";

// Validation for SignIn form
export const SignInValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
