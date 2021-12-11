const PlaneTypeModel = require("../models/PlaneType");

module.exports.get = async(req, res, next) => {
    const planetypeModel = await PlaneTypeModel.find().exec();
    res.json(planetypeModel);
};

module.exports.getById = async(req, res, next) => {
    const id = req.params.id;
    const planetypeModel = await PlaneTypeModel.findOne({_id:id}).exec();
    res.json(planetypeModel);
};

module.exports.create = (req, res, next) => {
    const { year, model, brand, qtypassengers, qtyrows, qtyseats} = req.body;
    const planetypeModel = new PlaneTypeModel(
        {
            year:year,
            model:model,
            brand:brand,
            qtypassengers:qtypassengers,
            qtyrows:qtyrows,
            qtyseats:qtyseats,
        }
    );
    planetypeModel.save((error, response) => {
        if(error){
            console.log(error)
        } else {
            console.log("succesfull inserted : ", response)
        }
    });
    res.json(planetypeModel);
};

module.exports.update = async(req, res, next) => {
    const { year, model, brand, qtypassengers, qtyrows, qtyseats } = req.body;
    const planetypeModel = await PlaneTypeModel.findOneAndUpdate(
        {_id:req.params.id},
        { year, model, brand, qtypassengers, qtyrows, qtyseats },
        {new:true},
    );
    res.json(planetypeModel);
};

module.exports.delete = async(req, res, next) => {
    const planetypeModel = await PlaneTypeModel.findByIdAndRemove(req.params.id);
    (planetypeModel)? res.json({result: "Tipo de avion borrado, correctamente", planetypeModel}): res.json({result: "Id del tipo de avion invalido Invalid", planetypeModel});
};