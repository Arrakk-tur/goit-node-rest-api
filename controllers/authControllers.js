import * as authServices from "../services/authServices.js";

const registerController = async(req, res)=> {
    const {email, subscription} = await authServices.registerUser(req.body);

    res.status(201).json({
        email,
        subscription,
    });
}

const loginController = async(req, res)=> {
    const {token} = await authServices.loginUser(req.body);
    const {email, subscription} = req.user;

    res.json({
        token,
        "user": {
            email,
            subscription
        }
    })
}

const getCurrentController = async(req, res)=> {
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription,
    })
}

const logoutController = async(req, res)=> {
    await authServices.logoutUser(req.user);

    res.status(204)
}

export default {
    registerController,
    loginController,
    getCurrentController,
    logoutController,
}