const applicationModel = require("../models/application.model");
const jobModel = require("../models/job.model");


const handleApplyToJob = async (req, res) => {
    try {
        const userId = req.userId;
        const jobId = req.params.jobId;

        console.log(userId,jobId,"THHISSS");
        
        if (!jobId) {
            return res.status(200).json({
                message: "job id is required.",
                status: false
            })
        };
        
        const existingApplication = await applicationModel.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(200).json({
                message: "you have already applied",
                status: false
            });
        }

      
        const job = await jobModel.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Jjob does not exists",
                success: false
            })
        }
        // create a new application
        const newApplication = await applicationModel.create({
            job:jobId,
            applicant:userId,
        });
        
        
        // jobModel.applications.push(newApplication._id);
        job.applications.push(newApplication._id) ;
        await job.save();
        return res.status(201).json({
            message:"job applied succesfully.",
            status:true
        })
    } catch (error) {
        console.log("something went wrong while applying to a job ",error);
    }
};
const handleGetAppliedJobsByUser = async (req,res) => {
    try {
        const userId = req.userId;
        const application = await applicationModel.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(200).json({
                message:"applications not found",
                status:false
            })
        };
        return res.status(200).json({
            message:"applications fetch succesfully",
            application,
            status:true
        })
    } catch (error) {
        console.log("something went wrong while fetching all user applied jobs",error);
    }
}
// admin dekhega kitna user ne apply kiya hai
const handleGetAllAppliedApplicants = async (req,res) => {
    try {
        const jobId = req.params.jobId;

        const job = await jobModel.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant',
            
            }
        }).populate({
            path:'company',
            
        });
        if(!job){
            return res.status(200).json({
                message:'job not found',
                status:false
            })
        };
        return res.status(200).json({
            job, 
            status:true
        });
    } catch (error) {
        console.log("something went wrong fetching all the application to a job ",error);
    }
}
const handleUpdateApplicationStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.applicationId;
        if(!status){
            return res.status(200).json({
                message:'status is required',
                status:false
            })
        };

        // find the application by applicantion id
        const application = await applicationModel.findOne({_id:applicationId});
        if(!application){
            return res.status(200).json({
                message:"application not found",
                status:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"status updated successfully.",
            status:true
        });

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    handleUpdateApplicationStatus,
    handleApplyToJob,
    handleGetAppliedJobsByUser,
    handleGetAllAppliedApplicants


}