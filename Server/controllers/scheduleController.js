const ScheduleModel = require("../models/Schedule");

module.exports.get = async(req, res, next) => {
    const scheduleModel = await ScheduleModel.find().exec();
    res.json(scheduleModel);
};

module.exports.getById = async(req, res, next) => {
    const id = req.params.id;
    const scheduleModel = await ScheduleModel.findOne({_id:id}).exec();
    res.json(scheduleModel);
};

module.exports.create = (req, res, next) => {
    const { day, arrivedhour, price } = req.body;
    const scheduleModel = new ScheduleModel(
        {
            day:day,
            arrivedhour:arrivedhour,
            price:price
        }
    );
    scheduleModel.save();
    res.json(scheduleModel);
}

module.exports.update = async(req, res, next) => {
    const { day, arrivedhour, price } = req.body;
    const scheduleModel = await ScheduleModel.findOneAndUpdate(
        {_id:req.params.id},
        { day, arrivedhour, price},
        {new:true}
    );
    res.json(scheduleModel);
}

module.exports.delete = async(req, res, next) => {
    const scheduleModel = await ScheduleModel.findByIdAndRemove(req.params.id);
    (scheduleModel)? res.json({result: `Horario borrado, correctamente`, scheduleModel}) : res.json({result: "El id del horario es invalido Invalid", scheduleModel});
}