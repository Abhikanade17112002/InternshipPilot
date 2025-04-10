const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter", "tpo"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String }, // URL to resume file
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
      profilePhoto: {
        type: String,
        default:
          "https://res.cloudinary.com/du9ujqjwh/image/upload/v1743950817/user_tyrw1v.png",
      },
    },
    aiScore: { type: Number, default: null }, // Score from AI analysis
    feedback: { type: String }, // AI feedback for improvement
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
