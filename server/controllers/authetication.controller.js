const UserModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utiils/cloudinary");
const deleteServerSideFiles = require("../utiils/deleteServerSideFiles");
const { sendWelcomeUserEmail } = require("../utiils/emailTemplate");
const nodemailer = require("nodemailer");
const sendEmail = require("../utiils/sendEmails");

const handleUserAuthentication = async ( request , response ) =>{
  try {
    
    
    
    const userId = request.userId ;
   
    const user = await UserModel.findOne({ _id : userId });
    if (!user) {
      return response.status(200).json({
        message: "incorrect email or password (user not found)",
        status: false,
      });
    }

    // return response.status(200).json({
    //   message: "correct email or password (user  found)",
    //   status: true,
    // });

    // const validPassword = await bcryptjs.compare(password, user.password);
    // if (!validPassword) {
    //   return response.status(200).json({
    //     message: "incorrect email or password (user not found)",
    //     status: false,
    //   });
    // }


    

    const tokenData = {
      userId: user._id,
      role: user.role,
      email: user.email,
    };

    const generatedToken = jwt.sign(tokenData, process.env.JTWSECRETE, {
      expiresIn: "1d",
    });

    return response
      .status(200)
      .cookie("jwttoken", generatedToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: "/",
      })
      .json({
        message: "login successfull",
        status: true,
        token: generatedToken,
        user,
      });


  } catch (error) {
    console.log(error);
    response.status(200).json({
      message: "something went wrong in User Requthentication ",
      status: false,
    });
  }
}
const handleUserSignUp = async (request, response) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, role } =
      request.body;

    const profilePicPath = request.file.path ;
    const profilePicUrl = await cloudinary.uploader.upload(profilePicPath);
  
    
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !role
    ) {
      return response.status(200).json({
        message: "please fill all the fields okaaay",
        status: false,
      });
    }

    const checkExistingUser = await UserModel.findOne({ email });

    if (checkExistingUser) {
      return response.status(200).json({
        message: "user already exists !",
        status: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      "profile.profilePhoto": profilePicUrl.secure_url,
    });
    
    deleteServerSideFiles(profilePicPath) ;
    // sign JWT
    const tokenData = {
      userId: newUser._id,
      role: newUser.role,
      email: newUser.email,
    };
    const signedToken = await jwt.sign(tokenData, process.env.JTWSECRETE, {
      expiresIn: "1d",
    });

    if (!signedToken) {
      return response.status(500).json({
        message: "Error generating token",
        status: false,
      });
    }


    const data = { subject : "REGISTRATION" ,"name":newUser.firstName+" "+newUser.lastName,"role":newUser?.role ,"email":newUser?.email}; 
      sendEmail(data)
    
    
    response
      .status(200)
      .cookie("jwttoken", signedToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: "/",
      })
      .json({
        message: "user created successfully",
        status: true,
        token: signedToken,
        user: newUser,
      });
  } catch (error) {
    console.log(error);
    response.status(200).json({
      message: "something went wrong in sign up ",
      status: false,
    });
  }
};

