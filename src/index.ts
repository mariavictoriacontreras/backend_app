import express from 'express';
import usuarioRoutes from "./routes/usuarios";

const app = express();
const PORT = 3000;

app.use(express.json()); 

app.get('/', (_req, res) => {
  res.send('Hola Mundo desde Node.js + TypeScript!');
});


app.get("/test", (_req, res) => {
  res.send("Ruta de test OK");
});
app.use("/usuarios", usuarioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
