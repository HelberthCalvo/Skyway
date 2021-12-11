const PlaneModel = require("../models/Plane");

module.exports.get = async(req, res, next) => {
    const planeModel = await PlaneModel.find().
    populate([{path: 'route'}, {path: 'schedule'}, {path: 'planetype'}]).exec();
    res.json(planeModel);
};

module.exports.getById = async(req, res, next) => {
    const id = req.params.id;
    const planeModel = await PlaneModel.findOne({_id:id}).
    populate([{path: 'route'}, {path: 'schedule'}, {path: 'planetype'}]).exec();
    res.json(planeModel);
};

module.exports.create = (req, res, next) => {
    const { descrip, route, schedule, planetype} = req.body;
    const planeModel = new PlaneModel(
        {
            descrip:descrip,
            route:route,
            schedule:schedule,
            planetype:planetype,
        }
    );
    planeModel.save();
    res.json(planeModel);
};

module.exports.update = async(req, res, next) => {
    const { descrip, route, schedule, planetype } = req.body;
    const planeModel = await PlaneModel.findOneAndUpdate(
        {_id:req.params.id},
        { descrip, route, schedule, planetype },
        {new:true},
    );
    res.json(planeModel);
}

module.exports.delete = async (req, res, next) => {
    const planeModel = await PlaneModel.findByIdAndRemove(req.params.id);
    (planeModel)? res.json({result: 'Avion borrado, correctamente', planeModel}): res.json({result: 'Id del avio invalido Invalid', planeModel});
};



