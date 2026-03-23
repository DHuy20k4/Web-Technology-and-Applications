import expess from "express";
import homeController from "../controllers/homecontroller";
let router = expess.Router();
let initWebRoute = (app) => {
    router.get("/", homeController.getHomePage);




    return app.use("/", router);
}
module.exports = initWebRoute;  