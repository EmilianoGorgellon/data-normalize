let {sendDataNormalizr} = require("../../../helper/normalizr");
class Mensaje {
    constructor(db_client, db_collection, db_name) {
        this.db_client = db_client;
        this.db_collection = db_collection;
        this.db_name = db_name
    }
    async readMensajes() {
        try {
            if (this.db_name === "mongo") {
                console.log("de mongo");
                let dataMsj = await this.db_client.find().select('-_id');;
                return sendDataNormalizr(dataMsj, false);
            } else if (this.db_name === "firebase"){
                console.log("firebase en emnsajes");
                // return await this.db_client.from(`${this.db_collection}`);
                return [];
            }
            console.log("fs");
            return [];
        } catch (error) {
            console.log("Error en read mensajes")
        }
    }
    async insertMensaje(body){
        try {
            let data = {
                author: {
                    id: body.id,
                    nombre: body.nombre,
                    apellido: body.apellido,
                    edad: body.edad,
                    alias: body.alias,
                    avatar: body.avatar
                },
                text: body.mensaje
            }
            if (this.db_name === "mongo") {
                console.log("Mongo");
                
                return await this.db_client.create(data);
                // return await this.db_client.insertOne(data)
            } else {
                console.log("firebase");
            }
        } catch (error) {
            console.log("Error en insert mensaje")
        }
    }
}

module.exports = Mensaje;