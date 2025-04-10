import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import CustomFileInput from "../CustomFileInput/CustomFileInput";
import CustomInput from "../CustomInput/CustomInput";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { handleUserUpdateProfileAction } from "../../../store/userSlice/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const UpdateProfile = ({ openUpdateProfile, setOpenUpdateProfile }) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      skills: "",
      profilePic: "",
      userResume: "",
      phoneNumber: "",
      bio: "",
    },
    mode: "all",
  });

  const handleUpdateProfile = async (data) => {
    const formdata = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "resume" || key === "profilePic") {
        formdata.append(key, data[key][0]);
      } else {
        formdata.append(key, data[key]);
      }
    });

    setSubmitting((prevState) => !prevState);
    try {
      const response = await dispatch(handleUserUpdateProfileAction(formdata));
      if (response.payload.status) {
        toast.success(response.payload.message);
        setSubmitting((prevState) => !prevState);
        setOpenUpdateProfile((prevState) => !prevState);
      } else {
        toast.error(response.payload.message);
        setSubmitting((prevState) => !prevState);
      }
    } catch (error) {
      console.log(error);
      setSubmitting((prevState) => !prevState);
    }
  };
  return (
    <div>
      <Dialog open={openUpdateProfile}   >
        <DialogContent
          onInteractOutside={() => setOpenUpdateProfile(false)}
          className="h-[700px] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              encType="multipart/form-data"
            >
              <CustomInput
                label="First Name"
                type="text"
                name="firstName"
                errors={errors}
                placeholder="Enter First Name"
                register={register("firstName", {
                  required: {
                    value: true,
                    message: "first name is required",
                  },
                })}
              />
              <CustomInput
                label="Last Name"
                type="text"
                name="lastName"
                errors={errors}
                placeholder="Enter Last Name"
                register={register("lastName", {
                  required: {
                    value: true,
                    message: "last name is required",
                  },
                })}
              />
              <CustomInput
                label="Email"
                type="email"
                name="email"
                errors={errors}
                placeholder="Enter Email"
                register={register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "enter a valid email",
                  },
                })}
              />
              <CustomInput
                label="Phone Number"
                type="text"
                name="phoneNumber"
                errors={errors}
                placeholder="Enter Phone Number"
                register={register("phoneNumber", {
                  required: {
                    value: true,
                    message: "Phone Number is required",
                  },
                })}
              />
              <CustomInput
                label="User Bio"
                type="text"
                name="bio"
                errors={errors}
                placeholder="Enter user bio"
                register={register("bio", {
                  required: {
                    value: true,
                    message: "bio is required",
                  },
                })}
              />
              <CustomInput
                label="User Skills"
                type="text"
                name="skills"
                errors={errors}
                placeholder="Enter user skills ( comma separated ) "
                register={register("skills", {
                  required: {
                    value: true,
                    message: "skills are required",
                  },
                })}
              />
              <CustomFileInput
                errors={errors}
                name={"resume"}
                label={"upload user resume"}
                register={register("resume", {
                  required: {
                    value: true,
                    message: "user resume  is required",
                  },
                })}
              />
              <CustomFileInput
                errors={errors}
                name={"profilePic"}
                label={"upload Profile Pic"}
                register={register("profilePic", {
                  required: {
                    value: true,
                    message: "user resume  is required",
                  },
                })}
              />
              <div className="formButtons   my-10 flex  flex-col">
                <Button>
                  {submitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {submitting ? "please wait ..." : "Update"}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;



// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import { useForm } from "react-hook-form";
// import CustomFileInput from "../CustomFileInput/CustomFileInput";
// import CustomInput from "../CustomInput/CustomInput";
// import { Button } from "@/components/ui/button";
// import { Badge, Loader2 } from "lucide-react";
// import { getUserInfo, handleUserUpdateProfileAction } from "../../../store/userSlice/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";



// const UpdateProfile = ({ openUpdateProfile, setOpenUpdateProfile }) => {
//   const [submitting, setSubmitting] = useState(false);
//   const user = useSelector(getUserInfo);
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset, // Used for clearing form fields
//   } = useForm({
//     defaultValues: {
//       firstName: user?.firstName ? user?.firstName :"",
//       lastName: user?.lastName ? user?.lastName :"",
//       email: user?.email?user?.email:"",
//       skills: user?.profile?.skills.length !== 0 ? (
//         user?.profile?.skills.map((item, index) => (
//           item
//         ))): "",
//       // profilePic: "",
//       // userResume: "",
//       phoneNumber:user?.phoneNumber ? user?.phoneNumber : "",
//       bio: user?.profile?.bio?user?.profile?.bio:"",
//     },
//     mode: "all",
//   });

//   const handleUpdateProfile = async (data) => {
//     const formdata = new FormData();
//     Object.keys(data).forEach((key) => {
//       if (key === "resume" || key === "profilePic") {
//         formdata.append(key, data[key][0]);
//       } else {
//         formdata.append(key, data[key]);
//       }
//     });

//     setSubmitting(true);
//     try {
//       const response = await dispatch(handleUserUpdateProfileAction(formdata));
//       if (response.payload.status) {
//         toast.success(response.payload.message);
//         setOpenUpdateProfile(false);
//       } else {
//         toast.error(response.payload.message);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const clearForm = () => {
//     reset(); // Reset all fields to default values
//   };

//   return (
//     <Dialog open={openUpdateProfile} onOpenChange={setOpenUpdateProfile}>
      
//       <DialogContent
//         onInteractOutside={() => setOpenUpdateProfile(false)}
//         className="h-[700px] overflow-y-auto"
//       >
//         <DialogHeader>
//           <DialogTitle>Update Profile</DialogTitle>
//         </DialogHeader>
//         <DialogDescription>
//           <form onSubmit={handleSubmit(handleUpdateProfile)} encType="multipart/form-data">
//             <CustomInput
//               label="First Name"
//               type="text"
//               name="firstName"
//               errors={errors}
//               placeholder="Enter First Name"
//               register={register("firstName", {
//                 required: "First name is required",
//               })}
//             />
//             <CustomInput
//               label="Last Name"
//               type="text"
//               name="lastName"
//               errors={errors}
//               placeholder="Enter Last Name"
//               register={register("lastName", {
//                 required: "Last name is required",
//               })}
//             />
//             <CustomInput
//               label="Email"
//               type="email"
//               name="email"
//               errors={errors}
//               placeholder="Enter Email"
//               register={register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                   message: "Enter a valid email",
//                 },
//               })}
//             />
//             <CustomInput
//               label="Phone Number"
//               type="text"
//               name="phoneNumber"
//               errors={errors}
//               placeholder="Enter Phone Number"
//               register={register("phoneNumber", {
//                 required: "Phone Number is required",
//               })}
//             />
//             <CustomInput
//               label="User Bio"
//               type="text"
//               name="bio"
//               errors={errors}
//               placeholder="Enter user bio"
//               register={register("bio", {
//                 required: "Bio is required",
//               })}
//             />
//             <CustomInput
//               label="User Skills"
//               type="text"
//               name="skills"
//               errors={errors}
//               placeholder="Enter user skills (comma separated)"
//               register={register("skills", {
//                 required: "Skills are required",
//               })}
//             />
//             <CustomFileInput
//               errors={errors}
//               name="resume"
//               label="Upload User Resume"
//               register={  register("resume", {
//                 required: false,
//               })}
//             />
//             <CustomFileInput
//               errors={errors}
//               name="profilePic"
//               label="Upload Profile Pic"
//               register={ register("profilePic", {
//                 required:false
//               })}
//             />

//             {/* Buttons */}
//             <div className="formButtons mt-6 flex flex-col gap-3">
//               <Button type="submit" disabled={submitting} className="bg-blue-500 text-white">
//                 {submitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Please wait...
//                   </>
//                 ) : (
//                   "Update"
//                 )}
//               </Button>
//               <Button type="button" onClick={clearForm} className="bg-gray-500 text-white">
//                 Clear Form
//               </Button>
//             </div>
//           </form>
//         </DialogDescription>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UpdateProfile;

