class Producto {
    constructor(id, data) {
        this.bandera = 0;
        this._id = id;
        this._nombreP = data.nombreP;
        this._numSerie = data.numSerie;
        this._cantidad = data.cantidad;
        this._foto = data.foto;
    }

    set id(id) {
        if (id != null)
            id.length > 0 ? this._id = id : this.bandera = 1;
    }

    set nombreP(nombreP) {
        nombreP.length > 0 ? this._nombreP = nombreP : this.bandera = 1;
    }

    set numSerie(numSerie) {
        numSerie.length > 0 ? this._numSerie = numSerie : this.bandera = 1;
    }

    set cantidad(cantidad) {
        cantidad.length > 0 ? this._cantidad = cantidad : this.bandera = 1;
    }
    set foto(foto) {
        foto.length > 0 ? this._foto = foto : this.bandera = 1;
    }

    get obtenerDatosP() {
        if (this._id != null) 
            return {
                id: this._id,
                nombreP: this._nombreP,
                numSerie: this._numSerie,
                cantidad: this._cantidad,
                foto: this._foto
            }
        else {
            return {
                nombreP: this._nombreP,
                numSerie: this._numSerie,
                cantidad: this._cantidad,
                foto: this._foto
            }
        }
    }
}

module.exports = Producto;
