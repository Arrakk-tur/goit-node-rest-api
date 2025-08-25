import {listContacts, addContact, getContactById, removeContact} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = (req, res) => {
    const contacts = listContacts();
    res.json({status: 200,
        message: "Contacts list get successfully",
        data: contacts});
};

export const getOneContact = (req, res) => {
    const contact = getContactById(parseInt(req.params.id, 10));
    if (contact === null) {
        throw HttpError(400, "No contacts found.");
    }

    res.json({status: 200,
        message: `Contact  with id ${contact.id} get successfully `,
        data: contact});
};

export const deleteContact = (req, res) => {
    const contact = removeContact(parseInt(req.params.id, 10));
    if (contact === null) {
        throw HttpError(400, "No contacts found.");
    }

    res.status(204).end();
};

export const createContact = (req, res) => {
    const contact = addContact(req.body);

    res.json({status: 200, message: `Contact with id ${contact.id} created successfully`, data: contact});
};

export const updateContact = (req, res) => {
    const contact = addContact(req.body);
    //TODO: Дописати реалізацію помилок, створити updateContact в services
};
