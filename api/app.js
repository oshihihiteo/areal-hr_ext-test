const express = require("express");
const cors = require("cors");
const {json} = require("express");
const organizationsRoutes = require("./routes/organizations-routes");
const positionsRoutes = require("./routes/positions-routes")
const departmentsRoutes = require("./routes/departments-router")

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", organizationsRoutes);
app.use("/", positionsRoutes);
app.use("/", departmentsRoutes);
app.use(express.static("public"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));