const FlightModel = require("../models/Flight");

module.exports.get = async(req, res, next) => {

    const flightModel = await FlightModel.find().
    populate({path: 'plane', populate:[{path: 'route'}, {path: 'schedule'}, {path: 'planetype'}]}).exec();
    res.json(flightModel);
};

module.exports.getById = async(req, res, next) => {
    const id = req.params.id;
    const flightModel = await FlightModel.findOne({_id:id}).populate({path: 'plane', populate:[{path: 'route'}, {path: 'schedule'}, {path: 'planetype'}]}).exec();
    res.json(flightModel);
};

module.exports.getByDate = async(req, res, next) => {
    const id = req.params.id;
    const bookingModel = await FlightModel.find({date:id}).
    populate({path: 'plane', populate:[{path: 'route'}, {path: 'schedule'}, {path: 'planetype'}]}).exec();
    res.json(bookingModel);
};

module.exports.create = (req, res, next) => {

    const flightModel = new FlightModel (req.body);
    flightModel.save();
    res.json(flightModel);
}

module.exports.delete =  async (req, res, next) => {
    const flightModel = await FlightModel.findByIdAndRemove(req.params.id);
    (flightModel)? res.json({result: 'Vuelo borrado, correctamente', flightModel}) : res.json({result: 'Id del comentario invalido invalid', flightModel});
}

module.exports.update = async (req, res, next) => {
    const { date, plane} = req.body;
    const flightModel = await FlightModel.findByIdAndUpdate(
        {_id:req.params.id},
        {date, plane},
        {new:true},
    );
    res.json(flightModel);
}