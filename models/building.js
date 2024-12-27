const mongoose = require("mongoose");
const { User } = require("./user");

const buildingSchema = new mongoose.Schema({
  name_en: {
    type: String,
    // required: [true, "Please enter the English name of the building"],
    trim: true,
    minlength: [3, "Building name cannot be less than 3 characters"],
    maxlength: [100, "Building name cannot exceed 100 characters"],
  },
  name_ar: {
    type: String,
    // required: [true, "Please enter the Arabic name of the building"],
    trim: true,
    minlength: [3, "Building name cannot be less than 3 characters"],
    maxlength: [100, "Building name cannot exceed 100 characters"],
  },
  types: [
    {
      type_en: {
        type: String,
        required: [true, "Please provide the English type of the building"],
      },
      type_ar: {
        type: String,
        required: [true, "Please provide the Arabic type of the building"],
      },
      bedrooms: {
        type: String,
        required: [true, "Please provide the number of bedrooms"],
      },
    },
  ],
  status_en: {
    type: String,
    required: [true, "Please provide the English status of the building"],
  },
  status_ar: {
    type: String,
    required: [true, "Please provide the Arabic status of the building"],
  },
  starting_price: {
    type: Number,
    required: [true, "Please enter the price of the building"],
    default: 0.0,
  },
  city_en: {
    type: String,
    // required: [true, "Please enter the English name of the city"],
    trim: true,
    maxlength: [100, "City name cannot exceed 100 characters"],
  },
  city_ar: {
    type: String,
    // required: [true, "Please enter the Arabic name of the city"],
    trim: true,
    maxlength: [100, "City name cannot exceed 100 characters"],
  },
  size_en: {
    type: String,
  },
  size_ar: {
    type: String,
  },
  paymentPlan: {
    type: String,
    default: "12 months installment",
  },
  downPayment: {
    type: Number,
  
  },
  description_en: {
    type: String,
    required: [true, "Please enter the English description of the building"],
  },
  description_ar: {
    type: String,
    required: [true, "Please enter the Arabic description of the building"],
  },
  images: {
    type: [String],
    // required: [true, "Please upload images for the building"],
  },
  category_en: {
    type: String,
    // required: [true, "Please provide the English category of the building"],
  },
  category_ar: {
    type: String,
    // required: [true, "Please provide the Arabic category of the building"],
  },
  hand_over_en: {
    type: String,
    // required: [true, "Please provide the fishing date of the building"],
  },
  hand_over_ar: {
    type: String,
    // required: [true, "Please provide the Arabic fishing date of the building"],
  },
  developer_en: {
    type: String,
    required: [true, "Please provide the English developer name"],
  },
  developer_ar: {
    type: String,
    required: [true, "Please provide the Arabic developer name"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
});

module.exports = mongoose.model("Building", buildingSchema);
