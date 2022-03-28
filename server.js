const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const Category = require("./api/models/category");
const port = process.env.PORT || 8080;

const server = http.createServer(app);
mongoose.connect(
  "mongodb+srv://kundan:LqMrRFz4EGPogyzl@cluster0.mxihh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  async function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to database");
      /* let newCategory = Category();
      newCategory.type = "Dining";
      await newCategory.save();
      let newCategory1 = Category();
      newCategory1.type = "Delivery";
      await newCategory1.save();
      let newCategory2 = Category();
      newCategory2.type = "Both";
      await newCategory2.save(); */
    }
  }
);
server.listen(port, () => {
  console.log("Server listenning on port: ", port);
});
