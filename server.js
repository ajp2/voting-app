const express = require("express");
const app = express();
const errorHandler = require("./controllers/error");

const port = process.env.PORT || 5000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/polls");
});

require("./routes/url")(app);

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
