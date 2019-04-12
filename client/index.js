console.log("Index.js started");

$("#submitlogin").click(function(event) {

    // Fetch form to apply custom Bootstrap validation
    let form = $("#loginform");
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
    form.addClass('was-validated');
});

$("#submitsignup").click(function(event) {

    // Fetch form to apply custom Bootstrap validation
    let form = $("#signupform");
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
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });



    }
    form.addClass('was-validated');
});
