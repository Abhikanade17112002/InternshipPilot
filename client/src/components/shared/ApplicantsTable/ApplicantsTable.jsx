
import React, { useEffect, useState, useContext, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { socketcontext } from "@/context/socketConext";
import { Loader2 } from "lucide-react";

const ApplicantsTable = () => {
  const [applicants, setApplicants] = useState([]);
  const [jobInfo, setJobInfo] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [showATSScores, setShowATSScores] = useState(false);
  const [atsScores, setAtsScores] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [isLoading, setIsLoading] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const { jobId } = useParams();
  const { socket } = useContext(socketcontext);

  const fetchJobApplicants = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/application/job/${jobId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.status) {
        const job = response.data.job;
        setApplicants(job.applications);
        setJobInfo(job);
        setCompanyInfo(job.company);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching applicants:", error);
      toast.error("Failed to load applicants. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateApplicationStatus = async (status, applicationId, applicant) => {
    setUpdatingStatus(applicationId);
    try {
      if (socket) {
        socket.emit("update-appilcation-status", {
          socketId: socket.id,
          status,
          applicantId: applicant._id,
          applicationId,
          emailId: applicant.email,
          jobTitle: jobInfo?.title,
          companyName: companyInfo?.companyName,
          companyEmail: companyInfo?.companyEmail,
          name: `${applicant.firstName} ${applicant.lastName}`,
        });
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/application/status/${applicationId}/update`,
        { status },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      response.data.status
        ? toast.success(response.data.message)
        : toast.error(response.data.message);
        
      // Refresh applicants to show updated status
      fetchJobApplicants();
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const fetchATSScores = async () => {
    if (!jobInfo?.description) {
      toast.error("Job description not available");
      return;
    }

    setIsEvaluating(true);
    const requestBody = {
      job_description: jobInfo?.description,
      resumes: applicants.map((application) => ({
        user_id: application?.applicant?._id,
        resume_url: application?.applicant?.profile?.resume,
      })),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/features/test3`,
        requestBody,
        {
          headers: {
            "Content-Type":  "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {

        console.log(response.data);
        
        setAtsScores(response.data.response); // Expected to be an array with user_id and ats_score
        setShowATSScores(true);
        toast.success("ATS scores evaluated successfully");
      }
    } catch (error) {
      toast.error("Failed to evaluate ATS scores");
      console.error(error);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Combine ATS scores into applicants
  const enrichedApplicants = applicants.map((app) => {
    const match = atsScores.find((score) => score.user_id === app.applicant?._id);
    return {
      ...app,
      ats_score: match?.ats_score || null,
    };
  });

  // Generic sorting logic using sortConfig
  const sortedApplicants = useMemo(() => {
    const sorted = [...enrichedApplicants];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        let aValue, bValue;

        switch (sortConfig.key) {
          case "name":
            aValue = a.applicant?.firstName || "";
            bValue = b.applicant?.firstName || "";
            break;
          case "skills":
            aValue = Array.isArray(a.applicant?.profile?.skills)
              ? a.applicant.profile.skills.join(", ")
              : "";
            bValue = Array.isArray(b.applicant?.profile?.skills)
              ? b.applicant.profile.skills.join(", ")
              : "";
            break;
          case "bio":
            aValue = a.applicant?.profile?.bio || "";
            bValue = b.applicant?.profile?.bio || "";
            break;
          case "resume":
            aValue = a.applicant?.profile?.resume || "";
            bValue = b.applicant?.profile?.resume || "";
            break;
          case "email":
            aValue = a.applicant?.email || "";
            bValue = b.applicant?.email || "";
            break;
          case "ats_score":
            aValue = a.ats_score || 0;
            bValue = b.ats_score || 0;
            break;
          default:
            aValue = "";
            bValue = "";
        }

        // Numeric sort for ats_score; string comparison otherwise:
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
        } else {
          aValue = aValue.toString().toLowerCase();
          bValue = bValue.toString().toLowerCase();
          if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        }
      });
    }
    return sorted;
  }, [enrichedApplicants, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // Toggle direction if already sorting by this key
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  useEffect(() => {
    fetchJobApplicants();
  }, []);

  const CircularProgress = ({ value }) => {
    const percentage = Number(value.toFixed(2));
    const strokeColor = 
    percentage >= 80 ? "#16a34a" :     // dark green
    percentage >= 60 ? "#86efac" :     // light green
    percentage >= 40 ? "#facc15" :     // yellow
    percentage >= 20 ? "#f97316" :     // orange
    "#ef4444"; 
  
    return (
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="w-full h-full">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="#e5e7eb"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke={strokeColor}
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${(percentage / 100) * 176}, 176`}
            transform="rotate(-90 32 32)"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-[10px] font-bold text-center">
          {percentage}%
        </div>
      </div>
    );
  };
  
  // Helper to render sortable header cell
  const renderSortableHeader = (label, key) => {
    return (
      <TableHead
        className="text-center cursor-pointer select-none font-semibold px-4 py-3"
        onClick={() => handleSort(key)}
      >
        <div className="flex items-center justify-center gap-1">
          {label}
          {sortConfig.key === key ? (
            <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
          ) : (
            <span className="ml-1 text-gray-300">↕</span>
          )}
        </div>
      </TableHead>
    );
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
              Applicants for {jobInfo?.title || "Your Job Post"}
            </h2>
            
            <Button 
              onClick={fetchATSScores} 
              disabled={isEvaluating || isLoading}
              className="w-full md:w-auto"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Evaluating...
                </>
              ) : (
                "Evaluate Applicants"
              )}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 flex justify-center items-center">
            <div className="text-center">
              <Loader2 className="h-10 w-10 animate-spin mx-auto text-blue-500" />
              <p className="mt-4 text-gray-500">Loading applicants...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-auto">
            <Table className="min-w-full">
              <TableCaption className="mt-4 px-4 pb-6 text-sm text-muted-foreground">
                {applicants.length === 0 
                  ? "No applications received yet" 
                  : `Showing ${applicants.length} received application${applicants.length !== 1 ? 's' : ''}`}
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <TableHead className="text-center py-3 px-4 font-semibold">Profile</TableHead>
                  {renderSortableHeader("Name", "name")}
                  {renderSortableHeader("Skills", "skills")}
                  {renderSortableHeader("Bio", "bio")}
                  {renderSortableHeader("Resume", "resume")}
                  {renderSortableHeader("Email", "email")}
                  {showATSScores && renderSortableHeader("ATS Score", "ats_score")}
                  <TableHead className="text-center py-3 px-4 font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sortedApplicants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={showATSScores ? 8 : 7} className="h-32 text-center text-gray-500">
                      No applicants found for this job posting
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedApplicants.map((app, idx) => (
                    <TableRow 
                      key={idx} 
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <TableCell className="py-4 px-4 text-center">
                        <Avatar className="h-12 w-12 mx-auto border-2 border-gray-200">
                          <AvatarImage src={app.applicant?.profile?.profilePhoto} />
                        </Avatar>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center font-medium">
                        {app.applicant?.firstName} {app.applicant?.lastName}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center max-w-[200px]">
                        <div className="flex flex-wrap justify-center gap-1 overflow-auto max-h-24">
                          {Array.isArray(app.applicant?.profile?.skills) &&
                            app.applicant.profile.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded dark:bg-blue-900 dark:text-blue-300 mb-1"
                              >
                                {skill}
                              </span>
                            ))}
                          {(!app.applicant?.profile?.skills || app.applicant.profile.skills.length === 0) && 
                            <span className="text-gray-500 italic">No skills listed</span>
                          }
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        <div className="max-w-[200px] max-h-24 overflow-auto">
                          {app.applicant?.profile?.bio || <span className="text-gray-500 italic">No bio provided</span>}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        {app.applicant?.profile?.resume ? (
                          <a
                            href={app.applicant?.profile?.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-1.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-medium text-[10px] transition-colors"
                          >
                            View Resume
                          </a>
                        ) : (
                          <span className="text-gray-500 italic">No resume</span>
                        )}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center break-all">
                        {app.applicant?.email || <span className="text-gray-500 italic">No email</span>}
                      </TableCell>
                      {showATSScores && (
                        <TableCell className="py-4 px-4 text-center">
                          <div className="flex justify-center">
                            {app.ats_score !== null ? (
                              <CircularProgress value={app.ats_score} />
                            ) : (
                              <span className="text-gray-500 italic">N/A</span>
                            )}
                          </div>
                        </TableCell>
                      )}
                      <TableCell className="py-4 px-4 text-center">
                        <div className="flex justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="relative min-w-[100px]"
                                disabled={updatingStatus === app._id}
                              >
                                {updatingStatus === app._id ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                  </>
                                ) : (
                                  <>
                                    <span className={`
                                      inline-block w-2 h-2 rounded-full mr-2
                                      ${app.status === 'accepted' ? 'bg-green-500' : 
                                        app.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}
                                    `}></span>
                                    {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : 'Status'}
                                  </>
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-40">
                              <DropdownMenuSeparator />
                              <DropdownMenuRadioGroup value={app.status || "pending"}>
                                {[
                                  { value: "accepted", label: "Accepted", color: "bg-green-500" },
                                  { value: "pending", label: "Pending", color: "bg-yellow-500" },
                                  { value: "rejected", label: "Rejected", color: "bg-red-500" }
                                ].map((status) => (
                                  <DropdownMenuRadioItem
                                    key={status.value}
                                    value={status.value}
                                    className="flex items-center cursor-pointer py-2"
                                    onClick={() =>
                                      updateApplicationStatus(
                                        status.value,
                                        app._id,
                                        app.applicant
                                      )
                                    }
                                  >
                                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${status.color}`}></span>
                                    {status.label}
                                  </DropdownMenuRadioItem>
                                ))}
                              </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsTable;