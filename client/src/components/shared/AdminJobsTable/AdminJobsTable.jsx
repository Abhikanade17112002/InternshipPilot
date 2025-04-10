// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import { toast } from "sonner";
// import { Edit2, Eye, MoreHorizontal } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import axios from "axios";

// const AdminJobsTable = ({ searchParam }) => {
//   const [adminJobs, setAdminJobs] = useState([]);

//   const navigate = useNavigate();

//   const handleGetAdminCreatedJobs = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/job/admin", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });

//       if (response.data.status) {
//         setAdminJobs(response.data.jobs);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log("Something went wrong in fetching all user jobs", error);
//     }
//   };

//   useEffect(() => {
//     handleGetAdminCreatedJobs();
//   }, []);

//   return (
//     <div className=" mx-auto ">
//       <Table variant="outline" className=" table text-[10px] sm:text-sm">
//         <TableCaption>A list of your recent posted Jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="text-center">Company</TableHead>
//             <TableHead className="text-center">Title</TableHead>
//             <TableHead className="text-center">Description</TableHead>
//             <TableHead className="text-center">Job Type</TableHead>
//             <TableHead className="text-center">Positions</TableHead>
//             <TableHead className="text-center">location</TableHead>
//             <TableHead className="text-center">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {adminJobs
//             .filter((job) =>
//               job.title.toLowerCase().includes(searchParam.toLowerCase())
//             )
//             .map((job) => (
//               <tr className=" ">
//                 <TableCell className="h-full flex justify-center items-center ">
//                   <Avatar className="h-full">
//                     <AvatarImage src={job?.company?.companyLogo} />
//                   </Avatar>
//                 </TableCell>
//                 <TableCell className="text-center ">{job?.title}</TableCell>
//                 <TableCell className="text-left  ">{job.description}</TableCell>
//                 <TableCell className="text-center">{job.jobType}</TableCell>
//                 <TableCell className="text-center">{job.position}</TableCell>
//                 <TableCell className="text-center">{job.location}</TableCell>
//                 <TableCell className="text-right cursor-pointer flex justify-center">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-15 h-15">
//                       <div
//                         onClick={() =>
//                           navigate(`/admin/job/${job?._id}/applications`)
//                         }
//                         className="flex items-center gap-2 cursor-pointer my-2"
//                       >
//                         <Eye className="w-4" />
//                         <span className="text-sm">Applications</span>
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </tr>
//             ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AdminJobsTable;



// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { toast } from "sonner";
// import { Edit2, Eye, MoreHorizontal } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import axios from "axios";

// const AdminJobsTable = ({ searchParam }) => {
//   const [adminJobs, setAdminJobs] = useState([]);
//   const navigate = useNavigate();

//   const handleGetAdminCreatedJobs = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/job/admin", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });

//       if (response.data.status) {
//         setAdminJobs(response.data.jobs);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log("Something went wrong in fetching all user jobs", error);
//     }
//   };

//   useEffect(() => {
//     handleGetAdminCreatedJobs();
//   }, []);

