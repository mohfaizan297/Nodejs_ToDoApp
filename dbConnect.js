const mongoose = require("mongoose");

module.exports = async () => {
  const mongoUri = "mongodb://localhost:27017";

  await mongoose
    .connect(mongoUri, {
      dbName: "to_do",
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
