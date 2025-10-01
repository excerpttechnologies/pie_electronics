import dotenv from "dotenv";
dotenv.config();  

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import contactRoutes from "./routes/contactRoutes.js";
const path = require('path');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/contact", contactRoutes);


app.use(express.static(path.join(__dirname, 'dist')));

// Fallback route for SPA (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
