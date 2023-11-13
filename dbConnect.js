const mongoose = require("mongoose");

module.exports = async () => {
  const mongoUri = process.env.MONGO_URI;

  await mongoose
    .connect(mongoUri, {
      dbName: "to_do",
    })
    .then((c) => {
      console.log(`MongoDB Connected ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
