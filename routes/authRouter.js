import express from "express";
import validateBody from "../helpers/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import {registerUserSchema, loginUserSchema} from "../schemas/authSchemas.js";


const authRouter = express.Router();
// const jsonParser = express.json();

authRouter.post("/register", validateBody(registerUserSchema), authControllers.registerController);
authRouter.post("/login", validateBody(loginUserSchema), authControllers.loginController);

export default authRouter;