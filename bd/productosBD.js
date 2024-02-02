var conexionP = require("../bd/conexion").conexionP;
var Producto = require("../modelos/Producto");
const fs = require('fs');

async function mostrarProductos() {
    var productos = [];
    try {
        var productosBD = await conexionP.get();
        productosBD.forEach(productoBD => {
            const prod = new Producto(productoBD.id, productoBD.data());
            console.log(prod);
            if (prod.bandera == 0) {
                productos.push(prod.obtenerDatosP);
                console.log(" " + prod.obtenerDatosP);
            }
        });
    } catch (err) {
        console.log("Error al recuperar el producto de la BD " + err);
    }
    return productos;
}

async function buscarPorID(id){
    var produ;
   // console.log(id);
    try{
        var producto = await conexionP.doc(id).get();//Aqui se manda el registro que se consiga con ese id
       // console.log(producto);
        var productoObjeto=new Producto(producto.id,producto.data());
        //console.log(productoObjeto);
        if(productoObjeto.bandera==0){
            //console.log(productoObjeto.obtenerDatos);
            produ=productoObjeto.obtenerDatosP;
           //s console.log(produ);
       } 
    }
    catch(err){
        console.log("Error al recuperar el producto "+err);
    }
    console.log(produ);
    return produ;
}

async function nuevoProducto(datos){
    var prod=new Producto(null,datos);
    var error=1;
    if(prod.bandera == 0){
        try{
            await conexionP.doc().set(prod.obtenerDatosP);
            console.log("Producto insertado a la BD");
            error=0;
        }
        catch(err){
            console.log("Error al capturar al nuevo Producto "+err);
        }
    }
    return error;
}

async function modificarProducto(datos){
    var error = 1;
    var producto = await buscarPorID(datos.id);

    if (producto) {
        try {
            await conexionP.doc(producto.id).set(datos);
            console.log("Registro actualizado");
            error = 0;
        } catch (err) {
            console.log("Error al modificar el producto: " + err);
        }
    } else {
        console.log("El producto no existe o el ID no es válido.");
    }
    return error;
}


async function borrarProducto(id){
    try {
        const producto = await buscarPorID(id);
        if (producto && producto.foto) {
            // Borra el archivo de la foto si existe
            fs.unlinkSync(`web/images/${producto.foto}`);
            await conexionP.doc(id).delete();
            console.log("Registro y foto borrados");
        } else {
            console.log("El producto no existe o no tiene una foto asociada.");
        }
    } catch (err) {
        console.log("Error al borrar el producto o la foto: " + err);
    }
}


module.exports = {
    mostrarProductos,
    nuevoProducto,
    buscarPorID,
    modificarProducto,
    borrarProducto
};
