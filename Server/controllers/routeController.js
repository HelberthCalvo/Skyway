const RouteModel = require("../models/Route");

module.exports.get = async(req, res, next) => {
    const routeModel = await RouteModel.find().exec();
    res.json(routeModel);
};

module.exports.getById = async(req, res, next) => {
    const id = req.params.id;
    const routeModel = await RouteModel.findOne({_id:id}).exec();
    res.json(routeModel);
};

module.exports.create = (req, res, next) => {
    const { descrip, duration }  = req.body;
    const routeModel = new RouteModel (
        {
            descrip:descrip,
            duration:duration
        }
    );
    routeModel.save();
    res.json(routeModel);
};

module.exports.update = async(req, res, next) => {
    const { descrip, duration } = req.body;
    const routeModel = await RouteModel.findOneAndUpdate(
        {_id:req.params.id},
        { descrip, duration },
        {new:true}
    );
    res.json(routeModel);
};

module.exports.delete = async(req, res, next) => {
    const routeModel = await RouteModel.findByIdAndRemove(req.params.id);
    (routeModel)? res.json({result: `Ruta borrada, correctamente`, routeModel}) : res.json({result: "El id de la ruta es invalido Invalid", routeModel});
};

