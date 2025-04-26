// import { Avatar } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { AvatarImage } from "@radix-ui/react-avatar";
// import { Bookmark } from "lucide-react";
// import React from "react";
// import { Link } from "react-router-dom";

// const JobsCard = ({ job }) => {
//   return (
//     <Link to={`/jobs/${job._id}`}>
//       <div className="min-h-[300px]  w-full hover:shadow-gray-600 border border-gray-100 shadow-lg px-3 py-6 shadow-gray-400 rounded-lg  text-sm flex flex-col justify-evenly">
//         <div className="flex justify-between">
//           <h6>2 days ago ..</h6>
//           <Button
//             variant="outlined"
//             className="border rounded-full p-0"
//             size="icon"
//           >
//             <Bookmark />
//           </Button>
//         </div>
//         <div className="flex ">
//           <Button variant="outlined flex">
//             <Avatar>
//               <AvatarImage src={job.company.companyLogo} className="bg-white" />
//             </Avatar>
//           </Button>
//           <div className=" font-bold">
//             <h5 className="text-md">{job.company.name}</h5>
//             <h6 className="text-[10px] text-gray-500">Country</h6>
//           </div>
//         </div>
//         <div className="my-2 py-2 ">
//           <h2 className="font-semibold">{job.title}</h2>
//           <p className="text-muted-foreground">{job.description}</p>
//         </div>
//         <div className="flex items-center gap-2 mt-4">
//           <Badge className={"text-blue-700 font-bold"} variant="ghost">
//             {job.position} Positions
//           </Badge>
//           <Badge className={"text-[#F83002] font-bold"} variant="ghost">
//             {job.jobType}
//           </Badge>
//           <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
//             {job.salary} LPA
//           </Badge>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default JobsCard;



// import { Avatar } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { AvatarImage } from "@radix-ui/react-avatar";
// import { Bookmark } from "lucide-react";
// import React from "react";
// import { Link } from "react-router-dom";
// import daysAgo from "@/utils/daysAgo";

// const JobsCard = ({ job }) => {
//   return (
//     <Link to={`/jobs/${job._id}`}>
//       <div className="min-h-[300px] w-full hover:shadow-gray-600 border border-gray-200 shadow-lg px-4 py-6 rounded-lg flex flex-col justify-evenly">
//         {/* Job Posting Date & Bookmark Button */}
//         <div className="flex justify-between items-center">
//           <span className="text-gray-500 text-xs">{daysAgo(job.createdAt)} ago</span>
//           <Button variant="outline" className="border rounded-full p-2" size="icon">
//             <Bookmark className="w-4 h-4" />
//           </Button>
//         </div>

//         {/* Company Info */}
//         <div className="flex items-center gap-3 mt-2">
//           <Avatar>
//             <AvatarImage src={job.company.companyLogo || "/default-logo.png"} alt="Company Logo" />
//           </Avatar>
//           <div className="font-bold">
//             <h5 className="text-md">{job.company.name || "Unknown Company"}</h5>
//             <h6 className="text-[12px] text-gray-500">{job.company.country || "Not specified"}</h6>
//           </div>
//         </div>

//         {/* Job Title & Description */}
//         <div className="my-3">
//           <h2 className="font-semibold text-lg">{job.title}</h2>
//           <p className="text-sm text-gray-600 line-clamp-2">{job.description || "No description available."}</p>
//         </div>

//         {/* Job Details */}
//         <div className="flex items-center gap-2 mt-4 flex-wrap">
//           <Badge className="text-blue-700 font-bold bg-blue-100">{job.position} Positions</Badge>
//           <Badge className="text-red-700 font-bold bg-red-100">{job.jobType}</Badge>
//           <Badge className="text-purple-700 font-bold bg-purple-100">{job.salary} LPA</Badge>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default JobsCard;



// import { Avatar } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { AvatarImage } from "@radix-ui/react-avatar";
// import { Bookmark } from "lucide-react";
// import React from "react";
// import { Link } from "react-router-dom";
// import daysAgo from "@/utils/daysAgo";

// const JobsCard = ({ job }) => {
//   return (
//     <Link to={`/jobs/${job._id}`} className="h-full">
//       <div className="h-full w-full border border-gray-200 shadow-lg px-4 py-6 rounded-lg flex flex-col">
//         {/* Job Posting Date & Bookmark Button */}
//         <div className="flex justify-between items-center">
//           <span className="text-gray-500 text-xs">{daysAgo(job.createdAt)} ago</span>
//           <Button variant="outline" className="border rounded-full p-2" size="icon">
//             <Bookmark className="w-4 h-4" />
//           </Button>
//         </div>

//         {/* Company Info */}
//         <div className="flex items-center gap-3 mt-2">
//           <Avatar>
//             <AvatarImage src={job.company.companyLogo || "/default-logo.png"} alt="Company Logo" />
//           </Avatar>
//           <div className="font-bold">
//             <h5 className="text-md">{job.company.name || "Unknown Company"}</h5>
//             <h6 className="text-[12px] text-gray-500">{job.company.country || "Not specified"}</h6>
//           </div>
//         </div>

//         {/* Job Title & Description */}
//         <div className="my-3 flex-grow">
//           <h2 className="font-semibold text-lg">{job.title}</h2>
//           <p className="text-sm text-gray-600 line-clamp-2">{job.description || "No description available."}</p>
//         </div>

//         {/* Job Details */}
//         <div className="flex items-center gap-2 mt-auto flex-wrap">
//           <Badge className="text-blue-700 font-bold bg-blue-100">{job.position} Positions</Badge>
//           <Badge className="text-red-700 font-bold bg-red-100">{job.jobType}</Badge>
//           <Badge className="text-purple-700 font-bold bg-purple-100">{job.salary} LPA</Badge>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default JobsCard;



import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import daysAgo from "@/utils/daysAgo";

const JobsCard = ({ job }) => {
  return (
    <Link to={`/jobs/${job._id}`} className=" w-full ">
      <div className="  w-full border border-gray-200 shadow-md hover:shadow-lg rounded-lg p-6 flex flex-col transition-all duration-300 bg-white">
        
        {/* Job Posting Date & Bookmark Button */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-500 text-sm">{daysAgo(job?.createdAt)} </span>
          <Button variant="outline" className="border rounded-full p-2 hover:bg-gray-100" size="icon">
            <Bookmark className="w-4 h-4 text-gray-600" />
          </Button>
        </div>

        {/* Company Info */}
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={job?.company?.companyLogo || "/default-logo.png"} alt="Company Logo" />
          </Avatar>
          <div>
            <h5 className="text-lg font-semibold">{job?.company?.companyName || "Unknown Company"}</h5>
            <h6 className="text-sm text-gray-500">{job?.company?.companyAddress || "Location not specified"}</h6>
          </div>
        </div>

        {/* Job Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3">{job?.title}</h2>

        {/* Full Job Description */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-6">
          {job.description || "No detailed description available for this job."}
        </p>

        {/* Job Details */}
        <div className="grid grid-cols-3 gap-2 mt-auto">
          <Badge className="bg-blue-100 text-blue-700 font-medium text-center flex justify-center" >{job.position} Positions</Badge>
          <Badge className="bg-red-100 text-red-700 font-medium text-center flex justify-center">{job.jobType}</Badge>
          <Badge className="bg-purple-100 text-purple-700 font-medium text-center flex justify-center">{job.salary} LPA</Badge>
        </div>
      </div>
    </Link>
  );
};

export default JobsCard;
