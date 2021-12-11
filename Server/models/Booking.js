const { model, Schema } = require("mongoose");

const BookingSchema = new Schema(
  {
    seat: String,
    qtypassengers: Number,
    tax: Number,
    subtotal: Number,
    total: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    flight: {
      type: Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
  },
  { timestamps: true }
);

const BookingModel = model("Booking", BookingSchema);

module.exports = BookingModel;
