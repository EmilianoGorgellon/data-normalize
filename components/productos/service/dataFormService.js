class Producto {
    constructor(db_client, db_collection, db_name){
        this.db_client = db_client;
        this.db_collection = db_collection;
        this.db_name = db_name
    }
    async insertProducto(body){
        try {
            let data = {
                ...body
            }
            console.log(data)
            if (this.db_name === "mongo") {
                console.log("es mongo");
                // return await this.db_client.insertOne(data);
                return [];
            } else if (this.db_name === "firebase") {
                console.log("es firebase")
                return [];
            }
            console.log("es fs");
            return [];
        } catch (error) {
            console.log("Hubo error en catch de insertproudcot en producot")
        }
    }
    async readProductos() {
        // return await this.db.from(`${this.db_name}`);
        try {
            if (this.db_name === "mongo") {
                console.log("read products de mongo");
                return [];
            } else if (this.db_name === "firebase") {
                console.log("read products de firebase")
                return [];
            }
            console.log("read produts de fs")
            return [];
        } catch (error) {
            console.log("Hya error en readprorudtos ")
        }
    }
}

module.exports = Producto;