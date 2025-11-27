import express from "express";
import cors from "cors";
import path from "path";

import gameRoutes from "./routes/gameRoutes";
import wordRoutes from "./routes/wordRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));


app.get("/", (req, res) => {
  res.redirect("/words.html");
});

app.use("/api/game", gameRoutes);
app.use("/api/words", wordRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on http://localhost:" + PORT));
