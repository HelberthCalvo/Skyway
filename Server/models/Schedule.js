const {model, Schema} = require("mongoose");


const ScheduleSchema = new Schema(
    {
       day: String,
       arrivedhour: String,
       price: Number,
    },
    { timestamps: true }
);

const ScheduleModel = model("Schedule", ScheduleSchema);

module.exports = ScheduleModel;
