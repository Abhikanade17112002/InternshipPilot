import React from "react";
import LatestJobCards from "./LatestJobsCards";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "@/store/jobSlice/jobSlice";
import { getUserInfo } from "@/store/userSlice/userSlice";
import { Link } from "react-router-dom";
import RecommendJobsButton from '../../ui/RecommendJobsButton';
import GetAuroraText from "../AuroraText/AuroraText";



const LatestJobs = () => {
  const allJobs = useSelector(getAllJobs);
  const userInfo = useSelector(getUserInfo);
  console.log("USER INFO FROM HERE ", userInfo);

  return (
    <div className="max-w-7xl mx-auto my-20 px-6">
     
      <div className="md:text-4xl text-xl py-6 font-bold flex items-center">
        
        <GetAuroraText first={"Latest & Top"}   second={"Internship Openings "}  size={"text-4xl"} ></GetAuroraText>
        <div className="flex items-center">
        {userInfo && userInfo?.role === "student" ? (
         
          <div className="mx-4 flex items-center">
            
              <Link to="/recommand">
              <RecommendJobsButton/>
              </Link>
             
            
          </div>
        ) : null}
        </div>
        
      </div>

      <div className="grid md:grid-cols-3 gap-4 my-5 sm:grid-cols-2">
        {allJobs ? (
          allJobs
            ?.slice(0, 6)
            .map((job, index) => <LatestJobCards key={job?._id} job={job} />)
        ) : (
          <div>No Jobs Available </div>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
