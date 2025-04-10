import { Badge } from "@/components/ui/badge";
import React from "react";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`jobs/${job._id}`)}
      className=" max-h-[350px] overflow-y-hidden p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
    >
      <div className="flex items-center py-4">
        <div className="w-10 h-10 flex justify-center items-center">
          <img src={job.company.companyLogo} alt="" />
        </div>
        <h1 className="font-medium md:text-lg  text-sm px-5">
          {job?.company?.companyName || "company name"}
        </h1>
      </div>
      <p className="text-sm text-gray-500 px-1">{job?.company?.companyAddress}</p>
      <div>
        <h1 className="font-bold md:text-lg my-2 text-sm">
          {job?.title || "job title"}
        </h1>
        <p className="md:text-sm text-gray-600 text-[12px] line-clamp-6">
          {job?.description || "job descriprtion"}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4  ">
        <Badge
          className={"text-blue-700 font-bold  md:text-[10px] text-[8px]"}
          variant="ghost"
        >
          {job?.position || "position"} Positions
        </Badge>
        <Badge
          className={"text-[#F83002] font-bold md:text-[10px] text-[8px]"}
          variant="ghost"
        >
          {job?.jobType || "type"}
        </Badge>
        <Badge
          className={"text-[#7209b7] font-bold md:text-[10px] text-[8px]"}
          variant="ghost"
        >
          {job?.salary || "salary"}LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
