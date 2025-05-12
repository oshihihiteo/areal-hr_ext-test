const express = require("express");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
require('./config/auth/passport');

const organizationsRoutes = require("./routes/organizations-routes");
const positionsRoutes = require("./routes/positions-routes");
const departmentsRoutes = require("./routes/departments-router");
const employeesRouter = require("./routes/employees-router");
const filesRouter = require("./routes/files-router");
const hrRouter = require("./routes/hr-operations-router");
const changelogRouter = require("./routes/changelog-router");
const dropdownListOptionsRouter = require("./routes/dropdown-lists-options-router");
const usersRouter = require("./routes/users-routes");
const authRouter = require("./routes/auth-router");

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_BASE_URL,
    credentials: true,
}));

app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/organizations", organizationsRoutes);
app.use("/auth", authRouter);
app.use("/positions", positionsRoutes);
app.use("/departments", departmentsRoutes);
app.use("/employees", employeesRouter);
app.use("/files", filesRouter);
app.use("/hr-operations", hrRouter);
app.use("/changelog", changelogRouter);
app.use("/options", dropdownListOptionsRouter);
app.use("/users", usersRouter);

app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
