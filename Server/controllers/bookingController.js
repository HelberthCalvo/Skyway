const BookingModel = require("../models/Booking");

module.exports.get = async(req, res, next) => {
    const bookingModel = await BookingModel.find().
    populate([{path: 'user'}, {path: 'flight', populate:[{path: 'plane'}]}]).exec();
    res.json(bookingModel);
};

module.exports.getById = async(req, res, next) => {
    const id = req.params.id;
    const bookingModel = await BookingModel.findOne({_id:id}).
    populate([{path: 'user'}, {path: 'flight'}]).exec();
    res.json(bookingModel);
};

module.exports.getByFlight = async(req, res, next) => {
    const id = req.params.id;
    const bookingModel = await BookingModel.find({flight:id})
    .populate([{path: 'user'}, {path: 'flight'}]).exec();
    res.json(bookingModel);
};
module.exports.getByUser = async(req, res, next) => {
    const id = req.params.id;
    const bookingModel = await BookingModel.find({user:id})
    .populate([{path: 'user'}, {path: 'flight'}]).exec();
    res.json(bookingModel);
};

module.exports.create = (req, res, next) =>{
    const { seat, qtypassengers, tax, subtotal, total, user, flight } = req.body;
    const bookingModel = new BookingModel(
        {
            seat: seat,
            qtypassengers: qtypassengers,
            tax: tax,
            subtotal: subtotal,
            total: total,
            user: user,
            flight: flight,
        }
    );
    bookingModel.save();
    res.json(bookingModel);
};

module.exports.delete = async (req, res, next) => {
    const bookingModel = await BookingModel.findByIdAndRemove(req.params.id);
    (bookingModel)? res.json({result: 'La reserva se ha borrado correctamente', bookingModel}): res.json({result: 'Id de reserva Invalido Invalid', bookingModel});
    
};

module.exports.update = async (req, res, next) => {
    const { seat, qtypassengers, tax, subtotal, total, user, flight } = req.body;
    const bookingModel = await BookingModel.findOneAndUpdate(
        { _id: req.params.id },
        { seat, qtypassengers, tax, subtotal, total, user, flight  },
        { new: true }
    );
    res.json(bookingModel);
};