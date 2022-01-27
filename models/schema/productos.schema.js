let joi = require("joi");
// let id = joi.number();
let nombre = joi.string().min(3);
let foto = joi.string().min(3);
let precio = joi.number();

let productosSchema = {
    // id: id.required(),
    nombre: nombre.required(),
    precio: precio.required(),
    foto: foto.required()
}

module.exports = {productosSchema}
