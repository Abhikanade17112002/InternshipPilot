const {
  handleUserSignUp,
  handleUserAuthentication,
  handleUserSignIn,
  handleUserSignOut,
  handleUserProfileUpdate,
} = require("../controllers/authetication.controller");
const Authenticated = require("../middlewares/authentication.middleware");
const upload = require("../middlewares/multer");
const router = require("express").Router();

// Reauthentication
router.get("/authenticate", Authenticated, handleUserAuthentication);
// Sign In
router.post("/signin", handleUserSignIn);
// Sign Up
router.post("/signup", upload.single("profilePic"), handleUserSignUp);
// Sign Out
router.get("/signout", handleUserSignOut);
// Profile Update
router.post(
  "/profile/update",
  Authenticated,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  handleUserProfileUpdate
);

module.exports = router;
