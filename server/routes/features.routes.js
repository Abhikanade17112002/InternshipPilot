const router = require("express").Router();
const {
  reccomandationController,
  analyserController,
  evaluateUserResumeATSScore,
} = require("../controllers/features.controller");
const Authenticated = require("../middlewares/authentication.middleware");

router.post("/test", Authenticated, reccomandationController);
router.post("/test2", Authenticated, analyserController);
router.post("/test3", Authenticated, evaluateUserResumeATSScore);

module.exports = router;
