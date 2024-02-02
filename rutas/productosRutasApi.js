var rutaP=require("express").Router();
var { mostrarProductos, nuevoProducto, modificarProducto, buscarPorID, borrarProducto }=require("../bd/productosBD");
const subirArchivo = require("../middlewares/subirArchivo");
const fs = require('fs').promises;

rutaP.get("/api/mostrarProductos", async(req,res)=>{
    var productos = await mostrarProductos();
    if(productos.length>0)
    res.status(200).json(productos);
    else
        res.status(400).json("No hay productos");
});
    
rutaP.post("/api/nuevoProducto",subirArchivo(),async(req,res)=>{
    req.body.foto = req.file.originalname;
    var error = await nuevoProducto(req.body);
    if(error==0){
        res.status(200).json("Producto Registrado");
    }
    else{
        res.status(400).json("Datos Incorrectos");
    }
});

rutaP.get("/api/editarP/:id",async(req,res)=>{
    var producto = await buscarPorID(req.params.id);
    if(producto==""){
        res.status(400).json("No se encontro ese Producto");
    }
    else{
        res.status(200).json(producto);
    }
});

rutaP.post("/api/editarP",subirArchivo(),async(req,res)=>{
    try {
        const { id, borrar } = req.body;
        const productoAnterior = await buscarPorID(id);
        const fotoAnterior = productoAnterior ? productoAnterior.foto : null;
    
        if (req.file) {
          if (fotoAnterior) {
            await fs.unlink(`./web/images/${fotoAnterior}`);
          }
          req.body.foto = req.file.originalname;
        }
        var error = await modificarProducto(req.body);
        if (borrar === "true") {
          if (fotoAnterior) {
            await fs.unlink(`./web/images/${fotoAnterior}`);
          }
          await borrarProducto(id);
        }

        if (error === 0) {
          res.status(200).json("Producto actualizado");
        } else {
          res.status(400).json("Error al actualizar el producto");
        }
      } catch (error) {
        console.error('Error al editar la foto o producto:', error);
        res.status(500).send("Error al editar la foto o producto");
      }
});


rutaP.get("/api/borrarP/:id",async (req,res)=>{
    var error = await borrarProducto(req.params.id);
    if(error == 0){
        res.status(400).json("Error al borrar el producto");
    }
    else{
      res.status(200).json("Producto borrado"); 
    }
});

module.exports = rutaP;