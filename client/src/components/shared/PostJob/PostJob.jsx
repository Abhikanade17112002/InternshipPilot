import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../CustomInput/CustomInput";
import CustomDropDown from "../CustomDropDown/CustomDropDown";
import { Button } from "@/components/ui/button";
import Loader from "../Loader/Loader";
import { toast } from "sonner";
import { getAllCompanies } from "@/store/companySlice/companySlice";
import { useSelector } from "react-redux";

const PostJob = () => {
  const companies = useSelector(getAllCompanies);
  const mappedCompanies = companies.map((company) => ({
    id: company._id,
    label: company.companyName,
    value: company._id,
  }));

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
      requirements: "",
      salary: "",
      location: "",
      jobType: "",
      experience: "",
      position: "",
      companyId: "",
    },
    mode: "all",
  });
  const handleJobPosting = async (data) => {
    try {
      setSubmitting(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/job/post`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },

          withCredentials: true,
        }
      );

      if (response.data.status) {
        toast.success(response?.data?.message);
        navigate("/admin/jobs");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Something went wrong while posting job", error);
    } finally {
      setSubmitting(false);
    }
  };

  return submitting ? (
    <Loader></Loader>
  ) : (
    <div className="h-[100vh] py-4 overflow-y-auto my-5">
      <h1 className="text-4xl font-bold text-center"> Fill Job Details </h1>
      <div className="formContainer max-w-3xl mx-auto border py-4 px-6  rounded-lg my-4">
        <form
          action=""
          className="py-2"
          onSubmit={handleSubmit(handleJobPosting)}
          encType="multipart/form-data"
        >
          <div className="">
            <Button>
              <Link to="/admin/jobs" className="text-white">
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <CustomInput
            label="Job Title"
            type="text"
            name="jobTitle"
            errors={errors}
            placeholder="Enter Job Title"
            register={register("jobTitle", {
              required: {
                value: true,
                message: "job title is required",
              },
            })}
          />
          <CustomInput
            label="Job Description"
            type="text"
            name="jobDescription"
            errors={errors}
            placeholder="Enter Job Description"
            register={register("jobDescription", {
              required: {
                value: true,
                message: "job description is required",
              },
            })}
          />
          <CustomInput
            label="Job Requirements"
            type="text"
            name="requirements"
            errors={errors}
            placeholder="Enter Requirements ( comma separated values )"
            register={register("requirements", {
              required: {
                value: true,
                message: "job requirements required",
              },
            })}
          />
          <CustomInput
            label="Salary"
            type="text"
            name="salary"
            errors={errors}
            placeholder="Salary In LPA "
            register={register("salary", {
              required: {
                value: true,
                message: "salary required",
              },
            })}
          />
          <CustomInput
            label="Job Location"
            type="text"
            name="location"
            errors={errors}
            placeholder="Enter Job Location"
            register={register("location", {
              required: {
                value: true,
                message: "job location is required",
              },
            })}
          />

          <CustomInput
            label="Job Type"
            type="text"
            name="jobType"
            errors={errors}
            placeholder="Enter Job Type"
            register={register("jobType", {
              required: {
                value: true,
                message: "job type is required",
              },
            })}
          />
          <CustomInput
            label="Experience Required"
            type="text"
            name="Experience"
            errors={errors}
            placeholder="Enter Required Experience"
            register={register("experience", {
              required: {
                value: true,
                message: "job experience is required",
              },
            })}
          />
          <CustomInput
            label="Job Positions"
            type="text"
            name="position"
            errors={errors}
            placeholder="Enter Number Of Positions"
            register={register("position", {
              required: {
                value: true,
                message: "job positions are required",
              },
            })}
          />
          <CustomDropDown
            control={control}
            setValue={setValue}
            errors={errors}
            name={"companyId"}
            label={"Select Company For Job"}
            register={register("companyId", {
              required: {
                value: true,
                message: "company is required",
              },
            })}
            placeholder={"Select Company For Job Posting "}
            dropDownOptions={mappedCompanies}
          />

          <div className="formButtons  lg:px-[150px] my-10 flex  flex-col">
            <Button>
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {submitting ? "please wait ..." : "Post"}
            </Button>
            <div className="flex px-4 my-4 text-[10px] justify-center ">
              <p className="text-gray-500 ">
                go back ? <span className="text-white"> as</span>{" "}
              </p>
              <Link to="/admin/jobs" className="text-blue-500 ">
                {" "}
                dashboard
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
