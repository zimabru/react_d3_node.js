const express = require("express");
const app = express();
const port = 3003
const cors = require("cors");


app.use(cors({
    origin:"http://localhost:3000",
}))

const controller = require("./barchart/controller")
app.use("/barchart",controller);
const localFiles = require("./local-files/controller")
app.use("/localfiles",localFiles);
const fhirController = require("./fhirKit/fhirkitclientController")
app.use("/fhir", fhirController)


app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
});

