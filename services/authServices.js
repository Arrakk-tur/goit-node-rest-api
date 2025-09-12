import bcrypt from "bcrypt";
import Users from "../db/users.js";

import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";

export const findUser = query => Users.findOne({
    where: query
})

export const registerUser = async payload => {
    if (await findUser({ email: payload.email })) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(payload.password, 10);
    return Users.create({...payload, password: hashPassword});
}

export const loginUser = async payload => {
    const {email, password} = payload;
    const user = await findUser({email});

    if(!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const tokenPayload = {
        email: user.email,
    }

    const token = createToken(tokenPayload);
    await user.update({token});

    return token;
}

export const logoutUser = async user => {
    await user.update({token: null});
    return user;
}