const handleUserSignIn = async (request, response) => {
  try {
    const { email, password, role } = request.body;


    if (!email || !password || !role) {
      return response.status(200).json({
        message: "please fill all the fields",
        status: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(200).json({
        message: "incorrect email or password (user not found)",
        status: false,
      });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return response.status(200).json({
        message: "incorrect email or password (user not found)",
        status: false,
      });
    }

    if (user.role !== role) {
      return response.status(200).json({
        message: "user account with assigned role not found",
        status: false,
      });
    }

    const tokenData = {
      userId: user._id,
      role: user.role,
      email: user.email,
    };

    const generatedToken = jwt.sign(tokenData, process.env.JTWSECRETE, {
      expiresIn: "1d",
    });

    return response
      .status(200)
      .cookie("jwttoken", generatedToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: "/",
      })
      .json({
        message: "login successfull",
        status: true,
        token: generatedToken,
        user,
      });
  } catch (error) {
    response.status(200).json({
      message: "something went wrong in sign in ",
      status: false,
    });
  }
};

const handleUserSignOut = async (request, response) => {
  try {
   

    return response
      .status(200)
      .clearCookie("jwttoken", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
      .json({
        message: "logout successful",
        status: true,
      });
  } catch (error) {
    return response.status(200).json({
      message: "something went wrong in sign out ",
      status: false,
    });
  }
};

// const handleUserProfileUpdate = async (request, response) => {
//   try {
//     const { firstName, lastName, phoneNumber, bio, skills, email } =
//       request.body;
//    if( request?.files) {
//     const profilePath = request?.files?.profilePic[0]?.path;
//     const resumePath = request?.files?.resume[0]?.path;
//     let profileURL = await cloudinary.uploader.upload(profilePath);
//     let resumeURL = await cloudinary.uploader.upload(resumePath);
//     profileURL.secure_url = profileURL.secure_url.replace(".pdf", ".jpg");
//     resumeURL.secure_url = resumeURL.secure_url.replace(".pdf", ".jpg");
//   }

    

//     // Check if all fields are provided
//     if (!firstName || !lastName || !phoneNumber || !bio || !skills || !email) {
//       return response.status(400).json({
//         message: "Please fill all the fields",
//         status: false,
//       });
//     }

//     const skillsArray = skills?.split(",");
//     const userId = request.userId;

//     // Find the user by ID
//     let user = await UserModel.findById(userId);
//     if (!user) {
//       return response.status(404).json({
//         message: "User not found",
//         status: false,
//       });
//     }

//     const updateInfo = {};
//     if (firstName) updateInfo.firstName = firstName;
//     if (lastName) updateInfo.lastName = lastName;
//     if (phoneNumber) updateInfo.phoneNumber = phoneNumber;
//     updateInfo.profile = {};
//     if (bio) updateInfo.profile.bio = bio;

//     if (skillsArray.length > 0) updateInfo.profile.skills = skillsArray;
//     if (email) updateInfo.email = email;
//     if (profileURL) updateInfo.profile.profilePhoto = profileURL.secure_url;

//     if (resumeURL) updateInfo.profile.resume = resumeURL.secure_url;
    
//     deleteServerSideFiles(resumePath) ;
//     deleteServerSideFiles(profilePath) ;
//     // Update the user data using findByIdAndUpdate for cleaner updates
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       userId,
//       updateInfo,
//       { new: true } // Return the updated user
//     );


//     return response.status(200).json({
//       message: "User profile updated successfully",
//       status: true,
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.log("Error updating profile: ", error);
//     return response.status(500).json({
//       message: "Something went wrong while updating profile",
//       status: false,
//     });
//   }
// };


const handleUserProfileUpdate = async (request, response) => {
  try {
    const { firstName, lastName, phoneNumber, bio, skills, email } =
      request.body;

    let profileURL = null;
    let resumeURL = null;
    let profilePath = null;
    let resumePath = null;

    // Check if files are present
    if (request.files) {
      if (request.files.profilePic) {
        profilePath = request.files.profilePic[0]?.path;
      }
      if (request.files.resume) {
        resumePath = request.files.resume[0]?.path;
      }

      // Upload files to Cloudinary if they exist
      if (profilePath) {
        profileURL = await cloudinary.uploader.upload(profilePath);
        profileURL.secure_url = profileURL.secure_url.replace(".pdf", ".jpg");
      }
      if (resumePath) {
        resumeURL = await cloudinary.uploader.upload(resumePath);
        resumeURL.secure_url = resumeURL.secure_url.replace(".pdf", ".jpg");
      }
    }

    // Check if all fields are provided
    if (!firstName || !lastName || !phoneNumber || !bio || !skills || !email) {
      return response.status(400).json({
        message: "Please fill all the fields",
        status: false,
      });
    }

    const skillsArray = skills
  .split(",")                         
  .map(skill => skill.trim());
    const userId = request.userId;

    // Find the user by ID
    let user = await UserModel.findById(userId);
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    const updateInfo = {};
    if (firstName) updateInfo.firstName = firstName;
    if (lastName) updateInfo.lastName = lastName;
    if (phoneNumber) updateInfo.phoneNumber = phoneNumber;
    updateInfo.profile = {};
    if (bio) updateInfo.profile.bio = bio;

    if (skillsArray.length > 0) updateInfo.profile.skills = skillsArray;
    if (email) updateInfo.email = email;
    if (profileURL){ updateInfo.profile.profilePhoto = profileURL.secure_url;}
    else if( user?.profile?.profilePhoto ){
      updateInfo.profile.profilePhoto =  user?.profile?.profilePhoto 
    }
    if (resumeURL){ updateInfo.profile.resume = resumeURL.secure_url}
    else if(user?.profile?.resume){
      updateInfo.profile.resume = user?.profile?.resume

    }
    ;

    // Delete files only if they exist
    if (resumePath) deleteServerSideFiles(resumePath);
    if (profilePath) deleteServerSideFiles(profilePath);

    // Update the user data using findByIdAndUpdate for cleaner updates
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateInfo, {
      new: true, // Return the updated user
    });

    return response.status(200).json({
      message: "User profile updated successfully",
      status: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log("Error updating profile: ", error);
    return response.status(500).json({
      message: "Something went wrong while updating profile",
      status: false,
    });
  }
};


module.exports = {
  // export the functions to be used in other files
  handleUserSignUp,
  handleUserSignIn,
  handleUserSignOut,
  handleUserProfileUpdate,
  handleUserAuthentication
};
