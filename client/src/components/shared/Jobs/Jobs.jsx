import React, { useState } from "react";
import JobsCard from "./JobsCard";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { getAllJobs } from "@/store/jobSlice/jobSlice";

const Jobs = () => {
  const allJobs = useSelector(getAllJobs);
  const [query, setQuery] = useState("");
  const filtersArray = [
    {
      id: 1,
      label: "Location",
      value: ["Pune", "Mumbai", "Delhi", "Banglore", "Hydrabad"],
    },
    {
      id: 2,
      label: "Industry",
      value: ["FrontEnd Developer", "BackEnd Developer", "FullStack Developer"],
    },
    {
      id: 4,
      label: "Job Type",
      value: ["Full Time", "Part Time", "Intern"],
    },
    {
      id: 5,
      label: "Salary",
      value: ["0-5LPA", "5LPA-10LPA", "10LPA-20LPA"],
    },
  ];

  return (
    <div className="h-[100vh] flex  "  data-testid="jobs-component">
      <div className="sidebar w-[25%] max-w-[250px]  overflow-y-auto my-4  py-4 hidden sm:block">
        <Sidebar
          filtersarray={filtersArray}
          query={query}
          setQuery={setQuery}
        ></Sidebar>
      </div>
      <div className="jobscontainer flex-1 overflow-y-auto   px-4 py-4 grid md:grid-cols-3  gap-5 my-4">
        {allJobs && allJobs.length === 0 ? (
          
            <div>No Jobs Available</div>
          
        ):(
          allJobs
            .filter(
              (job) =>
                job.title.toLowerCase().includes(query.toLowerCase()) ||
                job.location.toLowerCase().includes(query.toLowerCase()) ||
                job.jobType.toLowerCase().includes(query.toLowerCase())
            )
            .map((job, index) => (
              <div className="" key={index}>
                <JobsCard key={index} job={job} />
              </div>
            ))
        )  }
      </div>
    </div>
  );
};

export default Jobs;
