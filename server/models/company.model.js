const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    industry: {
      type: String,
      enum: ["it", "finance", "pharmasuticals", "energy"],
    },
    companyEmail: {
      type: String,
      unique: true,
    },
    companyContact: {
      type: String,
    },
    description: {
      type: String,
    },
    companyWebsite: {
      type: String,
    },
    companyAddress: {
      type: String,
    },
    companyLogo: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
const companyModel = mongoose.model("company", companySchema);
module.exports = companyModel;
