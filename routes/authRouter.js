import express from "express";
import validateBody from "../helpers/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import {registerUserSchema, loginUserSchema} from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), authControllers.registerController);
authRouter.post("/login", validateBody(loginUserSchema), authControllers.loginController);
authRouter.get("/current", authenticate, authControllers.getCurrentController);
authRouter.post("/logout", authenticate, authControllers.logoutController);

export default authRouter;