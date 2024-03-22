import Tours from "../models/tours.model.js";

//finding all products
const get_all_Products = async (req, res) => {
  try {
    const allTours = await Tours.find({});
    res.status(200).json({
      success: true,
      message: "all tours",
      tours: allTours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "tour not found",
      error: error.messages,
    });
  }
};

//finding tour by id
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tours.findById(id);
    res.status(200).json({
      succes: true,
      message: " tour found",
      tour,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "requested tour not found",
      error: error.message,
    });
  }
};

//updating
const tourUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTour = await Tours.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      succes: true,
      message: " tour updated!",
      tour: updatedTour,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "tour not updated",
      error: error.message,
    });
  }
};

//find by id and delete
const tourDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTour = await Tours.findByIdAndDelete(id, req.body);
    res.status(200).json({
      succes: true,
      message: " tour deleted",
      tour: deletedTour,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "tour not deleted",
      error: error.message,
    });
  }
};

//sending data to the database:
const tourPost = async (req, res) => {
  try {
    const created_Tour = await Tours.create(req.body);
    res.status(201).json({
      success: true,
      message: "tour created",
      Tours: created_Tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: " tour not created",
      error: error.message,
    });
  }
};

export { get_all_Products, tourDelete, tourPost, tourUpdate, singleProduct };
