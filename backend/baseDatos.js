// Respondabilidad: conectarse a MySQL. por lo tanto ningun otro archivo conoce la contraseña ni el nombre de la base de datos 
import mysql from "mysql2/promise"

//un "pool"(piscina) reutilza conexiones abiertas 

export const baseDatos = mysql. createPool ({
    host:process.env.DB_HOST ?? "localhost",
    user:process.env.DB_user ?? "root",
    password:process.env.DB_password ?? "root", //escribir la clave del gestor de sql 
    database:process.env.DB_database ?? "tienda",
})
