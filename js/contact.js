let submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", sendMail);

function verifySubmit() {
    let name = document.querySelector("#name");
    let email = document.querySelector("#email");
    let message = document.querySelector("#message");
    console.log(name);
}

function sendMail(e) {
    e.preventDefault();
    verifySubmit();
    // if (verifySubmit) {
    //     fetch("http://localhost:8000/email", {
    //         method: "GET"
    //     }).
    //     then(res => {
    //         console.log(res);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    // }
   
}