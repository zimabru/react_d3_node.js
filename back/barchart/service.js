const axios = require("axios");



const url = 'https://data.cityofnewyork.us/resource/tg4x-b46p.json'


 async function getJson() {
    let returnValue= {};
    
    let value = await axios.get(url)
    .then(function (response) {
      let temps = response.data;
      
      let brooklyn= temps.filter((element)=>{ return element.borough ==="Brooklyn"});
      let queens= temps.filter((element)=>{ return element.borough ==="Queens"});
      let manhattan= temps.filter((element)=>{ return element.borough ==="Manhattan"});
      let bronx= temps.filter((element)=>{ return element.borough ==="Bronx"})

      returnValue =[{
        Brooklyn: brooklyn.length,
        Queens: queens.length,
        Manhattan: manhattan.length, 
        Bronx: bronx.length
      }]

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
      
    });

    console.log("juste before the return statement", returnValue);
    return returnValue;
}

module.exports = {getJson}
