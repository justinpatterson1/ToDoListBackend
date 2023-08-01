const express = require('express');
const listServices = require('../Services/listServices.js')
const Router = express.Router();


Router.get("/",listServices.getAllItems);
Router.get("/:id",listServices.getAnItem);
Router.post("/",listServices.AddAnItem);
Router.delete("/:id",listServices.deleteAnItem);
Router.put("/:id",listServices.updateAnItem)


module.exports = Router;