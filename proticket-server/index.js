const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
const routes = require("./routes"); // Importa as rotas

//midleware
app.use(cors())
app.use(express.json())
app.use('/api', routes); // Usa as rotas com o prefixo /api




app.listen(5000,()=>{
    console.log("Server is running successfully on port 5000");
});