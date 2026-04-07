import express from "express";
import bodyParser from "body-parser";
import initWebRoute from "./routes/web";
import initSwagger from "./config/swagger";
import connectDB from "./config/connectDB";
require("dotenv").config();

let app = express();
//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (public) if used for cover images later
app.use(express.static("./src/public"));

initWebRoute(app);
initSwagger(app); // Khởi tạo Swagger

connectDB();

let port = process.env.PORT || 3000;
//port === undefined ? 8080 : port;

app.listen(port, () => {
    console.log("Server is running on the port: " + port);
});
