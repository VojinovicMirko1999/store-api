// TO START THIS SCRIPT IN TERMINAL RUN COMMAND -> node populate

require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Success!");
    // Exit proccess success
    process.exit(0);
  } catch (error) {
    console.log(error);
    // Exit from proccess with error
    process.exit(1);
  }
};

start();
