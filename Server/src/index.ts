import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import getChatResponse from "./openaiController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('../Client/dist'));
app.use(cors());
app.use(express.json());

app.post("/api/chat", getChatResponse);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
