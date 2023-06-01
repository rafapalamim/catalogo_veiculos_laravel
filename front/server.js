import express from "express";
import path from "path";

const app = express(); // create express app

app.use(express.static(path.join(path.resolve(), "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "dist", "index.html"));
});

// start express server on port 5000
app.listen(3000, () => {
  console.log("server started on port 3000");
});