import express from "express";
import contactControllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {createContactSchema, updateContactSchema, updateStatusContactSchema} from "../schemas/contactsSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();
const jsonParser = express.json();
contactsRouter.use(authenticate);

contactsRouter.get("/", contactControllers.getAllContacts);

contactsRouter.get("/:id", contactControllers.getOneContact);

contactsRouter.delete("/:id", contactControllers.deleteContact);

contactsRouter.post("/", jsonParser, validateBody(createContactSchema), contactControllers.createContact);

contactsRouter.put("/:id", jsonParser, validateBody(updateContactSchema), contactControllers.updateContact);

contactsRouter.patch("/:id/favorite", jsonParser, validateBody(updateStatusContactSchema), contactControllers.updateFavorite);

export default contactsRouter;
