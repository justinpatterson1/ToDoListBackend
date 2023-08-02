const express = require('express');
const authServices = require('../Services/authServices');
const Router = express.Router();

Router.get("/",authServices.GetAllAccounts);
Router.get("/:id",authServices.GetAnAccount);
Router.delete("/:id",authServices.DeleteAnAccount);
Router.post("/",authServices.CreateAnAccount);
Router.post("/auth",authServices.Login)


module.exports = Router;