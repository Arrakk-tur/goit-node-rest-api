import fs from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcrypt";
import Users from "../db/users.js";

import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";
import { createAvatar } from "../helpers/genAvatar.js";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/mail.js";

const {BASE_URL} = process.env;

const avatarsDir = path.resolve("public", "avatars");

export const findUser = query => Users.findOne({
    where: query
})

const createVerifyEmail = ({verificationCode, email})=> ({
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationCode}" target="_blank">Click verify email</a>`
});


export const registerUser = async payload => {
    const email = payload.email
    if (await findUser({ email: email })) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(payload.password, 10);
    const verificationCode = nanoid();
    const newAvatar = createAvatar(email);

    const newUser = await Users.create({
        ...payload,
        password: hashPassword,
        avatarURL: newAvatar,
        verificationCode: verificationCode});

    const verifyEmail = createVerifyEmail({verificationCode, email: payload.email});

    await sendEmail(verifyEmail);
    return newUser
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
        id: user.id,
        email: user.email
    }

    const token = createToken(tokenPayload);
    await user.update({token});

    return { token, email: user.email, subscription: user.subscription }
}

export const logoutUser = async user => {
    await user.update({token: null});
    return user;
}

export const changeAvatar = async (user, file) => {
    let avatar = null;
    const ext = path.extname(file.filename);
    const avatarNewName = `${nanoid()}${ext}`;

    if(file) {
        const newPath = path.join(avatarsDir, avatarNewName);
        await fs.rename(file.path, newPath);
        avatar = path.join("avatars", avatarNewName);
    }

    await user.update({ avatarURL: avatar });

    return avatar;
}

export const verifyUser = async verificationToken => {
    const user = await findUser({ verificationToken: verificationToken });

    if(!user) {
        throw HttpError(404, "User not found");
    }

        await user.update({
        verificationToken: null,
        verify: true
    });
    return user;
}