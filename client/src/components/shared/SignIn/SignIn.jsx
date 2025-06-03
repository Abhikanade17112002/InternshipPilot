
import React, { useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CustomDropDown from "../CustomDropDown/CustomDropDown";
import { useDispatch } from "react-redux";
import { handleUserSignInAction } from "@/store/userSlice/userSlice";
import { toast } from "sonner";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
    mode: "all",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleUserSignIn = async (data) => {
    setSubmitting(true);
    try {
      const response = await dispatch(handleUserSignInAction(data));
      if (response.payload?.status) {
        toast.success(response.payload.message);
        navigate("/");
      } else {
        toast.error(response.payload?.message || "Sign-in failed.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="w-full max-w-md mx-auto py-6 px-8 border bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

      <form onSubmit={handleSubmit(handleUserSignIn)} className="space-y-4">
        {/* Email Input */}
        <CustomInput
          label="Email"
          type="email"
          name="email"
          errors={errors}
          placeholder="Enter Email"
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email",
            },
          })}
        />

        {/* Password Input */}
        <CustomInput
          label="Password"
          type="password"
          name="password"
          errors={errors}
          placeholder="Enter Password"
          register={register("password", {
            required: "Password is required",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
              message: "Enter a strong password",
            },
          })}
        />

        {/* Role Dropdown */}
        <CustomDropDown
          control={control}
          setValue={setValue}
          errors={errors}
          name="role"
          label="Role"
          register={register("role", { required: "User role required" })}
          placeholder="Select user role"
          dropDownOptions={[
            { id: 1, label: "Student", value: "student" },
            { id: 2, label: "Recruiter", value: "recruiter" },
          ]}
        />

        {/* Submit Button */}
        <div className="mt-6">
          <Button
            type="submit"
            disabled={submitting}
            className="w-full flex justify-center items-center gap-2"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Please wait..." : "Sign In"}
          </Button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-blue-500 font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
