const express = require("express");
const app = express();
const errorHandler = require("./controllers/error");
const pollRoutes = require("./routes/polls");
const authRoutes = require("./routes/auth");

const port = process.env.PORT || 5000;

app.use(express.static("public"));

// Define routes here
app.use(pollRoutes);
app.use("/auth", authRoutes);

// Error handler
app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
