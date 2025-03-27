const express = require("express");
const cors = require("cors");
const {json} = require("express");
const routes = require("./routes/routes");


const app = express();
app.use(express.json());
app.use(cors());
// app.use("/", routes);
app.use(express.static("public"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));