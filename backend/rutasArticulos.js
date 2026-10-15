
import { Router } from "express";  
import {baseDatos} from "./baseDatos.js"
import {subirImagenes, borrarImagenes} from "./subirImagenes.js"

const rutas = Router()


const conManejoDeError = funcion => (peticion,respuesta) =>
    funcion(peticion,respuesta).catch(error=>{
        console.error(error)
        respuesta.status(500).json({error: "Error del servidor:" + error.menssage })
    })

function leercampos (cuerpo){
    const articulo ={
        nombre: (cuerpo.nombre??"").trim(),
        precio_compra: Number(cuerpo.precio_compra),
        precio_venta: Number (cuerpo.precio_venta),
        stock_minimo: Number (cuerpo.stock_minimo),
        stock_maximo: Number (cuerpo.stock_maximo),
    }
    let mesajeError = null
    if(!articulo.nombre) mensajeError="el nombre es obligatorio"
    else if (!(articulo.precio_compra >=0) || !(precio.precio_venta >=0)) mensajeError="los precios deben ser positivos"
    else if (!(articulo.stock_minimo >=0) || !(precio.stock_maximo >=0)) mensajeError="el stok  deben ser positivos"
    else if (articulo.stock_minimo >articulo.stock_maximo)mensajeError= "el stock minimo no puede ser mayor a el stock maximo "
    return{articulo, mensajeError}
    
}

// lista (Read) Todos los articulos 

rutas.get ("/", conManejoDeErrores(async(peticion, respuesta)=>{
    const [filas] = await baseDatos.query("SELECT * FROM  articulos  ORDER  BY  id  DESC")
    respuesta.json(filas)
}))
//lita uno  por su id 
rutas.get("/:id", conManejoDeError(async(peticion,respuesta)=>{
    const[filas] = await baseDatos.query("SELECT * FROM articulos wHERE id = ? ", [peticion.paramas.id])
    if (!filas.length) return respuesta.status (404).json ({error: "Articulo no encontrado"})
        respuesta.json(filas[0])
}))

// crear el formulario llega con multipart 
rutas.post ("/", subirImagenes.single ("imagenes"),conManejoDeErrores(async(peticion,respuesta)=>{
    const {articulo,mensajeError}=leercampos(peticion.body)
    if (mensajeError) {
        if (peticion.file) borrarImagenes( "/uploads/" + peticion.file.filename )
            return respuesta.status(400).json({error: mensajeError})
    }
    const imagen = peticion.file ? "/uploads/" +peticion.file.filename : null 
    const[resltado] = await baseDatos.query(
        `INSERT INTO articulos (nombre, descripcion, precio_compra, precio_venta, stock_minimo, stock_maximo, imagen )
        VALUES(?,?,?,?,?,?,?)`,
        [articulo.nombre, articulo.descrpcion, articulo.precio_compra, articulo.precio_venta,articulo.stock_minimo,articulo.stock_maximo,imagen],

    )
    respuesta.status(201).json({id:resultado.insertId, ... articulo, imagen})
}))

//editar (update) si no se envia una imagen nueva, se conseva la anterior 
rutas.put  ("/:id", subirImagenes.single("imagen"),conManejoDeError(async(peticion,respuesta)=>{
    const imagenNueva = peticion.file  ? "/uploads/" +peticion.file.filename : null 
    const [filas] = await baseDatos.query ("SELECT * FROM  articulos WHERE id =? ", [peticion.params.id ])
    if (!filas.length) {}
}))