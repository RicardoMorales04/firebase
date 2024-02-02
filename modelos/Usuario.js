class Usuario{
    constructor(id,data){
        //console.log("hkajshs");
        //console.log(data);
        this.bandera=0;
        this.id=id;
        this.nombre=data.nombre;
        this.usuario=data.usuario;
        this.password=data.password;
        this.salt=data.salt;
        this.foto=data.foto;
    }

    set id(id){
        if(id!=null)
        id.length>0?this._id=id:this.bandera=1;
    }
    set nombre(nombre){
        //console.log(nombre);
        nombre.length>0?this._nombre=nombre:this.bandera=1;
        //console.log(this._nombre);
    }
    set usuario(usuario){
        //console.log(usuario);
        usuario.length>0?this._usuario=usuario:this.bandera=1;
        //console.log(this._usuario);
    }
    set password(password){
        //console.log(password);
        password.length>0?this._password=password:this.bandera=1;
        //console.log(this._password);
    }
    set salt(salt){
        //console.log(password);
        salt.length>0?this._salt=salt:this.bandera=1;
        //console.log(this._password);
    }
    set foto(foto){
        //console.log(foto);
        foto.length>0?this._foto=foto:this.bandera=1;
        //console.log(this._foto);
    }
    
    set admin(admin){
        admin.length>0?this._admin=admin:this.bandera=1;
    }

    get id(){
        return this._id;
    }
    get nombre(){
        return this._nombre;
    }
    get usuario(){
        return this._usuario;
    }
    get password(){
        return this._password;
    }
    get salt(){
        return this._salt;
    }
    get foto(){
        return this._foto;
    }
    get obtenerDatos(){
        if(this._id!=null)
            return {
                id:this.id,
                nombre:this.nombre,
                usuario:this.usuario,
                password:this.password,
                salt:this.salt,
                foto:this.foto
            }
            else{
                return {
                    nombre:this.nombre,
                    usuario:this.usuario,
                    password:this.password,
                    salt:this.salt,
                    foto:this.foto
                } 
            }
    }
}

module.exports=Usuario;
