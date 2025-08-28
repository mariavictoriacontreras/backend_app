import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "root", 
  database: "tp_backend" 
});

connection.connect((err) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("Conectado");
});

export default connection;
