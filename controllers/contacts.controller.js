import Contact from "../models/contacts.models.js";

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.render("home", { contacts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading contacts");
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send("Contact not found");

    res.render("show-contact", { contact });
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid contact ID");
  }
};

export const getAddContactPage = (req, res) => {
    try {
        res.render("add-contact");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading add contact page");
    }
};

export const saveContact = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, address } = req.body;

    await Contact.create({
      first_name,
      last_name,
      email,
      phone,
      address,
    });

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving contact");
  }
};

export const getUpdateContactPage = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send("Contact not found");

    res.render("update-contact", { contact });
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid contact ID");
  }
};

export const updateContact = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, address } = req.body;

    await Contact.findByIdAndUpdate(req.params.id, {
      first_name,
      last_name,
      email,
      phone,
      address,
    });

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Update failed");
  }
};

export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Delete failed");
  }
};