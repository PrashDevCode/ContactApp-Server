import express from "express";
import { get } from "mongoose";
import {
  deleteContact,
  getAddContactPage,
  getContactById,
  getContacts,
  getUpdateContactPage,
  saveContact,
  updateContact,
} from "../controllers/contacts.controller.js";

const router = express.Router();

router.get("/", getContacts);

router.get("/show-contact/:id", getContactById);

router.get("/add-contact", getAddContactPage);

router.post("/add-contact", saveContact);

router.get("/update-contact/:id", getUpdateContactPage);

router.post("/update-contact/:id", updateContact);

router.get("/delete-contact/:id", deleteContact);

export default router;
