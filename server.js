import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connenctDB from "./db/db.js"
import TaskRoutes from "./routes/TaskRoutes.js"
import UserRoutes from "./routes/userRoutes.js"

dotenv.config()
connenctDB()
const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/users", UserRoutes)
app.use("/api", TaskRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("server running at port", PORT))