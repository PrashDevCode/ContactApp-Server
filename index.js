import express from "express";
import mongoose from "mongoose";
import Contact from "./models/contacts.models.js";

const app = express();
const PORT = 5000;

/* ================= DATABASE CONNECTION ================= */
mongoose
  .connect("mongodb://127.0.0.1:27017/contactApp-db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* ================= MIDDLEWARE ================= */
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // body parse
app.use(express.static("public"));

/* ================= ROUTES ================= */

// HOME → get all contacts....
app.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.render("home", { contacts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading contacts");
  }
});

// SHOW → single contact....
app.get("/show-contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send("Contact not found");

    res.render("show-contact", { contact });
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid contact ID");
  }
});

// ADD PAGE....
app.get("/add-contact", (req, res) => {
  res.render("add-contact");
});

// ADD SAVE → create new contact....
app.post("/add-contact", async (req, res) => {
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
});

// EDIT PAGE → load existing data....
app.get("/update-contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send("Contact not found");

    res.render("update-contact", { contact });
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid contact ID");
  }
});

// UPDATE SAVE....
app.post("/update-contact/:id", async (req, res) => {
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
    res.status(500).send("Update failed");
  }
});

// DELETE....
app.get("/delete-contact/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Delete failed");
  }
});

/* ================= SERVER ================= */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
