const UserModel = require("../models/User");
const jwt = require('jsonwebtoken');

// Se obtiene las variables de entorno
const config = process.env;

module.exports.get = async(req, res, next) => {
    const userModel = await UserModel.find().exec();
    res.json(userModel);
};

module.exports.getById = async(req, res, next) => {
    const id = req.params.id;
    const userModel = await UserModel.findOne({_id:id}).exec();
    res.json(userModel);
};

module.exports.create = (req, res, next) => {
    const { username, password, role, name, lastname, email, birthday, address, workphone, mobile } = req.body;
    const userModel = new UserModel(
        {
            username:username,
            password:password,
            role:role,
            name:name,
            lastname:lastname,
            email:email,
            birthday:birthday,
            address:address,
            workphone:workphone,
            mobile:mobile
        }
    );
    userModel.save();
    res.json(userModel);
}

module.exports.update = async(req, res, next) => {
    const { username, password, role, name, lastname, email, birthday, address, workphone, mobile } = req.body;
    const userModel = await UserModel.findOneAndUpdate(
        {_id:req.params.id},
        { username, password, role, name, lastname, email, birthday, address, workphone, mobile},
        {new:true}
    );
    res.json(userModel);
}

module.exports.delete = async(req, res, next) => {
    const userModel = await UserModel.findByIdAndRemove(req.params.id);
    (userModel)? res.json({result: `Usuario borrado correctamente`, userModel}) : res.json({result: "El id del usuario es inválido", userModel});
};

module.exports.signup = async (req, res, next) => {
    const { username, password, name, lastname, email, birthday, address, workphone, mobile  } = req.body;
    if(!username || !password){
        res.json({ success: false, msg: 'Por favor ingrese el usuario y la contraseña.'});
    } else {
        var newUser = new UserModel({ username: username, password: password, name: name, lastname: lastname, email: email, birthday: birthday, address: address, workphone: workphone, mobile:mobile });
        // save the user
        newUser.save(function(err){
            if(err) {
                return res.json({ success: false, msg: 'El usuario ya existe.'});
            }
            res.json({ success:true, msg: 'Se ha registrado correctamente'});
        });
    }
}

module.exports.signin = async (req, res, next) =>{

    const {username, password} = req.body;

    const user = await UserModel.findOne({ username: username }).exec();

    if(!user) {
        res.status(401).send({ success: false, msg: 'El usuario ingresado no existe'});
    } else {
        //Si el usuario existe, verifica si las contraseñas
        user.comparePassword(password, user.password, function(err, isMatch){
            if(isMatch && !err){
                // Si el usuario es correcto y la contraseña coincide, se procede a crear el token
                const token = jwt.sign(
                    {username: username},
                    config.SECRETWORDJWT,
                    { expiresIn: "2h" }
                );
                // return the information including token as JSON
                const payload = {role: user.role, username: user.username, _id: user._id };
                res.json ({ success: true, token, user: payload, msg: 'El inicio de sesión fue exitoso'});
            } else {
                //si la contraseña no coincide se procede a indicar el error
                //res.status(401).send({ success:false, msg: 'Authentication failed. Wrong password'});
                res.json({ success: false, msg: 'La contraseña ingresada es incorrecta'});
            }
        })
    }
}
