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
// import { getAdminCreatedCompaniesAction } from "@/store/companySlice/companySlice";
// import { toast } from "sonner";
// import { Edit2, MoreHorizontal } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// const CompaniesTable = ({ searchParam }) => {
//   const [companies, setCompanies] = useState([]);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAdminCreatedCompaniesAction()).then((response) => {
//       if (response.payload.status) {
//         setCompanies(response.payload.companies);
//       } else {
//         toast.error(response.payload.message);
//       }
//     });
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto">
//       <Table variant="outline" className="table text-[10px]">
//         <TableCaption>A list of your recent registered companies</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="text-center">Logo</TableHead>
//             <TableHead className="text-center">Name</TableHead>
//             <TableHead className="text-center">Website</TableHead>
//             <TableHead className="text-center">Email</TableHead>
//             <TableHead className="text-center">Contact</TableHead>
//             <TableHead className="text-center">Registered At</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {companies
//             .filter((company) =>
//               company.companyName
//                 .toLowerCase()
//                 .includes(searchParam.toLowerCase())
//             )
//             .map((company,index) => (
//               <tr key={index}>
//                 <TableCell className="text-center">
//                   <Avatar>
//                     <AvatarImage src={company?.companyLogo} />
//                   </Avatar>
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {company.companyName}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   <a
//                     href={company?.companyWebsite}
//                     className="text-blue-700"
//                     target="blank"
//                   >
//                     {company.companyWebsite}
//                   </a>
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {company.companyEmail}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {company.companyContact}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {company.createdAt.split("T")[0]}
//                 </TableCell>
//                 <TableCell className="text-right cursor-pointer">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-15 h-15">
//                       <div
//                         onClick={() =>
//                           navigate(`/admin/company/${company._id}`)
//                         }
//                         className="flex items-center gap-2 cursor-pointer"
//                       >
//                         <Edit2 className="w-4" />
//                         <span className="text-sm">Edit</span>
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

// export default CompaniesTable;






import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminCreatedCompaniesAction } from "@/store/companySlice/companySlice";
import { toast } from "sonner";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CompaniesTable = ({ searchParam }) => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminCreatedCompaniesAction()).then((response) => {
      if (response.payload.status) {
        setCompanies(response.payload.companies || []);
      } else {
        toast.error(response.payload.message || "Failed to fetch companies");
      }
    });
  }, [dispatch]);

  // Optimized Filtering
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      company?.companyName?.toLowerCase()?.includes(searchParam?.toLowerCase())
    );
  }, [companies, searchParam]);

  return (
    <div className="max-w-7xl mx-auto overflow-x-auto">
      <Table className="w-full border border-gray-200 rounded-lg shadow-md">
        <TableCaption className="text-gray-500">
          A list of your recently registered companies.
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow className="text-gray-700">
            <TableHead className="text-center p-3">Logo</TableHead>
            <TableHead className="text-center p-3">Name</TableHead>
            <TableHead className="text-center p-3">Website</TableHead>
            <TableHead className="text-center p-3">Email</TableHead>
            <TableHead className="text-center p-3">Contact</TableHead>
            <TableHead className="text-center p-3">Registered At</TableHead>
            <TableHead className="text-center p-3">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company, index) => (
              <TableRow key={index} className="hover:bg-gray-50 transition">
                <TableCell className="text-center">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={company?.companyLogo || "/default-logo.png"} />
                  </Avatar>
                </TableCell>
                <TableCell className="text-center font-medium">
                  {company?.companyName || "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  {company?.companyWebsite ? (
                    <a href={company.companyWebsite} className="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">
                      {company.companyWebsite}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell className="text-center">{company?.companyEmail || "N/A"}</TableCell>
                <TableCell className="text-center">{company?.companyContact || "N/A"}</TableCell>
                <TableCell className="text-center">
                  {company?.createdAt?.split("T")[0] || "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-gray-900 transition" />
                    </PopoverTrigger>
                    <PopoverContent className="w-28">
                      <div
                        onClick={() => navigate(`/admin/company/${company._id}`)}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                      >
                        <Edit2 className="w-4" />
                        <span className="text-sm">Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="7" className="text-center py-4 text-gray-500">
                No companies found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;

