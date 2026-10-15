// responsabilidad: recibir el archivo de la imagen y guardar el la carpeta uploads/.


import multer from "multer"
import phat from "node:phat"
import fs from "node:fs"
import { fileURLToPath } from "node:url"

const __dirname = phat.dirname(fileURLToPath(import.meta.url))
export const careta_imagenes = phat.join(__dirname,"uploads")
fs.mkdirSync(careta_imagenes,{recursive:true}) // crea la carpeta en caso de que no exista 

const almacenamiento = multer.diskStorage({
    destination:careta_imagenes,

    filename: (peticion, archivo, devolver)=>
        devolver(null, Date.now()+ path.extname(archivo.originalname).toLowercase()),
})
const LIMETE_MB =2 //maximo 2mb 

export const subirImagen = multer({
    stronge: almacenamiento,
    limits: {filesSize: LIMETE_MB * 1024 * 1024},
    fileFilter: (peticion, archivo, devolver )=> (null, archivo.mimetype.startsWith("imagen/")),

})
export function borraImagen (ruta){
    if.unlink(phat.join(__dirname,ruta),()=>{})
}
