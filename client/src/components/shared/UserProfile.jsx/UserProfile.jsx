
import React, { useState } from "react";
import { Contact, Mail, Pen, SquareArrowOutUpRight } from "lucide-react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { getUserInfo } from "@/store/userSlice/userSlice";
import UserAppliedTable from "../UserAppliedTable/UserAppliedTable";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import UpdateProfilePhoto from "../ProfilePhotoModel/UpdateProfilePhoto";

// const UserProfile = () => {
//   const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
//   const user = useSelector(getUserInfo);

//   return (
//     <div className="h-[100vh] overflow-y-auto text-xs sm:text-sm mt-4 mb-14">
//       <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
//         {/* Profile Section */}
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <div className="flex-col flex ">
              
//             <Avatar className="h-24 w-24 mx-auto">
//               <AvatarImage
//                 src={
//                   user?.profile?.profilePhoto || "/default-avatar.png"
//                 }
//                 alt="Profile"
//               />
            
//             </Avatar>
//             {/* <div className="py-1  flex justify-center">
//             <UpdateProfilePhoto/>
//             </div> */}
//             </div>
            
//             <div>
//               <h1 className="text-lg font-bold">{user?.firstName} {user?.lastName}</h1>
//               <p>{user?.profile?.bio || "No bio available"}</p>
//             </div>
//           </div>
//           <Button
//             onClick={() => setOpenUpdateProfile(true)}
//             className="flex items-center gap-2"
//             variant="outline"
//           >
//             <Pen size={16} /> <span>Edit</span>
//           </Button>
//         </div>

//         {/* Contact Section */}
//         <div className="my-5 flex gap-5">
//           <ContactInfo icon={<Mail />} text={user?.email || "useremail@gmail.com"} />
//           <ContactInfo icon={<Contact />} text={user?.phoneNumber || "+91 0000000000"} />
//         </div>

//         {/* Skills Section */}
//         <div className="my-5 sm:max-w-[50%]">
//           <h1 className="font-bold">Skills</h1>
//           <div className="flex items-center gap-1 flex-wrap">
//             {user?.profile?.skills?.length ? (
//               user.profile.skills.map((skill, index) => (
//                 <Badge key={index} className="text-xs sm:text-sm">{skill}</Badge>
//               ))
//             ) : (
//               <span>NA</span>
//             )}
//           </div>
//         </div>

//         {/* Resume Section */}
//         <div className="grid w-full max-w-sm items-center gap-1.5">
//           <Label className="text-md font-bold">Resume</Label>
//           {user?.profile?.resume ? (
//             <a
//               target="_blank"
//               rel="noopener noreferrer"
//               href={user.profile.resume}
//               download={user.profile.resumeOriginalName || "Resume.pdf"}
//               className="text-blue-500 flex items-center gap-2 hover:underline cursor-pointer"
//             >
//               <span>{user.profile.resumeOriginalName || "Resume"}</span>
//               <SquareArrowOutUpRight size={15} />
//             </a>
//           ) : (
//             <span>NA</span>
//           )}
//         </div>

//         {/* Applied Jobs Section */}
//         <div className="max-w-4xl mx-auto bg-white rounded-2xl">
//           <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
//           <UserAppliedTable />
//         </div>
//       </div>

//       {/* Update Profile Modal */}
//       <UpdateProfile
//         openUpdateProfile={openUpdateProfile}
//         setOpenUpdateProfile={setOpenUpdateProfile}
//       />
//     </div>
//   );
// };

// // Reusable Contact Info Component
// const ContactInfo = ({ icon, text }) => (
//   <div className="flex items-center gap-3 my-2">
//     {icon}
//     <span>{text}</span>
//   </div>
// );

// export default UserProfile;



// Same imports as before

// const UserProfile = () => {
//   const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
//   const user = useSelector(getUserInfo);

//   return (
//     <div className="min-h-screen overflow-y-auto px-4 text-sm sm:text-base mt-4 mb-14">
//       <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-10">
        
//         {/* Profile Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
//           <div className="flex items-center gap-5">
//             <div className="relative">
//               <Avatar className="h-24 w-24 border border-gray-300 shadow-sm">
//                 <AvatarImage
//                   src={user?.profile?.profilePhoto || "/default-avatar.png"}
//                   alt="Profile"
//                 />
//               </Avatar>
//             </div>

//             <div>
//               <h1 className="text-xl font-bold">
//                 {user?.firstName} {user?.lastName}
//               </h1>
//               <p className="text-gray-600">
//                 {user?.profile?.bio || "No bio available"}
//               </p>
//             </div>
//           </div>

//           <Button
//             onClick={() => setOpenUpdateProfile(true)}
//             className="gap-2"
//             variant="outline"
//           >
//             <Pen size={16} />
//             Edit Profile
//           </Button>
//         </div>

