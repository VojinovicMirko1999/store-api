// imports
require("dotenv").config(); // required for using .env file
const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
require("express-async-errors");
// ----------------------------------------------------------------------------

// express server instance
const app = express();
// ----------------------------------------------------------------------------

// database
const connectDB = require("./db/connect");
// ----------------------------------------------------------------------------

// router
const productsRouter = require("./routes/products");

app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">Products route</a>`);
});

app.use("/api/v1/products", productsRouter);
// ----------------------------------------------------------------------------

// middlewares
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorMiddleware);
// ----------------------------------------------------------------------------

// port
const port = process.env.PORT || 8001;
// ----------------------------------------------------------------------------

// starting server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
// ----------------------------------------------------------------------------
