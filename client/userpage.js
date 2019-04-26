document.addEventListener("DOMContentLoaded", function () {
    getCharacter()
});

let characterInfo;
const sessionID = Cookies.get("sessionID"); //Uses js-cookie library to manage cookies
const userID = Cookies.get("userID");


function getCharacter() {

    axios.get('/char/' + sessionID.toString())
        .then(function (response) {
            // handle success
            console.log(response);
            characterInfo = response.data;
            populateInfo()
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            console.log("CHAR FAILED TO GET, REDIRECTING TO LOGIN");
            window.location.href = "http://" + window.location.host + "/index.html"
        })
        .then(function () {
            // always executed
        });
}

function populateInfo() {
    console.log("Populating INFO");
    console.log("NAME: " + characterInfo.Name);
    $("#nameinfo").html(characterInfo.Name);
    $("#ppinfo").html(characterInfo.ProgressionPoints);
    $("#tuinfo").html(characterInfo.TimeUnitsCurrent + "/" + characterInfo.TimeUnitsMax);
    $("#rpinfo").html(characterInfo.ResearchPoints);
    $("#preparedmana").html(characterInfo.PreparedMana);
}

function characterUpdate() { //This updates the servers version of the character sheet with the new one

    axios.post("/updatevalues/" + userID.toString(), characterInfo)
        .then(function (response) {
            populateInfo();
        })
        .catch(function (error) {
            alert("Value Update Failed");
            getCharacter()
        })
        .then(function () {
            // always executed
        });

}

function studyAction() { //Triggered when the Study button is pressed
    if (characterInfo.TimeUnitsCurrent >= 2) { //Check that there are enough resources
        characterInfo.ResearchPoints += 20;
        characterInfo.TimeUnitsCurrent -= 2;
        characterUpdate()
    } else {
        alert("Not enough Time Units remaining to do this action")
    }
}

function trainAction() { //Triggered when the Train button is pressed
    if (characterInfo.TimeUnitsCurrent >= 5) { //Check that there are enough resources
        characterInfo.ProgressionPoints += 1;
        characterInfo.TimeUnitsCurrent -= 5;
        characterUpdate()
    } else {
        alert("Not enough Time Units remaining to do this action")
    }
}

function prepareAction() { //Triggered when the Prepare button is pressed
    if (characterInfo.TimeUnitsCurrent >= 2 && characterInfo.ResearchPoints >= 10) { //Check that there are enough resources
        characterInfo.PreparedMana += 1;
        characterInfo.TimeUnitsCurrent -= 2;
        characterInfo.ResearchPoints -= 10;
        characterUpdate()
    } else {
        alert("Not enough Time Units remaining to do this action")
    }
}

function investigationAction() {
    if (characterInfo.TimeUnitsCurrent >= 4) {
        characterInfo.TimeUnitsCurrent -= 4;
        characterInfo.InvestigationActions.push($('#InvestigationAction').val());
        characterUpdate()
    }
}


function researchAction() {
    if (characterInfo.TimeUnitsCurrent >= 3 && characterInfo.ResearchPoints >= 40) {
        characterInfo.TimeUnitsCurrent -= 3;
        characterInfo.ResearchPoints -= 40;
        characterInfo.ResearchActions.push($('#ResearchAction').val());
        characterUpdate()
    }
}