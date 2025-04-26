const router = require("express").Router();
const {
  reccomandationController,
  analyserController,
  evaluateUserResumeATSScore,
} = require("../controllers/features.controller");
const Authenticated = require("../middlewares/authentication.middleware");

router.post("/recommend", Authenticated, reccomandationController);
router.post("/evaluate", Authenticated, analyserController);
router.post("/atsscore", Authenticated, evaluateUserResumeATSScore);

module.exports = router;
