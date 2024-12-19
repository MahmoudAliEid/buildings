const Building = require("../models/building");

const createBuilding = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required!" });
    }
    // ** Check if image is uploaded or and update the image path is array
    if (req.files) {
      const files = req.files;
      let imagesPath = [];
      files.map((file) => {
        imagesPath.push(
          `${process.env.Backend_URL}/${file.path.replace(/\\/g, "/")}`
        );
      });
      req.body.image = imagesPath;
    }
    const building = await Building.create({
      ...req.body,
      image: req.body.image,
    });

    res.status(201).json({
      building,
      message: "Building created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

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
    res.status(400).json({ message: error.message });
  }
};
const getBuilding = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    if (!building) {
      return res.status(404).json({ message: "Building not found" });
    }
    res.status(200).json({ building });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateBuilding = async (req, res) => {
  // ** Check if image is uploaded or and update the image path is array
  if (req.files) {
    const files = req.files;
    let imagesPath = [];
    files.map((file) => {
      imagesPath.push(
        `${process.env.Backend_URL}/${file.path.replace(/\\/g, "/")}`
      );
    });
    req.body.image = imagesPath;
  }

  try {
    const building = await Building.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: req.body.image,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      building,
      message: "Building updated successfully",
      id: req.params.id,
      reqBody: req.body,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBuilding = async (req, res) => {
  try {
    await Building.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Building deleted successfully" });
  } catch (error) {
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
