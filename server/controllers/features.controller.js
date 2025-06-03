const jobModel = require("../models/job.model");
const user = require("../models/user.model");
const axios = require("axios")
const reccomandationController = async (request,response) =>{

    try {
        const data = request.body;

        const filtertedUserInfo = {"name":data?.userInfo.firstname + " " + data?.userInfo.lastname , "skills": data.userInfo.skills} ;
        const FiltredInternshipData = data.internships.map((internship)=>{
            return {
                 "jobId": internship?._id , "jd":internship.description ,"title":internship.title , "company":internship.company.companyName ,"location":internship.location, "requirements" :internship.requirements
            }
        });

        

        // Make the API call and await the response

        console.log("Here Here");
        
        const apiResponse = await axios.post(`${process.env.FEATURE_BASE_URL}/api/feature/recommend`, {
            "student": filtertedUserInfo,
            "internships": FiltredInternshipData,
            "top_n": 15,
            "min_similarity": 0.09
        });

        console.log("API Response:", apiResponse.data );

        // Send API response back to the client
        response.json({
            message: "Success",
            status: "Success",
            recommendations: apiResponse.data // Return the response from external API
        });

    } catch (error) {
        console.error("Error calling external API:", error.message);
        response.status(500).json({
            message: "Error fetching recommendations",
            error: error.message
        });
    }
}


const analyserController = async (request,response) =>{

    try {
        const data = request.body;
        console.log(data,"DATA DATA");
        
        const apiResponse = await axios.post(`${process.env.FEATURE_BASE_URL}/api/feature/analyze`, data);

        console.log("API Response:", apiResponse.data );
        // Send API response back to the client
        response.json({
            message: "Success",
            status: "Success",
            "data":apiResponse.data.results[0]
           // Return the response from external API
        });

    } catch (error) {
        console.error("Error calling external API:", error.message);
        response.status(500).json({
            message: "Error fetching recommendations",
            error: error.message
        });
    }
}




const evaluateUserResumeATSScore = async ( request , response ) =>{

    try {

        console.log(request.body,"THIS IS A BODY");
        const data = request.body;
        
        const apiResponse = await axios.post(`${process.env.FEATURE_BASE_URL}/api/feature/score`, data);

        console.log("API Response:", apiResponse.data[0].ats_score );
        return response.json({
            "status":"Success",
            "response":apiResponse?.data
        })
        
    } catch (error) {

        console.log("SOMETHING WENT WRONG WHEN EVALUATING USER RESUME :: SERVER SIDE",error);
        
    }

}




module.exports = {
    reccomandationController ,
    analyserController,
    evaluateUserResumeATSScore
}