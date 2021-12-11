const { model, Schema } = require("mongoose");

const FlightSchema = new Schema(
  {
    date: String,
    plane: {
      type: Schema.Types.ObjectId,
      ref: "Plane",
      required: true,
    },
  },
  { timestamps: true }
);

const FlightModel = model("Flight", FlightSchema);

module.exports = FlightModel;
