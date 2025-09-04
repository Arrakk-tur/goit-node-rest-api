import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {createContactSchema, updateContactSchema, updateStatusContactSchema} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();
const jsonParser = express.json();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", jsonParser, validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", jsonParser, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", jsonParser, validateBody(updateStatusContactSchema), updateFavorite);

export default contactsRouter;
