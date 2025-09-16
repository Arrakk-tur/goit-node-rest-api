import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config"

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";
// import "./db/sequelize.js"
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
