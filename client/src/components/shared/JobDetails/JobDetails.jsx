import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/store/userSlice/userSlice";
import daysAgo from "@/utils/daysAgo";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import EvaluateResultDialogBox from "../EvaluateDialogBox/EvaluateResultDialogBox";
import { toast } from "sonner";

const JobDetails = () => {
    const [showATSScores, setShowATSScores] = useState(false);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApplicantApplied, setHasApplicantApplied] = useState(null);
  const [evaluatingResume , setEvaluatingResume] = useState(false) ;
  const [ result , setResult ] = useState(null) ;
  const [ isEvaluationResultAvailable , setIsEvaluationResultAvailable] = useState(false);
  const userInfo = useSelector(getUserInfo);
  const { id: jobId } = useParams();
  const [ isApplying,setIsApplying] = useState(false);
  const [atsScores, setAtsScores] = useState([]);

  

  const fetchSingleJobById = async (jobId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/job/get/${jobId}`,
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      setJob(response.data.job);
      return response.data.job;
    } catch (error) {
      console.error("Error While Fetching A Single Job By Id", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToJob = async (userId, jobId) => {
    // Early validation
    if (!userId) {
      toast.error("Please log in to apply for this job");
      return;
    }
  
    if (!jobId) {
      toast.error("Job information is missing");
      return;
    }
  
   // You'll need to define this state in your component
  
    try {
      setIsApplying(true);
      // Send application to the backend
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/application/apply/${jobId}`,
        {userId},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Important for sending cookies/auth tokens
        }
      );
  
      // Handle successful response
      if (response.data.status) {
        toast.success(response.data.message || "Successfully applied to this job!");
        
        // Update local state to show user has applied
        setHasApplicantApplied(true);
        
        // Optional: You could refresh job details or application count
        // await refreshJobDetails();
      } else {
        // Backend returned status: false with an error message
        toast.error(response.data.message || "Failed to apply for this job");
      }
    } catch (error) {
      console.error("Error applying to job:", error);
      
      // Check for specific error responses
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("Job not found or no longer available");
        } else {
          toast.error(
            error.response.data?.message || "Failed to apply. Please try again later."
          );
        }
      } else {
        toast.error("Network error. Please check your connection and try again.");
      }
     } finally {
      // Reset loading state
      setIsApplying(false);
    }
  };

  const evaluateUserResume = async (userId,resumeUrl,jobDescription) =>{

    try {
      setEvaluatingResume(true);

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/features/evaluate`,{"resumes":[{"user_id":userId , "url":resumeUrl}] , "job_description":jobDescription}
        ,
        {
          headers: {
            "Content-Type":  "application/json",
          },
          withCredentials: true,
        })
        const requestBody = {
          job_description: jobDescription,
          resumes: [{
            "resume_url":resumeUrl ,
            "user_id":userId
          }
          ]
        }
        const response2 = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/features/atsscore`,
          requestBody,
          {
            headers: {
              "Content-Type":  "application/json",
            },
            withCredentials: true,
          }
        );
        

        if (response2.status === 200) {
                setAtsScores(response2.data.response[0].ats_score); // Expected to be an array with user_id and ats_score
                setShowATSScores(true);
               
          }

          console.log(response2.data.response[0],"RESPONSE");
          

       


       
        
        
      setResult(response.data.data)
      console.log(response,"THIS IS A RESPONSE FROM JD");
      setIsEvaluationResultAvailable(true)
      setEvaluatingResume(false) ;

      
    } catch (error) {

      console.log("SOMETHING WENT WRONG WHEN EVALUATING USER RESUME :: CLIENT SIDE",error);
      setEvaluatingResume(false) ;
      
      
    }

  }





  useEffect(() => {
    if (!jobId) return;
    fetchSingleJobById(jobId).then((response) => {
      if (userInfo) {
        setHasApplicantApplied(
          response?.applications?.some((applicant) => applicant.applicant === userInfo?._id)
        );
      }
    });
  }, [jobId, userInfo]);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full h-[100vh] mx-auto py-16 px-20 bg-white rounded-lg shadow-lg overflow-y-hidden">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{job?.title}</h1>
          <p className="text-lg text-gray-600">Posted over {daysAgo(job?.createdAt)}</p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <Badge className="bg-blue-100 text-blue-700 text-sm">{job?.position} Positions</Badge>
            <Badge className="bg-red-100 text-red-600 text-sm">{job?.jobType}</Badge>
            <Badge className="bg-purple-100 text-purple-700 text-sm">{job?.salary} LPA</Badge>
          </div>
        </div>


<div className="flex flex-col min-h-full justify-between space-y-4 ">
  
  <div>
    <Button
      data-testid="apply-button"
      onClick={() => handleApplyToJob(userInfo?._id, job?._id)}
      disabled={hasApplicantApplied}
      className={`px-8 py-3 text-white text-lg font-semibold rounded-md transition-all duration-300 ${
        hasApplicantApplied
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {hasApplicantApplied ? "Applied 😀" : "Apply Now 🙂"}
    </Button>
  </div>


  <div className="">
    {
      !isEvaluationResultAvailable &&  <Button
      onClick={() => evaluateUserResume(userInfo?._id,userInfo?.profile?.resume, job?.description)}
      
      className={`px-8 py-3 w-full text-white text-lg font-semibold rounded-md transition-all duration-300 ${
        evaluatingResume
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {evaluatingResume ? "Evaluating" : "Evaluate 🙂"}
    </Button>
    }
    {
      isEvaluationResultAvailable && showATSScores && <EvaluateResultDialogBox   score={atsScores} content_score={result?.content_score} keyword_score={result?.keyword_score} missing_keywords={result?.missing_keywords} skillGapAnalysis={result?.sgAnalysis} >

      </EvaluateResultDialogBox>
    }
 
  </div>
</div>

      </div>

      <div className="border-t border-gray-300 pb-24 pt-4 overflow-y-auto h-full ">
        <h2 className="text-2xl font-semibold text-gray-900">Job Details</h2>

        <motion.div 
          className="mt-6 space-y-4 text-gray-800 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="flex items-center">
            <span className="font-semibold text-gray-900 w-36">Role:</span> 
            <span>{job?.title}</span>
          </p>

          <p className="flex items-center">
            <span className="font-semibold text-gray-900 w-36">Location:</span> 
            <span>{job?.location}</span>
          </p>

          <p className="flex items-start">
            <span className="font-semibold text-gray-900 w-36">Description:</span> 
            <span className="px-9">{job?.description}</span>
          </p>

          <p className="flex items-center">
            <span className="font-semibold text-gray-900 w-36">Experience:</span> 
            <span>{job?.experienceLevel} Years</span>
          </p>

          <p className="flex items-center">
            <span className="font-semibold text-gray-900 w-36">Salary:</span> 
            <span>{job?.salary} LPA</span>
          </p>

          <p className="flex items-center">
            <span className="font-semibold text-gray-900 w-36">Applicants:</span> 
            <span>{job?.applications?.length}</span>
          </p>

          <p className="flex items-center">
            <span className="font-semibold text-gray-900 w-36">Posted Date:</span> 
            <span>{job?.createdAt?.split("T")[0]}</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetails;
