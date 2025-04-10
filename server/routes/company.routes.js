const {
  handleRegisterCompany,
  handleGetAllUserCreatedCompany,
  handleGetCompanyById,
  handleUpdateCompanyDetails,
} = require("../controllers/company.controllers");
const Authenticated = require("../middlewares/authentication.middleware");
const upload = require("../middlewares/multer");

const router = require("express").Router();

router.post("/register", Authenticated, handleRegisterCompany);
router.get("/", Authenticated, handleGetAllUserCreatedCompany);
router.post(
  "/update/:companyId",
  Authenticated,
  upload.single("companyLogo"),
  handleUpdateCompanyDetails
);
router.get("/:companyId", Authenticated, handleGetCompanyById);

module.exports = router;
