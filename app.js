import express from "express";
import contactRoutes from "./routes/contacts.routes.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection...
connectDB();

// Middleware...
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // body parse
app.use(express.static("public"));

// Routes...
app.use("/", contactRoutes);

// Server start...
app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`); 
});
