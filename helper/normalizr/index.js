let {schema, normalize, denormalize} = require("normalizr");
// let inspect = require("./util");
// class DataNormalizr {
//     constructor(dataMsj){
//         this.dataMsj = dataMsj
//     }
//     async sendDataNormalizr() {
//         let data = {
//             id: "mensajes",
//             mensajes: this.dataMsj
//         }
//         const mensajes = new schema.Entity("mensaje");
//         const organigrama = new schema.Entity('organigrama', {
//             author: [mensajes]
//         })
//         let mensajeNormalizado = normalize(data, organigrama);
//         // console.log("VA A MOSTAR EL MENSAJE NORMALIZADO")
//         // inspect(mensajeNormalizado)
//         return mensajeNormalizado;
//     }
//     async denormalizrData() {
//         let mensajeNormalizado = await sendDataNormalizr();
//         console.log("denormalizr")
//     }
    
// }

const sendDataNormalizr = async (dataMsj, denormalize) => {
    let data = {
        id: "mensajes",
        mensajes: dataMsj
    }
    const mensajes = new schema.Entity("mensaje");
    const organigrama = new schema.Entity('organigrama', {
        author: [mensajes]
    })
    let mensajeNormalizado = normalize(data, organigrama);
    // console.log("VA A MOSTAR EL MENSAJE NORMALIZADO")
    // inspect(mensajeNormalizado)
    console.log("mando data normalizada")
    if (!denormalize) return mensajeNormalizado
    
}

const denormalizrData = async () => {
    console.log("denormalizr")
}

module.exports = {sendDataNormalizr, denormalizrData}

