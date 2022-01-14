const express = require("express");
const service = require("./service.js")
const router = express.Router();


router.get("/", (req, res) => {

  console.log("in controller",service.getService());
  res.send(service.getService());
})

router.get("/json", (req, res) => {

  
  res.send({
    cat:1,
    mode:"attack"
  });
})
module.exports = router


