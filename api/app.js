const express = require("express");
const cors = require("cors");
const {json} = require("express");
const organizationsRoutes = require("./routes/organizations-routes");
const positionsRoutes = require("./routes/positions-routes")
const departmentsRoutes = require("./routes/departments-router")
const employeesRouter = require("./routes/employees-router")
const filesRouter = require("./routes/files-router")
const hrRouter = require("./routes/hr-operations-router")
const changelogRouter = require("./routes/changelog-router")
const dropdownListOptionsRouter = require("./routes/dropdown-lists-options-router")

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", organizationsRoutes);
app.use("/", positionsRoutes);
app.use("/", departmentsRoutes);
app.use("/", employeesRouter);
app.use("/", filesRouter);
app.use("/", hrRouter);
app.use("/", changelogRouter);
app.use("/", dropdownListOptionsRouter);
app.use(express.static("public"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));