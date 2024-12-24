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

// ** Create a building (Admin only)
router.post(
  "/create-building",
  // auth,
  // authorizeRoles("admin"),
  upload.array("images"), // Ensure the field name matches the form
  createBuilding
);

// ** Fetch all buildings
router.get("/buildings", getBuildings);

// ** Fetch a single building by ID
router.get("/building/:id", getBuilding);

// ** Update a building (Admin only)
router.put(
  "/update-building/:id",
  auth,
  authorizeRoles("admin"),
  upload.array("images"),
  updateBuilding
);

// ** Delete a building (Admin only)
router.delete(
  "/delete-building/:id",
  auth,
  authorizeRoles("admin"),
  deleteBuilding
);

module.exports = router;
