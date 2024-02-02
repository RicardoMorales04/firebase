var express=require("express");
var cors=require("cors");
//var session =require("express-session");//Se almacenan en el servidor y no se ocupa comando para instalar porque ya es parte de expres
var session=require("cookie-session");
require("dotenv").config();
var path=require("path");
var rutas=require("./rutas/usuariosRutas");
var rutasP=require("./rutas/productosRutas");
var rutasUsuariosApis=require("./rutas/usuariosRutasApis");
var rutasProductosApis=require("./rutas/productosRutasApi");
const cookieSession = require("cookie-session");

var app=express();
app.set("view engine","ejs");
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(session({
    name:'session',
    keys:['jhfuijaojjf'],
    maxAge: 24 * 60 * 60 * 1000 //Tiempo de vida de la cookie por 1 Día
}));
app.use("/",express.static(path.join(__dirname,"/web")));
app.use("/",rutas);
app.use("/Productos",rutasP);
app.use("/",rutasUsuariosApis);
app.use("/",rutasProductosApis);

var port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port);
});