import { getAllJobs } from '@/store/jobSlice/jobSlice';
import { getUserInfo } from '@/store/userSlice/userSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import JobsCard from '../Jobs/JobsCard';
import Sidebar from "../Sidebar/Sidebar";


const Recomandations = () => {
const userInfo = useSelector(getUserInfo);
const allJobs = useSelector(getAllJobs);
const [query, setQuery] = useState("");
const [ reccomandedJobs , setReccomandedJobs ] = useState([]) ;
const modifiedUser = { "firstname":userInfo?.firstName , "lastname":userInfo?.lastName , "skills" : userInfo?.profile?.skills};
// console.log(modifiedUser,"userInfo");
// console.log(allJobs,"allJobs");
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
    value: ["0-5 LPA", "5 LPA-10 LPA", "10 LPA-20 LPA"],
  },
];

  const handlePostInfo = async () =>{


    const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/features/test`,{"userInfo":modifiedUser , "internships":allJobs},
        {
          headers: {
            "Content-Type":  "application/json",
          },
          withCredentials: true,
        })
    console.log("My Response ",response?.data?.recommendations?.recommendations);
    if( response?.data?.recommendations?.recommendations){
      setReccomandedJobs(response?.data?.recommendations?.recommendations) ;
    }
    else{
      alert("Something Wrong In The Response From ML Part ") ;
    }
    
    

  }
 useEffect(()=>{
   handlePostInfo() ;
 },[]) ;


 const filteredJobs = allJobs.filter(job =>
  reccomandedJobs.some(recommended => recommended.jobId === job._id)
);

console.log(filteredJobs,"FiltertedJObs");
  return (
    <div className="h-[100vh] flex">
    <div className="sidebar w-[25%] max-w-[250px]  overflow-y-auto my-4  py-4  sm:block">
      <Sidebar
        filtersarray={filtersArray}
        query={query}
        setQuery={setQuery}
      ></Sidebar>
    </div>
    <div className="jobscontainer flex-1 overflow-y-auto   px-4 py-4 grid md:grid-cols-3  gap-5 my-4">
      {filteredJobs ? (
        filteredJobs
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
      ) : (
        <div>No Jobs Available</div>
      )}
    </div>
  </div>
  )
}

export default Recomandations ;
