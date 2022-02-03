const express = require("express");
const service = require("./fhirkitclientService.js")
const router = express.Router();

router.get("/identifierEx/:id", async (req,res)=>{
  console.log(req.params.id)
    res.send( await service.fhirkitFindPatientByIdEx(req.params.id));
})
router.get("/identifierIn/:id", async (req,res)=>{
    res.send( await service.fhirkitFindPatientById(req.params.id));
})
router.get("/conditionByEx/:id", async (req,res)=>{
  res.send( await service.fhirkitFindConditionByIdEx(req.params.id));
})

module.exports = router;