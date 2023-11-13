const app = require("./app");
const dbConnect = require("./dbConnect");

dbConnect();
app.listen(process.env.PORT, () => {
  console.log(
    `server is listening on port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
