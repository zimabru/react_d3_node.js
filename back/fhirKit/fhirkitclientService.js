const Client = require("fhir-kit-client")


const fhirClient = new Client({
    baseUrl: 'http://hapi.fhir.org/baseR4'
});

/*
#That how a ressource patient should look like 
const myPatient = {
    "resourceType": "Patient",
    "identifier": [
        {
            "use": "usual",
            "type": {
                "coding": [
                    {
                        "system": "http://hl7.org/fhir/v2/0203",
                        "code": "MR",
                        "display": "Medical record number"
                    }
                ],s
                "text": "MRN"
            },
            "system": "urn:oid:1.1.1.1.1.1",
            "value": "AAAA"
        }
    ],
    "active": true,
    "name": [
        {
            "use": "official",
            "text": "Zaim Hassani Adili",
            "family": [
                "Hassani Adili"
            ],
            "given": [
                "ZAIM"
            ]
        }
    ],
    "gender": "male",
    "birthDate": "1910-06-05"
}
#endregion 
*/
function fhirkitCreateCondition(condition) {
    fhirClient.create({
        resourceType: "Condition",
        body: condition,
    }).then((data) => {
        console.log(data);
    }).catch(e => {
        console.log(e);
        return e;
    });
    return true;
}
function fhirkitCreatePatient(patient) {
    fhirClient.create({
        resourceType: 'Patient',
        body: patient,
    }).then((data) => {
        console.log(data);
    }).catch(e => {
            console.log(e);
            return e;
        });
    return true;
}


async function fhirkitFindPatientByIdEx(identifierExtern) {
    let rtn =null;
    console.log("identifier externe", identifierExtern)
    await fhirClient.request('Patient?identifier=' + identifierExtern)
        .then(response => {
            rtn = response;
            console.log("the patient you ask:", rtn)
        })
        .catch(e => {
            console.log("Patient Direct request", e);
        });
        console.log("rtn is :",rtn)
    return rtn;
}


async function fhirkitFindPatientById(id){
    let rtn = null;
    await fhirClient.request('Patient/' + id)
        .then(response => {
            rtn = response;
            console.log("the patient you ask:", response)
        })
        .catch(e => {
            console.log("Patient Direct request", e);
        });
    return rtn;
}
async function fhirkitFindConditionById(id) {
    let rtn = null;
   await  fhirClient.request('/Condition?subject=Patient/' + id)
        .then(response => {
            rtn = response;
            console.log("the patient you ask with his conditions:", response)
        })
        .catch(e => {
            console.log("Patient Direct request", e);
        });
    return rtn;
}

async function fhirkitFindConditionByIdEx(identifierExtern) {
    let internalId = null;
    let patientBundle = await fhirkitFindPatientByIdEx(identifierExtern);

    if (patientBundle > 1)
        return "patientbundle send a length of :" + patientBundle.total;

    console.log(patientBundle);
    internalId = patientBundle.entry[0].resource.id;
    console.log("Searching condition for patient id:" + internalId);

    return await fhirkitFindConditionById(internalId);

}

function fhirkitFindConditionByIndEx_D(identifierExtern) {
    let rtn = null
    fhirClient.request('Condition?subject:Patient.identifier=' + id)
        .then(response => console.log("the patient you ask with his conditions:", response))
        .catch(e => {
            console.log("Patient Direct request", e);
        });
}

module.exports = {
    fhirkitCreatePatient,
    fhirkitFindPatientByIdEx,
    fhirkitFindPatientById,
    fhirkitFindConditionById,
    fhirkitFindConditionByIndEx_D,
    fhirkitFindConditionByIdEx,
    fhirkitCreateCondition
}