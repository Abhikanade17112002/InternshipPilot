import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomInput from "../CustomInput/CustomInput";
import CustomFileInput from "../CustomFileInput/CustomFileInput";
import CustomDropDown from "../CustomDropDown/CustomDropDown";
import { Button } from "@/components/ui/button";
import Loader from "../Loader/Loader";
import { toast } from "sonner";

const CompanyDetails = () => {
  const { companyId } = useParams();
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
      companyName: "",
      companyEmail: "",
      companyContact: "",
      companyAddress: "",
      companyLogo: "",
      companyWebsite: "",
      industry: "",
      description: "",
    },
    mode: "all",
  });
  const handleFillCompanyDetails = async (data) => {
    const formdata = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "companyLogo") {
        formdata.append(key, data[key][0]);
      } else {
        formdata.append(key, data[key]);
      }
    });

    try {
      setSubmitting(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/company/update/${companyId}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(response, "RESPONSE");

      if (response.data.status) {
        toast.success(response?.data?.message);
        navigate("/admin/companies");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Something went wrong while updating company info", error);
    } finally {
      setSubmitting(false);
    }
  };
  return submitting ? (
    <Loader></Loader>
  ) : (
    <div className="h-[100vh] py-4 overflow-y-auto my-5 ">
      <h1 className="md:text-4xl  font-bold text-center">
        {" "}
        Fill Company Details{" "}
      </h1>
      <div className="formContainer max-w-3xl mx-auto border py-4 px-6  rounded-lg my-4">
        <form
          role="form"
          data-testid="company-details-form" 
          action=""
          className="py-2"
          onSubmit={handleSubmit(handleFillCompanyDetails)}
          encType="multipart/form-data"
        >
          <div className="">
            <Button>
              <Link to="/admin/companies" className="text-white">
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <CustomInput
            label="Company Name"
            type="text"
            name="companyName"
            errors={errors}
            placeholder="Enter Company Name"
            register={register("companyName", {
              required: {
                value: true,
                message: "company name is required",
              },
            })}
          />
          <CustomInput
            label="Company Email"
            type="email"
            name="companyEmail"
            errors={errors}
            placeholder="Enter Company Comercial Email"
            register={register("companyEmail", {
              required: {
                value: true,
                message: "company email is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "enter a valid email",
              },
            })}
          />
          <CustomInput
            label="Company Contact Number"
            type="text"
            name="companyContact"
            errors={errors}
            placeholder="Enter Company Contact ( +91 0000000000 )"
            register={register("companyContact", {
              required: {
                value: true,
                message: "company contact required",
              },
            })}
          />
          <CustomInput
            label="Company Address"
            type="text"
            name="companyAddress"
            errors={errors}
            placeholder="Company Location eg. Pune"
            register={register("companyAddress", {
              required: {
                value: true,
                message: "company address is required",
              },
            })}
          />
          <CustomInput
            label="Company Website"
            type="text"
            name="companyWebsite"
            errors={errors}
            placeholder="Enter Company Website"
            register={register("companyWebsite", {
              required: {
                value: true,
                message: "company website is required",
              },
            })}
          />
          <CustomInput
            label="Company Description"
            type="text"
            name="description"
            errors={errors}
            placeholder="Enter Company Description"
            register={register("description", {
              required: {
                value: true,
                message: "company description is required",
              },
            })}
          />
          <CustomDropDown
            control={control}
            setValue={setValue}
            errors={errors}
            name={"industry"}
            label={"Indistry"}
            register={register("industry", {
              required: {
                value: true,
                message: "company industry required",
              },
            })}
            placeholder={"Select Company Industry"}
            dropDownOptions={[
              { id: 1, label: "IT", value: "it" },
              { id: 2, label: "Finance", value: "finance" },
              { id: 3, label: "Pharmasuticals", value: "pharmasuticals" },
              { id: 4, label: "Energy", value: "energy" },
            ]}
          />
          <CustomFileInput
            errors={errors}
            name={"companyLogo"}
            label={"upload company logo "}
            register={register("companyLogo", {
              required: {
                value: true,
                message: "company logo is required",
              },
            })}
          />
          <div className="formButtons  lg:px-[150px] my-10 flex  flex-col">
            <Button>
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {submitting ? "please wait ..." : "Register"}
            </Button>
            <div className="flex px-4 my-4 text-[10px] justify-center ">
              <p className="text-gray-500 ">
                already registered ? <span className="text-white"> as</span>{" "}
              </p>
              <Link to="/admin/companies" className="text-blue-500 ">
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

export default CompanyDetails;
