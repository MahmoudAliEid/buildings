const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { auth, authorizeRoles } = require("../middleware/auth");
const {
  createBuilding,
  getBuildings,
  getBuilding,
  updateBuilding,
  deleteBuilding,
} = require("../controllers/building");

router.post(
  "/create-building",
  auth,
  authorizeRoles("admin"),

  createBuilding
);
router.get("/buildings", getBuildings);

router.get("/building/:id", getBuilding);

router.put(
  "/update-building/:id",
  auth,
  authorizeRoles("admin"),
  upload.array("image"),
  updateBuilding
);

router.delete(
  "/delete-building/:id",
  auth,
  authorizeRoles("admin"),
  deleteBuilding
);

module.exports = router;
