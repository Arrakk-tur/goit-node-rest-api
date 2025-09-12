import {
    addContact,
    changeContact,
    getContactById,
    listContacts,
    removeContact,
    updateStatusContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    const contacts = await listContacts(req.user.id);
    res.json({
        status: 200,
        message: "Contacts list get successfully",
        data: contacts
    });
};

export const getOneContact = async (req, res, next) => {
    const contact = await getContactById(req.params.id);
    if (contact === null) {
        return next(HttpError(404, "Not found"));
    }

    res.json({
        status: 200,
        message: `Contact  with id ${contact.id} get successfully `,
        data: contact
    });
};

export const deleteContact = async (req, res, next) => {
    const contact = await removeContact(req.params.id);
    if (contact === null) {
        return next(HttpError(404, "Not found"));
    }

    res.status(204).end();
};

export const createContact = async (req, res, next) => {
    const contact = await addContact(req.body);

    res.status(201).json({
        status: 201,
        message: `Contact with id ${contact.id} created successfully`,
        data: contact
    });
};

export const updateContact = async (req, res, next) => {
    const id = req.params.id;
    const payload = req.body;
    const contact = await changeContact(id, payload);

    if (Object.keys(req.body).length === 0) {
        return next(HttpError(400, "Body must have at least one field"));
    }

    if (contact === null) {
        return next(HttpError(404, "Not found"));
    }
    res.json({
        status: 200,
        message: `Contact with id ${id} changed successfully`,
        data: contact
    });
};

export const updateFavorite = async (req, res, next) => {
    const id = req.params.id;
    const payload = req.body;
    const contact = await updateStatusContact(id, payload);
    if (contact === null) {
        return next(HttpError(404, "Not found"));
    }

    res.json({
        status: 200,
        message: `Status for contact with id ${id} changed successfully`,
        data: contact
    });
};
