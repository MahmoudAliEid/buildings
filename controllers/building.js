const Building = require("../models/building");

// ** Create a new building
const createBuilding = async (req, res) => {
  // Ensure that images are uploaded as expected
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No images uploaded." });
  }
  try {
    console.log(req.body, "body");
    console.log(req.files, "files");

    const imagesPath = req.files.map((file) => file.path);

    const building = await Building.create({
      ...req.body,
      images: imagesPath, // Correct field name
    });

    res.status(201).json({
      building,
      message: "Building created successfully",
    });
  } catch (error) {
    console.error("Error creating building:", error);

    res.status(400).json({ message: error.message });
  }
};

// ** Fetch all buildings
const getBuildings = async (req, res) => {
  try {
    const buildings = await Building.find();
    res.status(200).json({
      buildings,
      message: "All buildings fetched successfully",
      status: "success",
      count: buildings.length,
    });
  } catch (error) {
    console.error("Error fetching buildings:", error);
    res.status(400).json({ message: error.message });
  }
};

// ** Fetch a single building
const getBuilding = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    if (!building) {
      return res.status(404).json({ message: "Building not found" });
    }
    res.status(200).json({ building });
  } catch (error) {
    console.error("Error fetching building:", error);
    res.status(400).json({ message: error.message });
  }
};

//  ** Update a building
const updateBuilding = async (req, res) => {
  try {
    let imagesPath = req.body.images || [];

    if (req.files?.length) {
      imagesPath = req.files.map((file) => file.path);
    }

    const building = await Building.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: imagesPath }, // Correct field name
      { new: true, runValidators: true }
    );

    if (!building) {
      return res.status(404).json({ message: "Building not found" });
    }

    res.status(200).json({
      building,
      message: "Building updated successfully",
    });
  } catch (error) {
    console.error("Error updating building:", error);
    res.status(400).json({ message: error.message });
  }
};

// ** Delete a building
const deleteBuilding = async (req, res) => {
  try {
    const building = await Building.findByIdAndDelete(req.params.id);
    if (!building) {
      return res.status(404).json({ message: "Building not found" });
    }
    res.status(200).json({ message: "Building deleted successfully" });
  } catch (error) {
    console.error("Error deleting building:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createBuilding,
  getBuildings,
  getBuilding,
  updateBuilding,
  deleteBuilding,
};
