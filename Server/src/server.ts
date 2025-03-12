// const forceDatabaseRefresh = false;

// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import sequelize from './config/connection.js';
// import routes from './routes/index.js';

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Serves static files in the entire client's dist folder
// app.use(express.static('../client/dist'));

// app.use(express.json());
// app.use(routes);

// sequelize.sync({force: forceDatabaseRefresh}).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
//   });
// });
import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const getChatResponse = async (_req: Request, _res: Response) => {
  try {
    const { message } = _req.body;

    if (!message) {
      _res.status(400).json({ error: "Message is required" });
    }

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4", // or "gpt-3.5-turbo"
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    _res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    _res.status(500).json({ error: "Failed to fetch response from OpenAI" });
  }
};
