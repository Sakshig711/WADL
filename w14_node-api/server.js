const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static frontend files from public/
app.use(express.static("public"));

// API to get user data
app.get("/api/users", (req, res) => {
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error reading file" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
