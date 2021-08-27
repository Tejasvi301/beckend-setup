const { api } = require("../models/index.js");

module.exports = app => {
  const api = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new Api
  router.post("/", api.create);

  // Retrieve all api
  router.get("/", api.findAll);
  
  router.get("/:id", api.findOne);

  
  router.put("/:id", api.update);

  
  router.delete("/:id", api.delete);

 
  router.delete("/", api.deleteAll);

  app.use("/api/information", router);
};

