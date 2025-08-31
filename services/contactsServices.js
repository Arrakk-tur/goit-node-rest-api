import fs from "node:fs/promises";
import path from 'node:path';
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
    // Повертає масив контактів.
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
}

export async function getContactById(contactId) {
    // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    return contact || null;
}

export async function removeContact(contactId) {
    // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) return null;
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

export async function addContact(payload) {
    // Повертає об'єкт доданого контакту (з id).
    const contacts = await listContacts();
    const newContact = {
        ...payload,
        id: nanoid(),
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

export async function changeContact(contactId, payload) {
    // Повертає об'єкт зміненого контакту (з id).
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) return null;
    const updatedContact = {...payload};

    contacts.push(updatedContact);
    await updateContacts(contacts);
    return updatedContact;
}

//TODO: Перевірити що контакт змінюється, а не додається