//   return (
//     <div className="mx-auto w-full sm:w-11/12 md:w-10/12 lg:w-full p-4">
//       <div className="overflow-x-auto">
//         <Table className="min-w-full table-auto border-separate border-spacing-y-2">
//           <TableCaption className="text-sm text-gray-600">
//             A list of your recent posted Jobs
//           </TableCaption>
//           <TableHeader>
//             <TableRow className="bg-gray-100">
//               <TableHead className="text-center p-3">Company</TableHead>
//               <TableHead className="text-center p-3">Title</TableHead>
//               <TableHead className="text-center p-3 hidden sm:table-cell">
//                 Description
//               </TableHead>
//               <TableHead className="text-center p-3">Job Type</TableHead>
//               <TableHead className="text-center p-3 hidden sm:table-cell">
//                 Positions
//               </TableHead>
//               <TableHead className="text-center p-3">Location</TableHead>
//               <TableHead className="text-center p-3">Action</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {adminJobs
//               .filter((job) =>
//                 job.title.toLowerCase().includes(searchParam.toLowerCase())
//               )
//               .map((job) => (
//                 <TableRow
//                   key={job?._id}
//                   className="hover:bg-gray-50 transition duration-200 ease-in-out"
//                 >
//                   <TableCell className="text-center p-3">
//                     <Avatar className="mx-auto">
//                       <AvatarImage src={job?.company?.companyLogo} />
//                     </Avatar>
//                   </TableCell>
//                   <TableCell className="text-center p-3 font-medium text-gray-800">
//                     {job?.title}
//                   </TableCell>
//                   <TableCell className="text-left p-3 hidden sm:table-cell text-gray-600">
//                     {job?.description}
//                   </TableCell>
//                   <TableCell className="text-center p-3 text-gray-800">
//                     {job?.jobType}
//                   </TableCell>
//                   <TableCell className="text-center p-3 hidden sm:table-cell text-gray-800">
//                     {job?.position}
//                   </TableCell>
//                   <TableCell className="text-center p-3 text-gray-800">
//                     {job?.location}
//                   </TableCell>
//                   <TableCell className="text-center p-3">
//                     <Popover>
//                       <PopoverTrigger>
//                         <MoreHorizontal className="cursor-pointer hover:text-gray-700 transition-colors" />
//                       </PopoverTrigger>
//                       <PopoverContent className="p-2 bg-white border rounded shadow-lg">
//                         <div
//                           onClick={() =>
//                             navigate(`/admin/job/${job?._id}/applications`)
//                           }
//                           className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
//                         >
//                           <Eye className="w-4" />
//                           <span className="text-sm">Applications</span>
//                         </div>
//                       </PopoverContent>
//                     </Popover>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default AdminJobsTable;



import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

const AdminJobsTable = ({ searchParam }) => {
  const [adminJobs, setAdminJobs] = useState([]);
  const navigate = useNavigate();

  const handleGetAdminCreatedJobs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/job/admin`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.status) {
        setAdminJobs(response.data.jobs);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Something went wrong in fetching all user jobs", error);
    }
  };

  useEffect(() => {
    handleGetAdminCreatedJobs();
  }, []);

  return (
    <div className="mx-auto w-full sm:w-11/12 md:w-10/12 lg:w-full p-6 bg-white shadow-lg rounded-lg">
      <div className="overflow-x-auto">
        <Table className="min-w-full table-auto border-separate border-spacing-y-3">
          <TableCaption className="text-sm text-gray-500">
            A list of your recently posted Jobs
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-700">
              <TableHead className="text-center p-4">Company</TableHead>
              <TableHead className="text-center p-4">Title</TableHead>
              <TableHead className="text-center p-4 hidden sm:table-cell">
                Description
              </TableHead>
              <TableHead className="text-center p-4">Job Type</TableHead>
              <TableHead className="text-center p-4 hidden sm:table-cell">
                Positions
              </TableHead>
              <TableHead className="text-center p-4">Location</TableHead>
              <TableHead className="text-center p-4">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminJobs
              .filter((job) =>
                job.title.toLowerCase().includes(searchParam.toLowerCase())
              )
              .map((job) => (
                <TableRow
                  key={job?._id}
                  className="hover:bg-gray-50 transition duration-200 ease-in-out"
                >
                  <TableCell className="text-center p-4">
                    <Avatar className="mx-auto h-10 w-10 border border-gray-300 shadow-sm">
                      <AvatarImage src={job?.company?.companyLogo} />
                    </Avatar>
                  </TableCell>
                  <TableCell className="text-center p-4 font-medium text-gray-800">
                    {job?.title}
                  </TableCell>
                  <TableCell className="text-left p-4 hidden sm:table-cell text-gray-600 truncate max-w-xs">
                    {job?.description}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-800">
                    {job?.jobType}
                  </TableCell>
                  <TableCell className="text-center p-4 hidden sm:table-cell text-gray-800">
                    {job?.position}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-800">
                    {job?.location}
                  </TableCell>
                  <TableCell className="text-center p-4">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer hover:text-gray-700 transition-colors" />
                      </PopoverTrigger>
                      <PopoverContent className="p-3 bg-white border rounded shadow-lg">
                        <div
                          onClick={() =>
                            navigate(`/admin/job/${job?._id}/applications`)
                          }
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-3 rounded"
                        >
                          <Eye className="w-5 text-blue-600" />
                          <span className="text-sm font-medium">View Applications</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsTable;