import express from "express";

const app = express();

app.use(express.json());

import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "databasesql",
  user: "root",
  password: "mysecretpassword",
  port: 3306,
  database: "test1db",
});

import mongoose from "mongoose";


// Define un endpoint para verificar la conexión a MySQL
// Define un endpoint para verificar la conexión a MySQL
app.get("/check-mysql-connection", async (req, res) => {
    try {
      const result = await pool.query("SELECT 1");
      res.status(200).json({ message: "Conexión exitosa a MySQL" });
    } catch (error) {
      
      res.status(500).json({error:error});
    }
  });
  

// Configura los detalles de conexión a la base de datos MongoDB
mongoose
  .connect("mongodb://databasemongo:27017/test1db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión exitosa a la base de datos MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos MongoDB: ", error);
  });

// Define un endpoint para verificar la conexión a MongoDB
app.get("/check-mongodb-connection", (req, res) => {
  const db = mongoose.connection;
  if (db.readyState === 1) {
    res.status(200).json({ message: "Conexión exitosa a MongoDB" });
  } else {
    res.status(500).json({ error: "Error al verificar la conexión a MongoDB" });
  }
});

app.listen(3000, () => {
  console.log("Server on port 3000");
});
