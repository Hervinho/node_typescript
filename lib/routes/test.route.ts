import { Request, Response, Router } from "express";
import TestModel from "../models/test.model";

class TestRoute {

    constructor(){
        this.router = Router();
        this.routes();
    };

    public router;

    public routes() {
        this.router.get("/", (req, res) => {
            TestModel.getAll()
                .then((result) => res.json(result));
        });

        this.router.get("/:id", (req, res) => {
            TestModel.getFiltered(req.params.id)
                .then((result) => res.json(result));
        });
    }
}

//make sure to export the router, so all routes will be accessible from app.ts
export default new TestRoute().router;