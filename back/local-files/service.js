const results = require("./DataAccess");

function getService(){

    console.log("service ", results);
    return results.getData();
}

module.exports = {
    getService
};