//         {/* Contact Section */}
//         <div className="my-6 flex flex-col sm:flex-row gap-4 sm:gap-10">
//           <ContactInfo icon={<Mail className="text-gray-500" />} text={user?.email || "useremail@gmail.com"} />
//           <ContactInfo icon={<Contact className="text-gray-500" />} text={user?.phoneNumber || "+91 0000000000"} />
//         </div>

//         {/* Skills Section */}
//         <div className="my-6 sm:max-w-[60%]">
//           <h2 className="font-semibold mb-2">Skills</h2>
//           <div className="flex flex-wrap gap-2">
//             {user?.profile?.skills?.length ? (
//               user.profile.skills.map((skill, index) => (
//                 <Badge key={index} className="text-xs sm:text-sm px-2 py-1">
//                   {skill}
//                 </Badge>
//               ))
//             ) : (
//               <span className="text-gray-500">NA</span>
//             )}
//           </div>
//         </div>

//         {/* Resume Section */}
//         <div className="my-6">
//           <Label className="text-base font-semibold">Resume</Label>
//           {user?.profile?.resume ? (
//             <a
//               href={user.profile.resume}
//               target="_blank"
//               rel="noopener noreferrer"
//               download={user.profile.resumeOriginalName || "Resume.pdf"}
//               className="text-blue-600 flex items-center gap-2 mt-1 hover:underline"
//             >
//               <span>{user.profile.resumeOriginalName || "Resume"}</span>
//               <SquareArrowOutUpRight size={16} />
//             </a>
//           ) : (
//             <span className="text-gray-500">NA</span>
//           )}
//         </div>

//         {/* Applied Jobs Section */}
//         <div className="mt-8">
//           <h2 className="font-bold text-lg mb-3">Applied Jobs</h2>
//           <UserAppliedTable />
//         </div>
//       </div>

//       {/* Update Modal */}
//       <UpdateProfile
//         openUpdateProfile={openUpdateProfile}
//         setOpenUpdateProfile={setOpenUpdateProfile}
//       />
//     </div>
//   );
// };

// const ContactInfo = ({ icon, text }) => (
//   <div className="flex items-center gap-2">
//     {icon}
//     <span>{text}</span>
//   </div>
// );

// export default UserProfile;

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const UserProfile = () => {
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const user = useSelector(getUserInfo);

  return (
    <div className="min-h-screen overflow-y-auto px-4 text-sm sm:text-base mt-4 mb-14">
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-10">
        
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar className="h-24 w-24 border border-gray-300 shadow-sm">
                <AvatarImage
                  src={user?.profile?.profilePhoto || "/default-avatar.png"}
                  alt="Profile"
                />
              </Avatar>
            </div>

            <div>
              <h1 className="text-xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-gray-600">
                {user?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setOpenUpdateProfile(true)}
            className="gap-2"
            variant="outline"
          >
            <Pen size={16} />
            Edit Profile
          </Button>
        </div>

        {/* Contact Section */}
        <div className="my-6 flex flex-col sm:flex-row gap-4 sm:gap-10">
          <ContactInfo icon={<Mail className="text-gray-500" />} text={user?.email || "useremail@gmail.com"} />
          <ContactInfo icon={<Contact className="text-gray-500" />} text={user?.phoneNumber || "+91 0000000000"} />
        </div>

        {/* Skills Section */}
        <div className="my-6 sm:max-w-[60%]">
          <h2 className="font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length ? (
              user.profile.skills.map((skill, index) => (
                <Badge key={index} className="text-xs sm:text-sm px-2 py-1">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="my-6">
          <Label className="text-base font-semibold">Resume</Label>
          {user?.profile?.resume ? (
            <div className="w-[25%]">
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              download={user.profile.resumeOriginalName || "Resume.pdf"}
              className="text-blue-600 flex items-center gap-2 mt-1 hover:underline"
            >
              <span>{user.profile.resumeOriginalName || "Resume"}</span>
              <SquareArrowOutUpRight size={16} />
            </a></div>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>

        {/* Applied Jobs Section */}
        <div className="mt-8">
          <h2 className="font-bold text-lg mb-3">Applied Jobs</h2>

          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <Input
              placeholder="Search by title or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[30%]"
            />
            <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
              <SelectTrigger className="w-[25%]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date" className="text-center">Date</SelectItem>
                <SelectItem value="title">Job Title</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <UserAppliedTable searchTerm={searchTerm} sortBy={sortBy} />
        </div>
      </div>

      {/* Update Modal */}
      <UpdateProfile
        openUpdateProfile={openUpdateProfile}
        setOpenUpdateProfile={setOpenUpdateProfile}
      />
    </div>
  );
};

const ContactInfo = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span>{text}</span>
  </div>
);

export default UserProfile;
