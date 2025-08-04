import express from 'express'
import { petRouter } from './pet/PetRoutes.js'

const app = express()
app.use(express.json())

//pet -> /api/pets/

//post /api/pets -> crear nuevos pet
//delete /api/pets/:id -> borrar pet con id = :id
//put & patch /api/pets/:id -> modificar pet con id = :id


app.use('/api/pets', petRouter)


app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
}) 