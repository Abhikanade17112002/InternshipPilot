const router = require("express").Router();
const {
  handleUpdateApplicationStatus,
  handleApplyToJob,
  handleGetAppliedJobsByUser,
  handleGetAllAppliedApplicants,
} = require("../controllers/application.contoller");
const Authenticated = require("../middlewares/authentication.middleware");

router.get("/get", Authenticated, handleGetAppliedJobsByUser);
router.get("/job/:jobId", Authenticated, handleGetAllAppliedApplicants);
router.post("/apply/:jobId", Authenticated, handleApplyToJob);
router.post(
  "/status/:applicationId/update",
  Authenticated,
  handleUpdateApplicationStatus
);

module.exports = router;
