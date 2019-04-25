document.addEventListener("DOMContentLoaded", function() {
    getCharacter()
});

let characterInfo;
const sessionID = Cookies.get("sessionID"); //Uses js-cookie library to manage cookies
const userID = Cookies.get("userID");


function getCharacter(){

    axios.get('/char/'+sessionID.toString())
        .then(function (response) {
        // handle success
        console.log(response);
        characterInfo=response.data
            populateInfo()
    })
        .catch(function (error) {
            // handle error
            console.log(error);
            console.log("CHAR FAILED TO GET, REDIRECTING TO LOGIN");
            window.location.href = "http://"+window.location.host+"/index.html"
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
    $("#tuinfo").html(characterInfo.TimeUnitsCurrent+"/"+characterInfo.TimeUnitsMax);
    $("#rpinfo").html(characterInfo.ResearchPoints);
}

function characterUpdate(updatedvalues){
    for (var key in updatedvalues){
        characterInfo[key] = updatedvalues[key]
    }

    axios.post("/updatevalues/"+userID.toString(), characterInfo)
        .then(function (response) {
            populateInfo();
            alert("VALUES SUCCESSFULLY UPDATED")
        })
        .catch(function (error) {
            alert("Value Update Failed")
        })
        .then(function () {
            // always executed
        });

}

function studyAction(){
    if (characterInfo.TimeUnitsCurrent>=2) {
        characterUpdate({"ResearchPoints":parseInt(characterInfo.ResearchPoints)+20,"TimeUnitsCurrent": characterInfo.TimeUnitsCurrent-2})
    } else {
        alert("Not enough Time Units remaining to do this action")
        }
}

function trainAction(){
    if (characterInfo.TimeUnitsCurrent>=5) {
        characterUpdate({"ProgressionPoints":parseInt(characterInfo.ProgressionPoints)+1,"TimeUnitsCurrent": characterInfo.TimeUnitsCurrent-5})
    } else {
        alert("Not enough Time Units remaining to do this action")
    }
}
function prepareAction(){
    if (characterInfo.TimeUnitsCurrent>=2 && characterInfo.ResearchPoints>=10) {
        characterUpdate({"PreparedMana":parseInt(characterInfo.PreparedMana)+1,"TimeUnitsCurrent": characterInfo.TimeUnitsCurrent-2, "ResearchPoints":characterInfo.ResearchPoints-10})
    } else {
        alert("Not enough Time Units remaining to do this action")
    }
}