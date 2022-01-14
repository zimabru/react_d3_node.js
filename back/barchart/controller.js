const express = require("express");
const service = require("./service.js")
const router = express.Router();


router.get("/", (req, res) => {

    const jsonPromese = new Promise((resolve, reject)=>{
        console.log("in the promesse");
        let json = {};
        json = service.getJson();
        resolve(json);

    }).then(json=>{
        res.send(json);
    })

    Promise.all([
        jsonPromese
    ])

})

module.exports = router


