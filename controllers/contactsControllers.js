import {addContact, changeContact, getContactById, listContacts, removeContact} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await listContacts();
        res.json({
            status: 200,
            message: "Contacts list get successfully",
            data: contacts
        });
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try{
        const contact = await getContactById(req.params.id);
        if (contact === null) {
            throw HttpError(400, "No contacts found.");
        }

        res.json({
            status: 200,
            message: `Contact  with id ${contact.id} get successfully `,
            data: contact
        });
    } catch (error) {
        next(error);
    }

};

export const deleteContact = async (req, res, next) => {
    try{
        const contact = await removeContact(req.params.id);
        if (contact === null) {
            throw HttpError(400, "No contacts found.");
        }

        res.status(204).end();
    } catch (error) {
        next(error);
    }

};

export const createContact = async (req, res, next) => {
    try{
        const contact = await addContact(req.body);

        res.json({
            status: 200,
            message: `Contact with id ${contact.id} created successfully`,
            data: contact
        });
    } catch (error) {
        next(error);
    }

};

export const updateContact = async (req, res, next) => {
    try{
        const id = req.params.id;
        const payload = req.body;
        const contact = await changeContact(id, payload);
        if (contact === null) {
            throw HttpError(400, "No contacts found.");
        }

        res.json({
            status: 200,
            message: `Contact with id ${id} changed successfully`,
            data: contact
        });
    } catch (error) {
        next(error);
    }
};
