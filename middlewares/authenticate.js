import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwt.js";

import { findUser } from "../services/authServices.js";

const authenticate = async (req, res, next) => {
    const authorization = req.get("Authorization");
    if (!authorization) {
        return next(HttpError(401, "Not authorized"));
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        return next(HttpError(401, "Authorization header must have bearer type"));
    }

    const { payload, error } = verifyToken(token);
    if (error) {
        return next(HttpError(401, error.message));
    }

    const user = await findUser({ id: payload.id });
    if (!user) {
        return next(HttpError(401, "Not authorized"));
    }

    if (user.token !== token) {
        return next(HttpError(401, "Not authorized"));
    }

    req.user = user;
    next();
};

export default authenticate;