//Responsabilidad de encerder el servidor y conectar las piezas (CROS, JSON, imagens, rutas )

import express from "express"
import cors from "cors"
import rutasArticulos from "rutasArticulos.js"
import {carptea_imagenes} from "carpeta_imagen"

const aplicacion = express ()
    const puerto = 3000

    aplicacion. use (cors())
    aplicacion. use (express.json())
    aplicacion. use ("/uploads", express.static(carptea_imagenes))
    aplicacion. use ("/api/articulos", rutasArticulos)
    
    

    //Error de multer (archivo demasioado grande,etc. )
    aplicacion. use ((error,peticion, respuesta,siguiente)=>{
        const mensaje = error.code === "LIMIT_FILE_SIZE"
        ? "la imagen es demaciado pesad (maximo 2 MB)"
        :error.mensaje
    respuesta.status(400).json({error:mensaje})
    }) 

    aplicacion.listen(puerto, ()=>console.log(`servidor corriendo en http://localhost:${puerto}`))



