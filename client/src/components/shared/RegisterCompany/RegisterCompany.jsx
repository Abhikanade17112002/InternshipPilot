import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();

  const handleRegisterCompany = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/company/register`,
        {
          companyName: companyName,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response, "RESPONSE FROM REGIATRATION");

      if (response.data.status) {
        toast.success(response.data.message);
        const newCompanyId = response?.data?.company?._id;
        navigate(`/admin/company/${newCompanyId}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Something Went Wrong While Register Company", error);
    }
  };
  return (
    <div className="min-h-[100vh]">
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-5xl">Welcome !</h1>
          <h1 className="font-bold text-muted-foreground py-4">
            You Can Register Youre Company Below 😀
          </h1>
          <p className="text-sm text-gray-500">
            Please Enter Youre Company Name .{" "}
            <span>You Can Edit This Later</span>
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="Google , Meta , Microsoft  etc..."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={handleRegisterCompany}>Register</Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompany;
