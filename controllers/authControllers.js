import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const registerController = async(req, res)=> {
    const {email, subscription} = await authServices.registerUser(req.body);

    res.status(201).json({
        user: {
            email,
            subscription,
        }
    });
}

const loginController = async(req, res)=> {
    const { token, email, subscription } = await authServices.loginUser(req.body);

    res.json({
        token,
        user: { email, subscription }
    });
}

const getCurrentController = async(req, res)=> {
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription,
    });
}

const logoutController = async(req, res)=> {
    await authServices.logoutUser(req.user);

    res.status(204).end();
}

const updateAvatarsController = async(req, res)=> {
    const avatarUrl = await authServices.changeAvatar(req.user, req.file);

    res.status(200).json({
        "avatarURL": avatarUrl
    });
}

const verificationController = async (req, res)=> {
    await authServices.verifyUser(req.param.verificationToken);

    res.status(200).json({
        message: 'Verification successful'
    });
}

export default {
    registerController: ctrlWrapper(registerController),
    loginController: ctrlWrapper(loginController),
    getCurrentController: ctrlWrapper(getCurrentController),
    logoutController: ctrlWrapper(logoutController),
    updateAvatarsController: ctrlWrapper(updateAvatarsController),
    verificationController: ctrlWrapper(verificationController)
};