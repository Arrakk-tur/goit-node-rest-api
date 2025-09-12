import Contact from '../db/contacts.js';

export const listContacts = async (ownerId) => Contact.findAll({ where: { owner: ownerId } });

export const getContactById = async (contactId, ownerId) => Contact.findOne({ where: { id: contactId, owner: ownerId } });

export const addContact = async payload => Contact.create(payload);

export const changeContact = async (contactId, payload) => {
    const contact = await getContactById(contactId);
    if (!contact) return null;
    await contact.update(payload);
    return contact;
}

export const updateStatusContact = async (contactId, body) => {
    const contact = await getContactById(contactId);
    if (!contact) return null;

    await contact.update({ favorite: body.favorite });
    return contact;
}

export const removeContact = async contactId => {
    const contact = await getContactById(contactId);
    if (!contact) return null;

    await contact.destroy();
    return contact;
}