import {
    addContact,
    changeContact,
    getContactById,
    listContacts,
    removeContact,
    updateStatusContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res, next) => {
    const contacts = await listContacts(req.user.id);
    res.json({
        status: 200,
        message: "Contacts list get successfully",
        data: contacts
    });
};

const getOneContact = async (req, res, next) => {
    const contact = await getContactById(req.params.id, req.user.id);
    if (contact === null) {
        return next(HttpError(404, "Not found"));
    }

    res.json({
        status: 200,
        message: `Contact  with id ${contact.id} get successfully `,
        data: contact
    });
};

const deleteContact = async (req, res, next) => {
    const contact = await removeContact(req.params.id, req.user.id);
    if (contact === null) {
        return next(HttpError(404, "Not found"));
    }

    res.status(204).end();
};

const createContact = async (req, res, next) => {
    const { id: owner } = req.user;
    const contact = await addContact({...req.body, owner});

    res.status(201).json({
        status: 201,
        message: `Contact with id ${contact.id} created successfully`,
        data: contact
    });
};

const updateContact = async (req, res, next) => {
    const id = req.params.id;
    const { id: owner } = req.user;
    const payload = req.body;

    if (Object.keys(req.body).length === 0) {
        return next(HttpError(400, "Body must have at least one field"));
    }

    const contact = await changeContact(id, payload, owner);

    if (contact === null) {
        return next(HttpError(404, "Not found"));
    }
    res.json({
        status: 200,
        message: `Contact with id ${id} changed successfully`,
        data: contact
    });
};

const updateFavorite = async (req, res, next) => {
    const id = req.params.id;
    const { id: owner } = req.user;
    const payload = req.body;
    const contact = await updateStatusContact(id, payload, owner);
    if (contact === null) {
        return next(HttpError(404, "Not found"));
    }

    res.json({
        status: 200,
        message: `Status for contact with id ${id} changed successfully`,
        data: contact
    });
};

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite)
};