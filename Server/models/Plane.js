const { model, Schema } = require("mongoose");

const PlaneSchema = new Schema(
  {
    descrip: String,
    route: {
      type: Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },

    schedule: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },

    planetype: {
      type: Schema.Types.ObjectId,
      ref: "PlaneType",
      required: true,
    },
  },
  { timestamps: true }
);

const PlaneModel = model("Plane", PlaneSchema);

module.exports = PlaneModel;
