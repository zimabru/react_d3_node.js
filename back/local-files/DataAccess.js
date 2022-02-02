const csv = require("csv-parser");
const fs = require("fs");
const results = [];

var filenameRefentiel = __dirname + "/referentiel.csv";
var filenamePoids = __dirname + "/files/poids.csv";
var filenameTaille = __dirname + "/files/taille.csv";



fs.createReadStream(filenameRefentiel)
.pipe(csv({}))
.on("data",(data)=> results.push(data)).on("end", ()=> {
   
});
fs.createReadStream(filenamePoids)
.pipe(csv({}))
.on("data",(data)=> results.push(data)).on("end", ()=> {
    
});

fs.createReadStream(filenameTaille)
.pipe(csv({}))
.on("data",(data)=> results.push(data)).on("end", ()=> {
   
});
function getData(){
    return results;
}

module.exports = {
    getData
};