var ruta=require("express").Router();
var subirArchivo = require("../middlewares/subirArchivo");
var {mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarPorID, borrarUsuario, login}=require("../bd/usuariosBD");

ruta.get("/",(req,res)=>{
  res.render("usuarios/login");
});

ruta.post("/login",async(req,res)=>{
 // console.log(req.body);
  var user = await login(req.body);
  if(user==undefined){
    res.redirect("/");
  }
  else{
    req.session.usuario=req.body.usuario;
    console.log(req.session.usuario);
    console.log(req.body);
    res.redirect("/mostrar");
  }
});

ruta.get("/logout",(req,res)=>{
  req.session = null;
  res.redirect("/");
});

ruta.get("/mostrar",async(req,res)=>{
  console.log(req.session.usuario);
  if(req.session.usuario){
  var usuarios = await mostrarUsuarios();
  res.render("usuarios/mostrar",{usuarios:usuarios});
  }
  else{
    res.redirect("usuarios/login");
  }
});

ruta.get("/nuevoUsuario",async(req,res)=>{
    res.render("usuarios/nuevo");
});

ruta.post("/nuevoUsuario",subirArchivo(),async(req,res)=>{
    //console.log(req.file);
    req.body.foto=req.file.originalname;
    //console.log(req.body.foto);
    var error = await nuevoUsuario(req.body);
    //res.end();
    res.redirect("/");
});

ruta.get("/editar/:id",async(req,res)=>{
    var user = await buscarPorID(req.params.id);
    //res.end();
    //console.log(user);
    res.render("usuarios/modificar",{user});
});

ruta.post("/editar", subirArchivo(), async (req, res) => {
  if(req.file!=undefined){
    req.body.foto=req.file.originalname; 
  }
  else{
    req.body.foto=req.body.fotoVieja;
  }
    var error = await modificarUsuario(req.body);
    res.redirect("/");
  });

ruta.get("/borrar/:id",async (req,res)=>{
    await borrarUsuario(req.params.id);
    res.redirect("/");
});


module.exports=ruta;