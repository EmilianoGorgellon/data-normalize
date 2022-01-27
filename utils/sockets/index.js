let {Server: SocketIo} = require("socket.io");
let moment = require("moment");
const {config} = require("../../config");
// util
let inspect = require("../../helper/normalizr/util");
// denormalizr
let {denormalizrData} = require("../../helper/normalizr")
// fileSystem
const fs = require("fs");
// mongo
let {mensajeModel} = require("../../models/model/mensajes.model");
let {productoModel} = require("../../models/model/productos.model");
let {connection} = require("../../config/mongodb");
// firebase
let {db:firebaseDB} = require("../../utils/firebase");

let Mensaje = require("../../components/mensajes/services/dataMensajeService");
let Producto = require("../../components/productos/service/dataFormService");
let mensajes;
let producto;
if (config.db_name === "mongo") {
    mensajes = new Mensaje(mensajeModel, null, config.db_name);
    producto = new Producto(productoModel, null, config.db_name);    
} else if (config.db_name === "firebase") {
    mensajes = new Mensaje(firebaseDB, "mensajes", config.db_name);
    producto = new Producto(firebaseDB, "productos", config.db_name);
} else {
    mensajes = new Mensaje("./data/mensajes.txt", null, config.db_name);
    producto = new Producto("./data/productos.txt", null, null);
}
class Socket {
    static instancia;
    constructor(http){
        if (Socket.instancia){
            return Socket.instancia;
        }
        Socket.instancia = this;
        this.io = new SocketIo(http);
        this.mensajes = [];
        this.productos = [];
    }

    init() {
        try {
            this.io.on('connect', async socket => {
                this.mensajes = await this.readDataMensajes();
                inspect(this.mensajes)
                // await denormalizrData();
                this.productos = await this.readDataProducto();
                socket.emit("init", this.mensajes, this.productos)

                socket.on("chat_text", async data => {
                    // aca tengo que cambiar
                    data = {
                        ...data,
                        day: moment().format('L'),
                        hour: moment().format('LTS') 
                    }
                    console.log(data)
                    this.mensajes.push(data);
                    this.productos = await this.readDataProducto();
                    await this.sendMensaje(data);
                    this.io.sockets.emit('listenserver', this.mensajes, this.productos);
                })

                socket.on("addProduct", async data => {
                    this.productos = await this.readDataProducto();
                    this.io.sockets.emit('listenserver', this.mensajes, this.productos);
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
    async readDataMensajes () {
        return await mensajes.readMensajes();
    }
    async sendMensaje(data) {
        return await mensajes.insertMensaje(data);
    }
    async readDataProducto() {
        return await producto.readProductos();
    }
}

module.exports = Socket;