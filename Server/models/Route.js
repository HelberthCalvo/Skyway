const { model, Schema } = require("mongoose");

const RouteSchema = new Schema(
  {
    descrip: String,
    duration: Number,
  },
  { timestams: true }
);

const RouteModel = model("Route", RouteSchema);

module.exports = RouteModel;
