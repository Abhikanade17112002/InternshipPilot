
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUserInfo } from "@/store/userSlice/userSlice";
import { toast } from "sonner";
import { socketcontext } from "@/context/socketConext";

const UserAppliedTable = ({ searchTerm = "", sortBy = "date" }) => {
  const [allAppliedJobs, setAllAppliedJobs] = useState([]);
  const userId = useSelector(getUserInfo)?._id;
  const { socket } = useContext(socketcontext);

  const handleFetchAllUserApplications = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/application/get`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data.status) {
        setAllAppliedJobs((prevJobs) =>
          JSON.stringify(prevJobs) !== JSON.stringify(data.application)
            ? data.application
            : prevJobs
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user applications:", error);
      toast.error("Failed to fetch applied jobs.");
    }
  };

  useEffect(() => {
    handleFetchAllUserApplications();
  }, []);

  useEffect(() => {
    const handleUpdate = (data) => {
      setAllAppliedJobs((prevState) =>
        prevState.map((application) =>
          application._id === data.applicationId
            ? { ...application, status: data.status }
            : application
        )
      );
    };

    if (socket) {
      socket.on("updated-application-status", handleUpdate);
      return () => socket.off("updated-application-status", handleUpdate);
    }
  }, [socket]);

  // 🔍 Filter and sort logic
  const filteredAndSortedJobs = useMemo(() => {
    let filtered = allAppliedJobs.filter((job) => {
      const jobTitle = job.job?.title?.toLowerCase() || "";
      const companyName = job.job?.company?.companyName?.toLowerCase() || "";
      return (
        jobTitle.includes(searchTerm.toLowerCase()) ||
        companyName.includes(searchTerm.toLowerCase())
      );
    });

    switch (sortBy) {
      case "company":
        filtered.sort((a, b) =>
          (a.job?.company?.companyName || "").localeCompare(
            b.job?.company?.companyName || ""
          )
        );
        break;
      case "title":
        filtered.sort((a, b) =>
          (a.job?.title || "").localeCompare(b.job?.title || "")
        );
        break;
      case "date":
      default:
        filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
    }

    return filtered;
  }, [allAppliedJobs, searchTerm, sortBy]);

  return (
    <div>
      <Table className="text-[8px] sm:text-sm">
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedJobs?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No matching jobs found.
              </TableCell>
            </TableRow>
          ) : (
            filteredAndSortedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company?.companyName}</TableCell>
                <TableCell className="flex justify-center items-center">
                  <div
                    className={`px-2 py-1 font-bold rounded-xl text-white ${
                      appliedJob.status === "accepted"
                        ? "bg-green-500"
                        : appliedJob.status === "pending"
                        ? "bg-gray-500"
                        : "bg-red-400"
                    }`}
                  >
                    {appliedJob.status}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserAppliedTable;
