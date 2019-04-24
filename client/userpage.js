document.addEventListener("DOMContentLoaded", function() {
    getCharacter()
});

let characterInfo;

function getCharacter(){
    sessionID = Cookies.get("sessionID"); //Uses js-cookie library to manage cookies
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