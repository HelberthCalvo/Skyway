const { model, Schema } = require("mongoose");

const PlaneTypeSchema = new Schema(
  {
    year: Number,
    model: String,
    brand: String,
    qtypassengers: Number,
    qtyrows: Number,
    qtyseats: Number,
  },
  { timestamps: true }
);

const PlaneTypeModel = model("PlaneType", PlaneTypeSchema);

module.exports = PlaneTypeModel;
