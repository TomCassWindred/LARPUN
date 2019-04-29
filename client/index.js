//console.log("Index.js started");

function redirectUserpage(){
	window.location.href =  "http://"+window.location.host+"/userpage.html";
}

$("#loginform").submit(function(event) {
	event.preventDefault();
	// Fetch form to apply custom Bootstrap validation
	let form = document.querySelector("#loginform");
	let formData = new FormData(form);
	event.preventDefault();
	if (form[0].checkValidity() === false) {
		event.stopPropagation();
	}
	else {
		axios({
			method: "post",
			url: "/login",
			data: formData,
			config: {headers: {"Content-Type": "multipart/form-data"}}
		})
			.then(function (response) {
				//handle success
				//console.log("LOGIN SUCCESSFUL");
				//console.log(response.data);
				document.cookie = "sessionID="+response.data.sessionID;
				document.cookie = "userID="+response.data.userID;
				redirectUserpage();

			})
			.catch(function (response) {
				//handle error
				//console.log(response);
				alert("Login Failed, Please ensure your login details are correct");
			});



	}
	$("#loginform").addClass("was-validated");
});

$("#signupform").submit(function(event) {
	//console.log("SIGNUP DETECTED");
	event.preventDefault();
	// Fetch form to apply custom Bootstrap validation
	let form = document.querySelector("#signupform");
	let formData = new FormData(form);
	event.preventDefault();
	if (form[0].checkValidity() === false) {
		event.stopPropagation();
	}
	else {

		axios({
			method: "post",
			url: "/signup",
			data: formData,
			config: {headers: {"Content-Type": "multipart/form-data"}}
		})
			.then(function (response) {
				//handle success
				//console.log("RESPONSE RECEIVED");
				//console.log(response);
				alert("USER CREATED YOU MAY NOW LOG IN");
			})
			.catch(function (error) {
				//handle error

				//console.log("ERROR :(");
				//console.log(error.response.data);
				//console.log("RECEIVED RESPONSE: "+error.response.data);
				alert(error.response.data);
			});



	}
	$("#signupform").addClass("was-validated");
});
