const Building = require("../models/building");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createBuilding = async (req, res) => {
  try {
    let imagesPath = [];

    // ** Upload files to Cloudinary
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: "buildings",
        })
      );

      const uploadResults = await Promise.all(uploadPromises);
      imagesPath = uploadResults.map((result) => result.secure_url);
    }

    const building = await Building.create({
      ...req.body,
      image: imagesPath,
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
    let imagesPath = [];

    // ** Upload files to Cloudinary
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: "buildings",
        })
      );

      const uploadResults = await Promise.all(uploadPromises);
      imagesPath = uploadResults.map((result) => result.secure_url);
    }
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
