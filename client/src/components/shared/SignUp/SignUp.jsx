
import React, { useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CustomDropDown from "../CustomDropDown/CustomDropDown";
import CustomFileInput from "../CustomFileInput/CustomFileInput";
import { useDispatch } from "react-redux";
import { handleUserSignUpAction } from "@/store/userSlice/userSlice";
import { toast } from "sonner";

const SignUp = () => {
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      phoneNumber: "",
      profilePic: "",
    },
    mode: "all",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleUserSignUp = async (data) => {
    const formdata = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "profilePic") {
        formdata.append(key, data[key][0]);
      } else {
        formdata.append(key, data[key]);
      }
    });

    setSubmitting(true);
    try {
      const response = await dispatch(handleUserSignUpAction(formdata));

      if (response.payload.status) {
        toast.success(response.payload.message);
        navigate("/");
      } else {
        toast.error(response.payload.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="w-1/2 mx-auto min-w-[250px] py-6 px-8 border bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>


      <form
        onSubmit={handleSubmit(handleUserSignUp)}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <CustomInput
          label="First Name"
          type="text"
          name="firstName"
          errors={errors}
          placeholder="Enter First Name"
          register={register("firstName", { required: "First name is required" })}
        />
        <CustomInput
          label="Last Name"
          type="text"
          name="lastName"
          errors={errors}
          placeholder="Enter Last Name"
          register={register("lastName", { required: "Last name is required" })}
        />
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
        <CustomInput
          label="Phone Number"
          type="text"
          name="phoneNumber"
          errors={errors}
          placeholder="Enter Phone Number"
          register={register("phoneNumber", { required: "Phone number is required" })}
        />
        <CustomDropDown
          control={control}
          setValue={setValue}
          errors={errors}
          name="role"
          label="Role"
          register={register("role", { required: "User role is required" })}
          placeholder="Select user role"
          dropDownOptions={[
            { id: 1, label: "Student", value: "student" },
            { id: 2, label: "Recruiter", value: "recruiter" },
          ]}
        />
        <CustomFileInput
          errors={errors}
          name="profilePic"
          label="Upload Profile Image"
          register={register("profilePic", { required: "Profile image is required" })}
        />

        {/* Submit Button */}
        <div className="mt-6">
          <Button
            type="submit"
            disabled={submitting}
            className="w-full flex justify-center items-center gap-2"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Please wait..." : "Sign Up"}
          </Button>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/auth/signin" className="text-blue-500 font-medium">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
