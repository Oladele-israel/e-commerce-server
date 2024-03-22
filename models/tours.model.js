import mongoose from "mongoose";
const tour_Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "you must enter a tour"],
    },

    rating: {
      type: Number,
      required: false,
    },

    price: {
      type: Number,
      required: [true, " you must enter a tour price"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Tours = mongoose.model("Tour", tour_Schema);
export default Tours;
