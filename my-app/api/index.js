const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const authRoute = require("./Routs/auth")
const path = require("path");


app.use(express.json());

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("connection is successfull");
}).catch((e) => {
    console.log("no connection ");
});



app.use("/api/auth", authRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 5000, () => {
    console.log("express is runing")
}
);