import express from "express";
import validateBody from "../helpers/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import {registerUserSchema, loginUserSchema, verifySchema} from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), authControllers.registerController);
authRouter.post("/login", validateBody(loginUserSchema), authControllers.loginController);
authRouter.get("/current", authenticate, authControllers.getCurrentController);
authRouter.post("/logout", authenticate, authControllers.logoutController);
authRouter.patch("/avatars", authenticate, upload.single("avatar"), authControllers.updateAvatarsController);
authRouter.get("/verify/:verificationToken", authenticate, authControllers.verificationController);
authRouter.post("/verify", validateBody(verifySchema), authControllers.resendVerifyController);



export default authRouter;