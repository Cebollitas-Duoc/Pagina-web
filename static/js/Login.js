const button_login   = document.getElementById("LoginButton");
const input_email    = document.getElementById("inputEmail");
const input_password = document.getElementById("inputPassword");

button_login.addEventListener("click", async ()=>{
    email = input_email.value
    password = input_password.value
    response = JSON.parse(await login(email, password))

    if (response["ValidPassword"]){
        setCookie("SessionKey", response["SessionKey"], 7)
        setCookie("LogedIn", true, 7)
    }
    else{
        setCookie("LogedIn", false, 7)
        deleteCookie("SessionKey")
    }
})

async function login(email, password){
    var formdata = new FormData();
    var r
    formdata.append("Email", email);
    formdata.append("Password", password);

    var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };

    await fetch("http://api.mrmeme.cl/auth/Login/", requestOptions)
    .then(response => response.text())
    .then(result => r=result)
    .catch(error => console.log('error', error));

    return r
}