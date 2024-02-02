var rutaP=require("express").Router();
var subirArchivo = require("../middlewares/subirArchivo");
var { mostrarProductos, nuevoProducto, modificarProducto, buscarPorID, borrarProducto }=require("../bd/productosBD");
const fs = require('fs').promises;

rutaP.get("/mostrarProductos", async(req,res)=>{
    var productos = await mostrarProductos();
    res.render("productos/mostrarProductos",{productos:productos});
});

rutaP.get("/nuevoProducto",async(req,res)=>{
    res.render("productos/nuevosProductos");
});
    
rutaP.post("/nuevoProducto",subirArchivo(),async(req,res)=>{
    req.body.foto=req.file.originalname;
    var error = await nuevoProducto(req.body);
    res.redirect("/productos/mostrarProductos");
});

rutaP.get("/editarP/:id",async(req,res)=>{
    var producto = await buscarPorID(req.params.id);
    res.render("productos/editar",{producto});
});

rutaP.post("/editarP",subirArchivo(),async(req,res)=>{
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
    
        res.redirect("/productos/mostrarProductos");
      } catch (error) {
        console.error('Error al editar la foto o producto:', error);
        res.status(500).send("Error al editar la foto o producto");
      }
});


rutaP.get("/borrarP/:id",async (req,res)=>{
    await borrarProducto(req.params.id);
    res.redirect("/productos/mostrarProductos");
});

module.exports = rutaP;