console.log("Index.js started");

$("#loginform").submit(function(event) {
    event.preventDefault();
    // Fetch form to apply custom Bootstrap validation
    let form = document.querySelector("#loginform");
    let formData = new FormData(form);
    event.preventDefault();
    if (form[0].checkValidity() === false) {
        event.stopPropagation()
    }
    else {
        axios({
            method: 'post',
            url: '/login',
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {
                //handle success
                console.log(response);

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });



    }
    $("#loginform").addClass('was-validated');
});

$("#signupform").submit(function(event) {
    console.log("SIGNUP DETECTED");
    event.preventDefault();
    // Fetch form to apply custom Bootstrap validation
    let form = document.querySelector("#signupform");
    let formData = new FormData(form);
    event.preventDefault();
    if (form[0].checkValidity() === false) {
        event.stopPropagation()
    }
    else {

        axios({
            method: 'post',
            url: '/signup',
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {
                //handle success
                console.log("RESPONSE RECEIVED");
                console.log(response);
                alert("USER CREATED YOU MAY NOW LOG IN")
            })
            .catch(function (response) {
                //handle error

                console.log("ERROR :(");
                console.log(response);
                console.log("RECEIVED RESPONSE: "+response.body);
                alert(response.body)
            });



    }
    $("#signupform").addClass('was-validated');
});
