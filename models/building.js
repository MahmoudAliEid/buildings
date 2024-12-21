const mongoose = require("mongoose");
const { User } = require("./user");

const buildingSchema = new mongoose.Schema({
  name_en: {
    type: String,
    required: [true, "Please enter the English name of the building"],
    trim: true,
    minlength: [3, "Building name cannot be less than 3 characters"],
    maxlength: [100, "Building name cannot exceed 100 characters"],
  },
  name_ar: {
    type: String,
    required: [true, "Please enter the Arabic name of the building"],
    trim: true,
    minlength: [3, "Building name cannot be less than 3 characters"],
    maxlength: [100, "Building name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the price of the building"],
    default: 0.0,
  },
  location_en: {
    type: String,
    required: [true, "Please enter the English location of the building"],
    trim: true,
    maxlength: [200, "Location cannot exceed 200 characters"],
  },
  location_ar: {
    type: String,
    required: [true, "Please enter the Arabic location of the building"],
    trim: true,
    maxlength: [200, "Location cannot exceed 200 characters"],
  },
  city_en: {
    type: String,
    required: [true, "Please enter the English name of the city"],
    trim: true,
    maxlength: [100, "City name cannot exceed 100 characters"],
  },
  city_ar: {
    type: String,
    required: [true, "Please enter the Arabic name of the city"],
    trim: true,
    maxlength: [100, "City name cannot exceed 100 characters"],
  },
  goToLocation: {
    type: String,
  },
  description_en: {
    type: String,
    required: [true, "Please enter the English description of the building"],
  },
  description_ar: {
    type: String,
    required: [true, "Please enter the Arabic description of the building"],
  },
  title_en: {
    type: String,

    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  title_ar: {
    type: String,

    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  studio_en: {
    type: String,
    default: "Fully Furnished Studio",
  },
  studio_ar: {
    type: String,
    required: [true, "Please provide the Arabic studio details"],
    default: "استوديو مفروش بالكامل",
  },
  size_en: {
    type: String,
  },
  size_ar: {
    type: String,
  },
  paymentPlan_en: {
    type: String,
    default: "12 months installment",
  },
  paymentPlan_ar: {
    type: String,
    default: "تقسيط على 12 شهر",
  },
  downPayment_en: {
    type: String,
    default: "20% down payment",
  },
  downPayment_ar: {
    type: String,
    default: "20٪ دفعة مقدمة",
  },
  type_en: {
    type: String,
    required: [true, "Please provide the English type of the building"],
  },
  type_ar: {
    type: String,
    required: [true, "Please provide the Arabic type of the building"],
  },
  projectType_en: {
    type: String,
    required: [true, "Please provide the English project type of the building"],
  },
  projectType_ar: {
    type: String,
    required: [true, "Please provide the Arabic project type of the building"],
  },
  roomsCount: {
    type: Number,
    required: [true, "Please provide the number of rooms in the building"],
  },
  adders_en: {
    type: String,
  },
  adders_ar: {
    type: String,
  },
  status_en: {
    type: String,
    required: [true, "Please provide the English status of the building"],
  },
  status_ar: {
    type: String,
    required: [true, "Please provide the Arabic status of the building"],
  },
  image: {
    type: [String],
    required: [true, "Please upload images for the building"],
  },
  category_en: {
    type: String,
    required: [true, "Please provide the English category of the building"],
  },
  category_ar: {
    type: String,
    required: [true, "Please provide the Arabic category of the building"],
  },
  fishingDate: {
    type: Date,
    required: [true, "Please provide the fishing date of the building"],
  },
  features: {
    type: [String],
    required: [true, "Please provide the features of the building"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Building", buildingSchema);
