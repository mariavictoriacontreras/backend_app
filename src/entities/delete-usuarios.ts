import { Router } from "express";
import connection from "../database";
import { RowDataPacket, ResultSetHeader } from "mysql2";

const router = Router();
router.get("/ping", (_req, res) => {
  res.send("pong desde /usuarios/ping");
});

//  Traer todos los usuarios
router.get("/all", (req, res) => {
  connection
    .promise()
    .query<RowDataPacket[]>("SELECT * FROM usuarios")
    .then(([rows]) => {
      res.json(rows);
    })
    .catch((err: any) => {
      console.error("Error al obtener usuarios:", err);
      res.status(500).json({ error: "Error al obtener usuarios" });
    });
});

// Traer un usuario por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  connection
    .promise()
    .query<RowDataPacket[]>(
      "SELECT * FROM usuarios WHERE idUsuario = ?",
      [id]
    )
    .then(([rows]) => {
      if (rows.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(rows[0]);
    })
    .catch((err: any) => {
      console.error("Error al obtener usuario:", err);
      res.status(500).json({ error: "Error al obtener usuario" });
    });
});

// Crear un nuevo usuario
router.post("/", (req, res) => {
  const { nombreApellido, email, direccion, telefono } = req.body;

  connection
    .promise()
    .query<ResultSetHeader>(
      "INSERT INTO usuarios (nombreApellido, email, direccion, telefono) VALUES (?, ?, ?, ?)",
      [nombreApellido, email, direccion, telefono]
    )
    .then(([result]) => {
      res.status(201).json({
        message: "Usuario creado ",
        idUsuario: (result as ResultSetHeader).insertId,
        nombreApellido,
        email,
        direccion,
        telefono,
      });
    })
    .catch((err: any) => {
      console.error("Error al crear usuario:", err);
      res.status(500).json({ error: "Error al crear usuario" });
    });
});

//  Actualizar un usuario
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombreApellido, email, direccion, telefono } = req.body;

  connection
    .promise()
    .query<ResultSetHeader>(
      "UPDATE usuarios SET nombreApellido = ?, email = ?, direccion = ?, telefono = ? WHERE idUsuario = ?",
      [nombreApellido, email, direccion, telefono, id]
    )
    .then(([result]) => {
      if ((result as ResultSetHeader).affectedRows === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json({ message: "Usuario actualizado " });
    })
    .catch((err: any) => {
      console.error("Error al actualizar usuario:", err);
      res.status(500).json({ error: "Error al actualizar usuario" });
    });
});

// Eliminar un usuario
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  connection
    .promise()
    .query<ResultSetHeader>(
      "DELETE FROM usuarios WHERE idUsuario = ?",
      [id]
    )
    .then(([result]) => {
      if ((result as ResultSetHeader).affectedRows === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json({ message: "Usuario eliminado" });
    })
    .catch((err: any) => {
      console.error("Error al eliminar usuario:", err);
      res.status(500).json({ error: "Error al eliminar usuario" });
    });
});

export default router;
