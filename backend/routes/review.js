const express = require("express");
const reviweRouter = express.Router();
const { createReviwe, getReviwe } = require("../controllers/review");

reviweRouter.post("/",createReviwe);
reviweRouter.get("/",getReviwe);

module.exports = reviweRouter;
